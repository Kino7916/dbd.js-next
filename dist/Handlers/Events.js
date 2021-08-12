"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = require("events");
var Util_1 = require("./Util");
var Main_1 = require("../Main/Main");
var Events = /** @class */ (function (_super) {
    __extends(Events, _super);
    function Events() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.commands = new Util_1.Collection();
        _this.data = {};
        _this._events = [];
        return _this;
    }
    Events.prototype.addDataToCompiler = function (key, value) {
        this.data[key] = value;
    };
    Events.prototype.listen = function (event) {
        var commands = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            commands[_i - 1] = arguments[_i];
        }
        if (!(this._events.includes(event))) {
            this._events.push(event);
            this.on(event, this.onEvent());
        }
        var array = [];
        if (!(this.commands.has(event))) {
            this.commands.set(event, array);
        }
        array = array.concat(commands);
        return this;
    };
    Events.prototype.onEvent = function (eventName) {
        var _this = this;
        return function () {
            var eventData = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                eventData[_i] = arguments[_i];
            }
            var commands = _this.commands.get(eventName);
            for (var _a = 0, commands_1 = commands; _a < commands_1.length; _a++) {
                var command = commands_1[_a];
                Main_1.default._compile(command, __assign({ eventData: eventData }, _this.data));
            }
        };
    };
    return Events;
}(EventEmitter));
exports.default = Events;
//# sourceMappingURL=Events.js.map