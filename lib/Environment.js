"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = exports.Environment = exports.IsolatedEnvironment = void 0;
const util_1 = require("util");
class IsolatedEnvironment {
    parent;
    variables;
    constructor(parent) {
        this.parent = parent;
        this.variables = Object.create(parent ? parent.variables : null);
    }
    extend() {
        return new IsolatedEnvironment(this);
    }
    lookup(name) {
        let scope = this;
        while (scope) {
            if (Object.prototype.hasOwnProperty.call(scope.variables, name))
                return scope;
            scope = scope.parent;
        }
    }
    get(name) {
        if (name in this.variables)
            return this.variables[name];
        throw new Error("Undefined variable " + name);
    }
    set(name, value) {
        let scope = this.lookup(name);
        // let's not allow defining globals from a nested environment
        if (!scope && this.parent)
            throw new Error("Undefined variable " + name);
        return (scope || this).variables[name] = value;
    }
    def(name, value) {
        return this.variables[name] = value;
    }
}
exports.IsolatedEnvironment = IsolatedEnvironment;
function apply_op(op, a, b) {
    function num(x) {
        if (typeof x != "number")
            throw new Error("Expected number but got " + x);
        return x;
    }
    function div(x) {
        if (num(x) == 0)
            throw new Error("Divide by zero");
        return x;
    }
    switch (op) {
        case "+": return num(a) + num(b);
        case "-": return num(a) - num(b);
        case "*": return num(a) * num(b);
        case "/": return num(a) / div(b);
        case "%": return num(a) % div(b);
        case "&&": return (a !== false) && b;
        case "||": return (a !== false) ? a : b;
        case "<": return num(a) < num(b);
        case ">": return num(a) > num(b);
        case "<=": return num(a) <= num(b);
        case ">=": return num(a) >= num(b);
        case "==": return a === b;
        case "!=": return a !== b;
    }
    throw new Error("Can't apply operator " + op);
}
function evaluate(exp, env) {
    switch (exp.type) {
        case "str":
        case "bool":
        case "num":
            return exp.value;
        case "var":
            return env.get(exp.value.slice(1));
        case "binary":
            return apply_op(exp.operator, Number(evaluate(exp.left, env)) || exp.left, Number(evaluate(exp.right, env)) || exp.right);
        case "if":
            let cond = evaluate(exp.cond, env);
            if (cond)
                return evaluate(exp.then, env);
            return exp.else ? evaluate(exp.else, env) : false;
        case "prog":
            let val = false;
            exp.body.forEach(function (exp) { val = evaluate(exp, env); });
            return val;
        case "call":
            var func = evaluate(exp.func, env);
            return func.apply(null, exp.args.map(function (arg) {
                return evaluate(arg, env);
            }));
    }
}
exports.evaluate = evaluate;
class Environment extends IsolatedEnvironment {
    parent;
    constructor(parent) {
        super(parent);
        this.parent = parent;
        // Local Variables
        this.def("error", function (txt) {
            let err = new Error(txt);
            // need improvise
            throw /*uncaught err*/ err;
        });
        this.def("let", (name, value) => {
            if (value)
                return this.set(name, value);
            return this.get(name);
        });
        // Global variables
        if (!parent) {
            this.def("printf", function (object, showHidden, depth) {
                console.log((0, util_1.inspect)(object, showHidden === "true", depth !== undefined ? depth === "null" ? null : Number(depth) : undefined, true));
            });
            this.def("print", function (...args) {
                console.log(...args);
            });
            this.def("var", (name, value) => {
                if (value)
                    return this.set(name, value);
                return this.get(name);
            });
            // Arithmetics
            this.def("sum", (...num_str) => {
                let num = num_str.map(v => Number(v));
                return num.reduce((pv, v) => pv += v, 0);
            });
        }
    }
}
exports.Environment = Environment;
