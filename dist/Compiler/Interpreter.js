"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FunctionList_1 = require("./FunctionList");
const Plugin_1 = require("../Handlers/Plugin");
/**
 * Finds the closest function in string
 * @param name
 * @returns
 */
function closestMatch(name, ff) {
    return ff
        .filter(f => name.slice(0, f.length).toLowerCase() === f.toLowerCase())
        .sort((vodka, chacha) => chacha.length - vodka.length)[0] || null;
}
/**
 * Predicates of incoming function
 * @param name
 * @returns
 */
function predicateFunction(name, ff) {
    return ff
        .filter(f => f.toLowerCase()
        .includes(name.toLowerCase()))
        .sort((vodka, chacha) => vodka.length - chacha.length)[0]
        || null;
}
/**
 * Gets a function in matched string
 * @param name
 * @returns
 */
function getFunction(name, ff) {
    return ff
        .filter(f => f.toLowerCase()
        .includes(name.toLowerCase()))
        .find((vodka) => vodka.length === name.length)
        || null;
}
function FFToString() {
    return Object.keys(FunctionList_1.FunctionList);
}
/**
 * Interprets code into AST
 * @param code
 * @returns
 */
function Interpreter(code, reverse = false) {
    const copyCode = code.slice(0);
    let current = 0;
    let char = copyCode[current];
    const collectedFunctions = [['', '']];
    let newCode = "";
    collectedFunctions.shift();
    function getUnpack(dontCompile = false) {
        if (char !== "[")
            return null;
        let stop = false;
        let end = 0;
        let data = "[";
        unpacking: while (current < copyCode.length && !stop) {
            char = copyCode[current];
            current++;
            if (char === "[") {
                end += 1;
            }
            if (char === "]")
                end -= 1;
            data += char;
            if (end < 0) {
                stop = true;
                break unpacking;
            }
        }
        return dontCompile ? data : Interpreter(data);
    }
    parsing: while (current < copyCode.length) {
        char = copyCode[current];
        if (char === "$") {
            let initialValue = '$';
            current++;
            char = copyCode[current];
            getFunc: while (current < copyCode.length) {
                if (/[\[\]$ ]/.test(char))
                    break getFunc;
                initialValue += char;
                current++;
                if (copyCode[current])
                    char = copyCode[current];
                else
                    char = "";
                if (!predicateFunction(initialValue, FFToString().concat(Plugin_1.CompilerPlugin.manager.array().map(f => f.identifier)))) {
                    break getFunc;
                }
            }
            if (char !== "$")
                initialValue += char;
            if (char !== "$")
                current++;
            const F = getFunction(closestMatch(initialValue, FFToString().concat(Plugin_1.CompilerPlugin.manager.array().map(f => f.identifier))) || "", FFToString().concat(Plugin_1.CompilerPlugin.manager.array().map(f => f.identifier)));
            const body = [F, getUnpack()];
            if (F)
                collectedFunctions.push(body);
            newCode += initialValue;
            continue parsing;
        }
        else {
            newCode += char;
            current++;
            continue parsing;
        }
    }
    return { code: newCode, functions: reverse ? collectedFunctions.reverse() : collectedFunctions };
}
exports.default = Interpreter;
//# sourceMappingURL=Interpreter.js.map