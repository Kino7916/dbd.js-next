export interface InterpreterResult {
    code: string;
    functions: [
        string,
        InterpreterResult
    ];
}
