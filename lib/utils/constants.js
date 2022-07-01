"use strict";
exports.__esModule = true;
exports.ConditionOperationType = exports.VariableDeclType = exports.MethodTypes = void 0;
var MethodTypes;
(function (MethodTypes) {
    MethodTypes[MethodTypes["None"] = 0] = "None";
    MethodTypes[MethodTypes["Static"] = 1] = "Static";
})(MethodTypes || (MethodTypes = {}));
exports.MethodTypes = MethodTypes;
var VariableDeclType;
(function (VariableDeclType) {
    VariableDeclType[VariableDeclType["Default"] = 0] = "Default";
    VariableDeclType[VariableDeclType["Constant"] = 1] = "Constant";
    VariableDeclType[VariableDeclType["Scope"] = 2] = "Scope";
})(VariableDeclType || (VariableDeclType = {}));
exports.VariableDeclType = VariableDeclType;
var ConditionOperationType;
(function (ConditionOperationType) {
    ConditionOperationType[ConditionOperationType["BigNEq"] = 0] = "BigNEq";
    ConditionOperationType[ConditionOperationType["Big"] = 1] = "Big";
    ConditionOperationType[ConditionOperationType["LowNEq"] = 2] = "LowNEq";
    ConditionOperationType[ConditionOperationType["Low"] = 3] = "Low";
    ConditionOperationType[ConditionOperationType["Equal"] = 4] = "Equal";
    ConditionOperationType[ConditionOperationType["NotEqual"] = 5] = "NotEqual";
})(ConditionOperationType || (ConditionOperationType = {}));
exports.ConditionOperationType = ConditionOperationType;
