export interface InterpreterResult {
    code: string;
    functions: IntPushType[];
}
declare type IntPushType = [string, any];
/**
 * Interprets code into AST
 * @param code
 * @returns
 */
declare function Interpreter(code: string): InterpreterResult;
export default Interpreter;
