import { CallStmt, VariableDecl, Argument, ReturnStmt, Literal, Object, ObjectProperty, CallExp, ArrayObject, Variable, Condition, Operation, IfStmt, ElseIfStmt, ElseStmt } from "./modules";
import { VariableDeclType, MethodTypes, ConditionOperationType } from "../utils/constants";

class Visitor {
    visitElseStmt(element: ElseStmt) {
        let ctx = `else {`;
        for (const e of element.body) {
            ctx += this._TryParse(e);
        }
        ctx += "}";
        return ctx;
    }

    visitElseIfStmt(element: ElseIfStmt) {
        if (! (element.body[0] instanceof Condition)) {
            throw new Error("If statement requires Condition at start of body!");
        };
        let ctx = `else if ${element.body[0].accept(this)} {`;
        for (const e of element.body) {
            if (element.body[0] === e) continue;
            ctx += this._TryParse(e);
        }
        ctx += "}";
        return ctx;
    }

    visitIfStmt(element: IfStmt) {
        if (! (element.body[0] instanceof Condition)) {
            throw new Error("If statement requires Condition at start of body!");
        };
        let ctx = `if ${element.body[0].accept(this)} {`;
        for (const e of element.body) {
            if (element.body[0] === e) continue;
            ctx += this._TryParse(e);
        }
        ctx += "}";
        return ctx;
    }

    visitOperation(element: Operation) {
        let ctx = "(";
        for (const e of element.body) {
            ctx += e.accept(this);
        }
        ctx += ")";
        return ctx;
    }

    visitCondition(element: Condition) {
        const ctxL = this._TryParse(element.Left);
        const ctxR = this._TryParse(element.Right);
        const ctx = `(${ctxL} ${this._getCperation(element.operation)} ${ctxR})`;
        return ctx;
    }

    _getCperation(index: ConditionOperationType): string {
        let res;
        switch (index) {
            case ConditionOperationType.Big: res = ">";
            case ConditionOperationType.BigNEq: res = ">=";
            case ConditionOperationType.Equal: res = "===";
            case ConditionOperationType.NotEqual: res = "!==";
            case ConditionOperationType.LowNEq: res = "<=";
            case ConditionOperationType.Low: res = "<";
        }
        return res;
    }

    visitVariable(element: Variable) {
        if (element.setAs) {
            return `${element.name} = ${this._TryParse(element)}`
        } else {
            return `${element.name}`;
        }
    }

    visitArrayObject(element: ArrayObject) {
        let ctx = "[";
        for (const e of element.body) {
            if (element.body[0] !== e) {
                ctx += ", ";
            }
            if (e?.accept) {
                ctx += e.accept(this)
            } else {
                ctx += this._TryParseLiteral(e?.value || e);
            }
        }
        ctx += "]";
        return ctx;
    }

    visitCallExp(element: CallExp) {
        let ctx = `${element.name}(`;
        for (const e of element.argument) {
            if (element.argument[0] !== e) {
                ctx += ", "
            }
            if (Array.isArray(e)) {
                for (const el of e) {
                    if (el?.accept) {
                        ctx += el.accept(this);
                    } else {
                        ctx += this._TryParseLiteral(el)
                    }
                }
            } else {
                if (e?.accept) {
                    ctx += e.accept(this);
                } else {
                    ctx += this._TryParseLiteral(e)
                }
            }
        }
        ctx += ")";
        return ctx;
    }

    _TryParse(element: any) {
        if (Array.isArray(element)) {
            let ctx = "";
            for (const e of element) {
                ctx += this._TryParse(e);
            }
            return ctx;
        }
        if (element instanceof Argument) {
            return this._TryParseLiteral(element.defaultValue);
        }
        else if (element?.accept) {
            return element.accept(this);
        } else {
            return this._TryParseLiteral(element);
        }
    }

    _TryParseLiteral(value: any) {
        if (typeof value === "string") {
            return `"${value}"`;
        } else if (value) {
            return `${value}`;
        } else {
            return "";
        }
    }

    visitLiteral(element: Literal) {
        return this._TryParseLiteral(element.value)
    }

    visitObject(element: Object) {
        let ctx = "{"
        for (const e of element.body) {
            if (! (e instanceof ObjectProperty))
                throw new Error("Element must be instanceof ObjectProperty!")
            if (element.body[0] != e) {
                ctx += ","
            }
            ctx += this._visitObjectProperty(e);
        }
        ctx += "}"
        return ctx;
    }

    _visitObjectProperty(element: ObjectProperty) {
        let ctx = `${element.name}: `
        if (!Array.isArray(element.body)) {
            if (element.body?.accept) {
                ctx += element.body.accept(this);
            } else if(element.body) {
                ctx += this._TryParseLiteral(element.body)
            } else {
                ctx += element.body === null ? "null" : "undefined"
            }
            return ctx
        };
        if (element.body?.length > 1) {
            ctx += "{";
            for (const e of element.body) {
                ctx += e.accept(this);
                if (!ctx.endsWith("")) {
                    ctx += ""
                }
            }
            return ctx;
        }
        else if (element.body?.length === 1) {
            if (element.body[0]?.accept) {
                ctx += element.body[0].accept(this);
            } else if(element.body[0]) {
                ctx += this._TryParseLiteral(element.body)
            } else {
                ctx += element.body[0] === null ? "null" : "undefined"
            }
            return ctx;
        }
    }

    visitCallStmt(element: CallStmt) {
        let ctx = `function ${element.name}(`;
        let scope = element;
        let hasBeenWarned = false;
        let endArg = false;
        for (const arg of element.body) {
            if (! (arg instanceof Argument)) {
                if (!endArg) {
                    endArg = true;
                    ctx += ") {";
                }
                if (arg instanceof ReturnStmt) {
                    if (scope.hasReturn) throw new Error("Redeclaring a return statement in the same scope is prohibited!");
                    ctx += `return ${arg.variableName};`;
                    continue;
                }
                if (scope.hasReturn) {
                    if (!hasBeenWarned) {
                        hasBeenWarned = true;
                        console.warn("Unreadable-code detected!");
                    }
                }
                ctx += arg.accept(this);
            } else {
                if (endArg) {
                    throw new Error("End of Argument, but another exist!");
                }
                if (element.body[0] != arg) {
                    ctx += ", "
                }
                ctx += `${arg.name}`;
            }
        }
        ctx += "}"
        return ctx;
    }

    visitVariableDecl(element: VariableDecl) {
        let ctx = "";

        if (element.type == VariableDeclType.Constant) {
            ctx += `const ${element.name}`;
        } else if (element.type == VariableDeclType.Default) {
            ctx += `var ${element.name}`;
        } else if (element.type == VariableDeclType.Scope) {
            ctx += `let ${element.name}`;
        } else throw new Error("Unknown Variable Declaration type!");
        const value = this._TryParse(element.value);
        if (value) {
            ctx += ` = ${value}`;
        } else ctx += "";

        return ctx;
    }
}

export default Visitor;