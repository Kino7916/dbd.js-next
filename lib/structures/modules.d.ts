import { ConditionOperationType, VariableDeclType } from "../utils/constants";
import Visitor from "./Visitor";
declare class ArrayObject {
    body: (Literal | any)[];
    constructor(...body: (Literal | any)[]);
    accept(visitor: Visitor): string;
}
declare class Operation {
    body: any[];
    constructor(body: any[]);
    accept(visitor: Visitor): string;
}
declare class Condition {
    Left: any;
    Right: any;
    operation: ConditionOperationType;
    constructor(Left: any, Right: any, operation: ConditionOperationType);
    accept(visitor: Visitor): string;
}
declare class IfStmt {
    body: any[];
    constructor(body: any[]);
    accept(visitor: Visitor): string;
}
declare class ElseIfStmt {
    body: any[];
    constructor(body: any[]);
    accept(visitor: Visitor): string;
}
declare class ElseStmt {
    body: any[];
    constructor(body: any[]);
    accept(visitor: Visitor): string;
}
declare class CallStmt {
    name: string;
    hasReturn: boolean;
    body: (Literal | any)[];
    constructor(name: string, ...body: (Argument | any)[]);
    accept(visitor: Visitor): string;
}
declare class ReturnStmt {
    variableName: string;
    constructor(variableName: string);
    accept(visitor: Visitor): void;
}
declare class Argument {
    name: string;
    defaultValue: any;
    constructor(name: string, defaultValue: any);
    accept(visitor: Visitor): void;
}
declare class Literal {
    value: string;
    constructor(value: string);
    accept(visitor: Visitor): string;
}
declare class Object {
    body: any[];
    constructor(body: any[]);
    accept(visitor: Visitor): string;
}
declare class ObjectProperty {
    name: string;
    body: any;
    constructor(name: string, body?: any);
    accept(visitor: Visitor): void;
}
declare class CallExp {
    name: string;
    argument: any[];
    constructor(name: string, ...argument: any[]);
    accept(visitor: Visitor): string;
}
declare class Variable {
    name: string;
    setAs: any;
    constructor(name: string, setAs: any);
    accept(visitor: Visitor): string;
}
declare class dotNotation {
    constructor();
    accept(visitor: Visitor): string;
}
declare class codeSeparator {
    constructor();
    accept(visitor: Visitor): string;
}
declare class endOfLine {
    constructor();
    accept(visitor: Visitor): string;
}
declare class AsyncFunction {
    constructor();
    accept(visitor: Visitor): string;
}
declare class Export {
    constructor();
    accept(visitor: Visitor): string;
}
declare class VariableDecl {
    name: string;
    type: VariableDeclType;
    value: (Literal | Argument);
    constructor(name: string, type: VariableDeclType, value: (Literal | Argument));
    accept(visitor: Visitor): string;
}
declare const Dot: dotNotation;
declare const Separator: codeSeparator;
declare const EOF: endOfLine;
declare const Async: AsyncFunction;
declare const ExportModule: Export;
export { Argument, CallStmt, VariableDecl, ReturnStmt, Literal, Object, ObjectProperty, CallExp, ArrayObject, Variable, Condition, ElseIfStmt, ElseStmt, IfStmt, Operation, Separator, Dot, EOF, Async, ExportModule };
