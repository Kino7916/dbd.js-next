import { CallStmt, VariableDecl, Literal, Object, ObjectProperty, CallExp, ArrayObject, Variable, Condition, Operation, IfStmt, ElseIfStmt, ElseStmt } from "./modules";
import { ConditionOperationType } from "../utils/constants";
declare class Visitor {
    visitElseStmt(element: ElseStmt): string;
    visitElseIfStmt(element: ElseIfStmt): string;
    visitIfStmt(element: IfStmt): string;
    visitOperation(element: Operation): string;
    visitCondition(element: Condition): string;
    _getCperation(index: ConditionOperationType): string;
    visitVariable(element: Variable): string;
    visitArrayObject(element: ArrayObject): string;
    visitCallExp(element: CallExp): string;
    _TryParse(element: any): any;
    _TryParseLiteral(value: any): string;
    visitLiteral(element: Literal): string;
    visitObject(element: Object): string;
    _visitObjectProperty(element: ObjectProperty): string;
    visitCallStmt(element: CallStmt): string;
    visitVariableDecl(element: VariableDecl): string;
}
export default Visitor;
