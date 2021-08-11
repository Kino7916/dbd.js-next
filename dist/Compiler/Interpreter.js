"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FunctionList_1 = require("./FunctionList");
var Plugin_1 = require("../Handlers/Plugin");
/**
 * Finds the closest function in string
 * @param name
 * @returns
 */
function closestMatch(name, ff) {
    return ff
        .filter(function (f) { return name.slice(0, f.length).toLowerCase() === f.toLowerCase(); })
        .sort(function (vodka, chacha) { return chacha.length - vodka.length; })[0] || null;
}
/**
 * Predicates of incoming function
 * @param name
 * @returns
 */
function predicateFunction(name, ff) {
    return ff
        .filter(function (f) { return f.toLowerCase()
        .includes(name.toLowerCase()); })
        .sort(function (vodka, chacha) { return vodka.length - chacha.length; })[0]
        || null;
}
/**
 * Gets a function in matched string
 * @param name
 * @returns
 */
function getFunction(name, ff) {
    return ff
        .filter(function (f) { return f.toLowerCase()
        .includes(name.toLowerCase()); })
        .find(function (vodka) { return vodka.length === name.length; })
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
function Interpreter(code) {
    var copyCode = code.slice(0);
    var current = 0;
    var char = copyCode[current];
    var collectedFunctions = [['', '']];
    var newCode = "";
    collectedFunctions.shift();
    function getUnpack(dontCompile) {
        if (dontCompile === void 0) { dontCompile = false; }
        if (char !== "[")
            return null;
        var stop = false;
        var end = 0;
        var data = "[";
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
            var initialValue = '$';
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
                if (!predicateFunction(initialValue, FFToString().concat(Plugin_1.CompilerPlugin.manager.array().map(function (f) { return f.identifier; })))) {
                    break getFunc;
                }
            }
            if (char !== "$")
                initialValue += char;
            if (char !== "$")
                current++;
            var F = getFunction(closestMatch(initialValue, FFToString().concat(Plugin_1.CompilerPlugin.manager.array().map(function (f) { return f.identifier; }))) || "", FFToString().concat(Plugin_1.CompilerPlugin.manager.array().map(function (f) { return f.identifier; })));
            var body = [F, getUnpack()];
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
    return { code: newCode, functions: collectedFunctions };
}
exports.default = Interpreter;
//# sourceMappingURL=Interpreter.js.map