import { inspect } from "util";

class IsolatedEnvironment {
    variables: any;
    constructor(public readonly parent?: IsolatedEnvironment) {
        this.variables = Object.create(parent ? parent.variables : null);
    }
    extend() {
        return new IsolatedEnvironment(this);
    }
    lookup(name: string) {
        let scope: IsolatedEnvironment = this;
        while (scope) {
            if (Object.prototype.hasOwnProperty.call(scope.variables, name))
                return scope;
            scope = scope.parent;
        }
    }
    get(name: string) {
        if (name in this.variables)
            return this.variables[name];
        throw new Error("Undefined variable " + name);
    }
    set(name: string, value: string) {
        let scope = this.lookup(name);
        // let's not allow defining globals from a nested environment
        if (!scope && this.parent)
            throw new Error("Undefined variable " + name);
        return (scope || this).variables[name] = value;
    }
    def(name: string, value: any) {
        return this.variables[name] = value;
    }
}

function apply_op(op: string, a: number, b: number) {
    function num(x: number) {
        if (typeof x != "number")
            throw new Error("Expected number but got " + x);
        return x;
    }
    function div(x: number) {
        if (num(x) == 0)
            throw new Error("Divide by zero");
        return x;
    }
    switch (op) {
      case "+"  : return num(a) + num(b);
      case "-"  : return num(a) - num(b);
      case "*"  : return num(a) * num(b);
      case "/"  : return num(a) / div(b);
      case "%"  : return num(a) % div(b);
      case "&&" : return (a !== false as unknown) && b;
      case "||" : return (a !== false as unknown) ? a : b;
      case "<"  : return num(a) < num(b);
      case ">"  : return num(a) > num(b);
      case "<=" : return num(a) <= num(b);
      case ">=" : return num(a) >= num(b);
      case "==" : return a === b;
      case "!=" : return a !== b;
    }
    throw new Error("Can't apply operator " + op);
}

function evaluate(exp, env: IsolatedEnvironment) {
    switch(exp.type) {
        case "str":
        case "bool":
        case "num":
            return exp.value;
        case "var": 
            return env.get(exp.value.slice(1));
        case "binary": 
            return apply_op(
                exp.operator,
                Number(evaluate(exp.left, env)) || exp.left,
                Number(evaluate(exp.right, env)) || exp.right
            );
        case "if":
            let cond = evaluate(exp.cond, env);
            if (cond) return evaluate(exp.then, env);
            return exp.else ? evaluate(exp.else, env) : false;
        case "prog":
            let val = false;
            exp.body.forEach(function(exp){ val = evaluate(exp, env) });
            return val;
        case "call":
            var func = evaluate(exp.func, env);
            return func.apply(null, exp.args.map(function(arg){
                return evaluate(arg, env);
            }));
    }
}

class Environment extends IsolatedEnvironment {
    public constructor(public readonly parent?: IsolatedEnvironment) {
        super(parent);
        // Local Variables
        this.def("error", function (txt: string) {
            let err = new Error(txt);
            // need improvise
            throw /*uncaught err*/ err;
        });

        this.def("let", (name: string, value: string) => {
            if (value) return this.set(name, value);
            return this.get(name);
        });
        // Global variables
        if (!parent) {
            this.def("printf", function (object: any, showHidden: string, depth: string) {
                console.log(inspect(object, showHidden === "true", depth !== undefined ? depth === "null" ? null : Number(depth) : undefined, true));
            });
            this.def("print", function(...args: any[]) {
                console.log(...args)
            })
            this.def("var", (name: string, value: string) => {
                if (value) return this.set(name, value);
                return this.get(name);
            });

            // Arithmetics
            this.def("sum", (...num_str: string[]) => {
                let num = num_str.map(v => Number(v));
                return num.reduce((pv, v) => pv += v, 0);
            });
        }
    }
}

export {
    IsolatedEnvironment,
    Environment,
    evaluate
}