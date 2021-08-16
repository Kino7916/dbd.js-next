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
declare function Interpreter(code: string, reverse?: boolean): InterpreterResult;
export default Interpreter;
