import { ConditionOperationType, MethodTypes, VariableDeclType } from "../utils/constants";
import Visitor from "./Visitor";

class ArrayObject {
    public body: (Literal | any)[];
    public constructor(...body: (Literal | any)[]) {
        this.body = body;
    };
    accept(visitor: Visitor) { return visitor.visitArrayObject(this) }
}

class Operation {
    public constructor(public body: any[]) {}
    accept(visitor: Visitor) { return visitor.visitOperation(this) }
}

class Condition {
    public constructor(public Left: any, public Right: any, public operation: ConditionOperationType) {}
    public accept(visitor: Visitor) { return visitor.visitCondition(this) }
}

class IfStmt {
    public constructor(public body: any[]) {}
    accept(visitor: Visitor) { return visitor.visitIfStmt(this) }
}

class ElseIfStmt {
    public constructor(public body: any[]) {}
    accept(visitor: Visitor) { return visitor.visitElseIfStmt(this) }
}

class ElseStmt {
    public constructor(public body: any[]) {}
    accept(visitor: Visitor) { return visitor.visitElseStmt(this) }
}

class CallStmt {
    public hasReturn: boolean = false;
    public body: (Literal | any)[];
    public constructor(public name: string, ...body: (Argument | any)[]) {
        this.body = body
    }
    accept(visitor: Visitor) { return visitor.visitCallStmt(this) }
}

class ReturnStmt {
    public constructor(public variableName: string) {}
    accept(visitor: Visitor) { throw new Error("Trying to declare a return outside of Call Statement!") }
}

class Argument {
    public constructor(public name: string, public defaultValue: any) {}
    accept(visitor: Visitor) { throw new Error("Trying to declare an explicit argument!"); }
}

class Literal {
    public constructor(public value: string) {};
    accept(visitor: Visitor) { return visitor.visitLiteral(this) }
}

class Object {
    public constructor(public body: any[]) {};
    accept(visitor: Visitor) { return visitor.visitObject(this) }
}

class ObjectProperty {
    public constructor(public name: string, public body: any = []) {};
    accept(visitor: Visitor) { throw new Error("Trying to declare an object property explicitly!")}
}

class CallExp {
    argument: any[];
    public constructor(public name: string, ...argument: any[]) {
        this.argument = argument;
    };
    accept(visitor: Visitor) { return visitor.visitCallExp(this) }
}

class Variable {
    public constructor(public name: string, public setAs: any) {}
    accept(visitor: Visitor) { return visitor.visitVariable(this) }
}

class dotNotation {
    public constructor() {};
    accept(visitor: Visitor) { return "." }
}

class codeSeparator {
    public constructor() {};
    accept(visitor:Visitor) { return ";"}
}

class endOfLine {
    public constructor() {};
    accept(visitor: Visitor) { return "\n" }
}

class AsyncFunction {
    public constructor() {};
    accept(visitor: Visitor) { return "async "}
}

class Export {
    public constructor() {};
    accept(visitor: Visitor) { return "module.exports = " }
}

class VariableDecl {
    public constructor(public name: string, public type: VariableDeclType, public value: (Literal | Argument)) {}
    accept(visitor: Visitor) { return visitor.visitVariableDecl(this) }
}

const Dot = new dotNotation();
const Separator = new codeSeparator();
const EOF = new endOfLine();
const Async = new AsyncFunction();
const ExportModule = new Export();

export {
    Argument,
    CallStmt,
    VariableDecl,
    ReturnStmt,
    Literal,
    Object,
    ObjectProperty,
    CallExp,
    ArrayObject,
    Variable,
    Condition,
    ElseIfStmt,
    ElseStmt,
    IfStmt,
    Operation,
    Separator,
    Dot,
    EOF,
    Async,
    ExportModule
}