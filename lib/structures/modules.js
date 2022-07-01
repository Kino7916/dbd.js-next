"use strict";
exports.__esModule = true;
exports.ExportModule = exports.Async = exports.EOF = exports.Dot = exports.Separator = exports.Operation = exports.IfStmt = exports.ElseStmt = exports.ElseIfStmt = exports.Condition = exports.Variable = exports.ArrayObject = exports.CallExp = exports.ObjectProperty = exports.Object = exports.Literal = exports.ReturnStmt = exports.VariableDecl = exports.CallStmt = exports.Argument = void 0;
var ArrayObject = /** @class */ (function () {
    function ArrayObject() {
        var body = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            body[_i] = arguments[_i];
        }
        this.body = body;
    }
    ;
    ArrayObject.prototype.accept = function (visitor) { return visitor.visitArrayObject(this); };
    return ArrayObject;
}());
exports.ArrayObject = ArrayObject;
var Operation = /** @class */ (function () {
    function Operation(body) {
        this.body = body;
    }
    Operation.prototype.accept = function (visitor) { return visitor.visitOperation(this); };
    return Operation;
}());
exports.Operation = Operation;
var Condition = /** @class */ (function () {
    function Condition(Left, Right, operation) {
        this.Left = Left;
        this.Right = Right;
        this.operation = operation;
    }
    Condition.prototype.accept = function (visitor) { return visitor.visitCondition(this); };
    return Condition;
}());
exports.Condition = Condition;
var IfStmt = /** @class */ (function () {
    function IfStmt(body) {
        this.body = body;
    }
    IfStmt.prototype.accept = function (visitor) { return visitor.visitIfStmt(this); };
    return IfStmt;
}());
exports.IfStmt = IfStmt;
var ElseIfStmt = /** @class */ (function () {
    function ElseIfStmt(body) {
        this.body = body;
    }
    ElseIfStmt.prototype.accept = function (visitor) { return visitor.visitElseIfStmt(this); };
    return ElseIfStmt;
}());
exports.ElseIfStmt = ElseIfStmt;
var ElseStmt = /** @class */ (function () {
    function ElseStmt(body) {
        this.body = body;
    }
    ElseStmt.prototype.accept = function (visitor) { return visitor.visitElseStmt(this); };
    return ElseStmt;
}());
exports.ElseStmt = ElseStmt;
var CallStmt = /** @class */ (function () {
    function CallStmt(name) {
        var body = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            body[_i - 1] = arguments[_i];
        }
        this.name = name;
        this.hasReturn = false;
        this.body = body;
    }
    CallStmt.prototype.accept = function (visitor) { return visitor.visitCallStmt(this); };
    return CallStmt;
}());
exports.CallStmt = CallStmt;
var ReturnStmt = /** @class */ (function () {
    function ReturnStmt(variableName) {
        this.variableName = variableName;
    }
    ReturnStmt.prototype.accept = function (visitor) { throw new Error("Trying to declare a return outside of Call Statement!"); };
    return ReturnStmt;
}());
exports.ReturnStmt = ReturnStmt;
var Argument = /** @class */ (function () {
    function Argument(name, defaultValue) {
        this.name = name;
        this.defaultValue = defaultValue;
    }
    Argument.prototype.accept = function (visitor) { throw new Error("Trying to declare an explicit argument!"); };
    return Argument;
}());
exports.Argument = Argument;
var Literal = /** @class */ (function () {
    function Literal(value) {
        this.value = value;
    }
    ;
    Literal.prototype.accept = function (visitor) { return visitor.visitLiteral(this); };
    return Literal;
}());
exports.Literal = Literal;
var Object = /** @class */ (function () {
    function Object(body) {
        this.body = body;
    }
    ;
    Object.prototype.accept = function (visitor) { return visitor.visitObject(this); };
    return Object;
}());
exports.Object = Object;
var ObjectProperty = /** @class */ (function () {
    function ObjectProperty(name, body) {
        if (body === void 0) { body = []; }
        this.name = name;
        this.body = body;
    }
    ;
    ObjectProperty.prototype.accept = function (visitor) { throw new Error("Trying to declare an object property explicitly!"); };
    return ObjectProperty;
}());
exports.ObjectProperty = ObjectProperty;
var CallExp = /** @class */ (function () {
    function CallExp(name) {
        var argument = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argument[_i - 1] = arguments[_i];
        }
        this.name = name;
        this.argument = argument;
    }
    ;
    CallExp.prototype.accept = function (visitor) { return visitor.visitCallExp(this); };
    return CallExp;
}());
exports.CallExp = CallExp;
var Variable = /** @class */ (function () {
    function Variable(name, setAs) {
        this.name = name;
        this.setAs = setAs;
    }
    Variable.prototype.accept = function (visitor) { return visitor.visitVariable(this); };
    return Variable;
}());
exports.Variable = Variable;
var dotNotation = /** @class */ (function () {
    function dotNotation() {
    }
    ;
    dotNotation.prototype.accept = function (visitor) { return "."; };
    return dotNotation;
}());
var codeSeparator = /** @class */ (function () {
    function codeSeparator() {
    }
    ;
    codeSeparator.prototype.accept = function (visitor) { return ";"; };
    return codeSeparator;
}());
var endOfLine = /** @class */ (function () {
    function endOfLine() {
    }
    ;
    endOfLine.prototype.accept = function (visitor) { return "\n"; };
    return endOfLine;
}());
var AsyncFunction = /** @class */ (function () {
    function AsyncFunction() {
    }
    ;
    AsyncFunction.prototype.accept = function (visitor) { return "async "; };
    return AsyncFunction;
}());
var Export = /** @class */ (function () {
    function Export() {
    }
    ;
    Export.prototype.accept = function (visitor) { return "module.exports = "; };
    return Export;
}());
var VariableDecl = /** @class */ (function () {
    function VariableDecl(name, type, value) {
        this.name = name;
        this.type = type;
        this.value = value;
    }
    VariableDecl.prototype.accept = function (visitor) { return visitor.visitVariableDecl(this); };
    return VariableDecl;
}());
exports.VariableDecl = VariableDecl;
var Dot = new dotNotation();
exports.Dot = Dot;
var Separator = new codeSeparator();
exports.Separator = Separator;
var EOF = new endOfLine();
exports.EOF = EOF;
var Async = new AsyncFunction();
exports.Async = Async;
var ExportModule = new Export();
exports.ExportModule = ExportModule;
