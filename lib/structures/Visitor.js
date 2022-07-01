"use strict";
exports.__esModule = true;
var modules_1 = require("./modules");
var constants_1 = require("../utils/constants");
var Visitor = /** @class */ (function () {
    function Visitor() {
    }
    Visitor.prototype.visitElseStmt = function (element) {
        var ctx = "else {";
        for (var _i = 0, _a = element.body; _i < _a.length; _i++) {
            var e = _a[_i];
            ctx += this._TryParse(e);
        }
        ctx += "}";
        return ctx;
    };
    Visitor.prototype.visitElseIfStmt = function (element) {
        if (!(element.body[0] instanceof modules_1.Condition)) {
            throw new Error("If statement requires Condition at start of body!");
        }
        ;
        var ctx = "else if ".concat(element.body[0].accept(this), " {");
        for (var _i = 0, _a = element.body; _i < _a.length; _i++) {
            var e = _a[_i];
            if (element.body[0] === e)
                continue;
            ctx += this._TryParse(e);
        }
        ctx += "}";
        return ctx;
    };
    Visitor.prototype.visitIfStmt = function (element) {
        if (!(element.body[0] instanceof modules_1.Condition)) {
            throw new Error("If statement requires Condition at start of body!");
        }
        ;
        var ctx = "if ".concat(element.body[0].accept(this), " {");
        for (var _i = 0, _a = element.body; _i < _a.length; _i++) {
            var e = _a[_i];
            if (element.body[0] === e)
                continue;
            ctx += this._TryParse(e);
        }
        ctx += "}";
        return ctx;
    };
    Visitor.prototype.visitOperation = function (element) {
        var ctx = "(";
        for (var _i = 0, _a = element.body; _i < _a.length; _i++) {
            var e = _a[_i];
            ctx += e.accept(this);
        }
        ctx += ")";
        return ctx;
    };
    Visitor.prototype.visitCondition = function (element) {
        var ctxL = this._TryParse(element.Left);
        var ctxR = this._TryParse(element.Right);
        var ctx = "(".concat(ctxL, " ").concat(this._getCperation(element.operation), " ").concat(ctxR, ")");
        return ctx;
    };
    Visitor.prototype._getCperation = function (index) {
        var res;
        switch (index) {
            case constants_1.ConditionOperationType.Big: res = ">";
            case constants_1.ConditionOperationType.BigNEq: res = ">=";
            case constants_1.ConditionOperationType.Equal: res = "===";
            case constants_1.ConditionOperationType.NotEqual: res = "!==";
            case constants_1.ConditionOperationType.LowNEq: res = "<=";
            case constants_1.ConditionOperationType.Low: res = "<";
        }
        return res;
    };
    Visitor.prototype.visitVariable = function (element) {
        if (element.setAs) {
            return "".concat(element.name, " = ").concat(this._TryParse(element));
        }
        else {
            return "".concat(element.name);
        }
    };
    Visitor.prototype.visitArrayObject = function (element) {
        var ctx = "[";
        for (var _i = 0, _a = element.body; _i < _a.length; _i++) {
            var e = _a[_i];
            if (element.body[0] !== e) {
                ctx += ", ";
            }
            if (e === null || e === void 0 ? void 0 : e.accept) {
                ctx += e.accept(this);
            }
            else {
                ctx += this._TryParseLiteral((e === null || e === void 0 ? void 0 : e.value) || e);
            }
        }
        ctx += "]";
        return ctx;
    };
    Visitor.prototype.visitCallExp = function (element) {
        var ctx = "".concat(element.name, "(");
        for (var _i = 0, _a = element.argument; _i < _a.length; _i++) {
            var e = _a[_i];
            if (element.argument[0] !== e) {
                ctx += ", ";
            }
            if (Array.isArray(e)) {
                for (var _b = 0, e_1 = e; _b < e_1.length; _b++) {
                    var el = e_1[_b];
                    if (el === null || el === void 0 ? void 0 : el.accept) {
                        ctx += el.accept(this);
                    }
                    else {
                        ctx += this._TryParseLiteral(el);
                    }
                }
            }
            else {
                if (e === null || e === void 0 ? void 0 : e.accept) {
                    ctx += e.accept(this);
                }
                else {
                    ctx += this._TryParseLiteral(e);
                }
            }
        }
        ctx += ")";
        return ctx;
    };
    Visitor.prototype._TryParse = function (element) {
        if (Array.isArray(element)) {
            var ctx = "";
            for (var _i = 0, element_1 = element; _i < element_1.length; _i++) {
                var e = element_1[_i];
                ctx += this._TryParse(e);
            }
            return ctx;
        }
        if (element instanceof modules_1.Argument) {
            return this._TryParseLiteral(element.defaultValue);
        }
        else if (element === null || element === void 0 ? void 0 : element.accept) {
            return element.accept(this);
        }
        else {
            return this._TryParseLiteral(element);
        }
    };
    Visitor.prototype._TryParseLiteral = function (value) {
        if (typeof value === "string") {
            return "\"".concat(value, "\"");
        }
        else if (value) {
            return "".concat(value);
        }
        else {
            return "";
        }
    };
    Visitor.prototype.visitLiteral = function (element) {
        return this._TryParseLiteral(element.value);
    };
    Visitor.prototype.visitObject = function (element) {
        var ctx = "{";
        for (var _i = 0, _a = element.body; _i < _a.length; _i++) {
            var e = _a[_i];
            if (!(e instanceof modules_1.ObjectProperty))
                throw new Error("Element must be instanceof ObjectProperty!");
            if (element.body[0] != e) {
                ctx += ",";
            }
            ctx += this._visitObjectProperty(e);
        }
        ctx += "}";
        return ctx;
    };
    Visitor.prototype._visitObjectProperty = function (element) {
        var _a, _b, _c, _d;
        var ctx = "".concat(element.name, ": ");
        if (!Array.isArray(element.body)) {
            if ((_a = element.body) === null || _a === void 0 ? void 0 : _a.accept) {
                ctx += element.body.accept(this);
            }
            else if (element.body) {
                ctx += this._TryParseLiteral(element.body);
            }
            else {
                ctx += element.body === null ? "null" : "undefined";
            }
            return ctx;
        }
        ;
        if (((_b = element.body) === null || _b === void 0 ? void 0 : _b.length) > 1) {
            ctx += "{";
            for (var _i = 0, _e = element.body; _i < _e.length; _i++) {
                var e = _e[_i];
                ctx += e.accept(this);
                if (!ctx.endsWith("")) {
                    ctx += "";
                }
            }
            return ctx;
        }
        else if (((_c = element.body) === null || _c === void 0 ? void 0 : _c.length) === 1) {
            if ((_d = element.body[0]) === null || _d === void 0 ? void 0 : _d.accept) {
                ctx += element.body[0].accept(this);
            }
            else if (element.body[0]) {
                ctx += this._TryParseLiteral(element.body);
            }
            else {
                ctx += element.body[0] === null ? "null" : "undefined";
            }
            return ctx;
        }
    };
    Visitor.prototype.visitCallStmt = function (element) {
        var ctx = "function ".concat(element.name, "(");
        var scope = element;
        var hasBeenWarned = false;
        var endArg = false;
        for (var _i = 0, _a = element.body; _i < _a.length; _i++) {
            var arg = _a[_i];
            if (!(arg instanceof modules_1.Argument)) {
                if (!endArg) {
                    endArg = true;
                    ctx += ") {";
                }
                if (arg instanceof modules_1.ReturnStmt) {
                    if (scope.hasReturn)
                        throw new Error("Redeclaring a return statement in the same scope is prohibited!");
                    ctx += "return ".concat(arg.variableName, ";");
                    continue;
                }
                if (scope.hasReturn) {
                    if (!hasBeenWarned) {
                        hasBeenWarned = true;
                        console.warn("Unreadable-code detected!");
                    }
                }
                ctx += arg.accept(this);
            }
            else {
                if (endArg) {
                    throw new Error("End of Argument, but another exist!");
                }
                if (element.body[0] != arg) {
                    ctx += ", ";
                }
                ctx += "".concat(arg.name);
            }
        }
        ctx += "}";
        return ctx;
    };
    Visitor.prototype.visitVariableDecl = function (element) {
        var ctx = "";
        if (element.type == constants_1.VariableDeclType.Constant) {
            ctx += "const ".concat(element.name);
        }
        else if (element.type == constants_1.VariableDeclType.Default) {
            ctx += "var ".concat(element.name);
        }
        else if (element.type == constants_1.VariableDeclType.Scope) {
            ctx += "let ".concat(element.name);
        }
        else
            throw new Error("Unknown Variable Declaration type!");
        var value = this._TryParse(element.value);
        if (value) {
            ctx += " = ".concat(value);
        }
        else
            ctx += "";
        return ctx;
    };
    return Visitor;
}());
exports["default"] = Visitor;
