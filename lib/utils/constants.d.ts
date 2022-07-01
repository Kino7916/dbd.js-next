declare enum MethodTypes {
    None = 0,
    Static = 1
}
declare enum VariableDeclType {
    Default = 0,
    Constant = 1,
    Scope = 2
}
declare enum ConditionOperationType {
    BigNEq = 0,
    Big = 1,
    LowNEq = 2,
    Low = 3,
    Equal = 4,
    NotEqual = 5
}
export { MethodTypes, VariableDeclType, ConditionOperationType };
