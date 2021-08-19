"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
var Debugger;
(function (Debugger) {
    let FLAGS;
    (function (FLAGS) {
        FLAGS[FLAGS["INFO"] = 1] = "INFO";
        FLAGS[FLAGS["WARN"] = 2] = "WARN";
        FLAGS[FLAGS["ERROR"] = 3] = "ERROR";
        FLAGS[FLAGS["UNEXPECTED"] = 4] = "UNEXPECTED";
    })(FLAGS = Debugger.FLAGS || (Debugger.FLAGS = {}));
    Debugger.Events = new EventEmitter();
    function log(message, code) {
        if (FLAGS.INFO === code) {
            Debugger.Events.emit('debug', `\x1b[47m\x1b[30mdbd.js [DEBUG \x1b[32mInfo\x1b[30m]: ${message}\x1b[0m`);
        }
        else if (FLAGS.WARN === code) {
            Debugger.Events.emit('debug', `\x1b[43m\x1b[30mdbd.js [DEBUG \x1b[33mWarn\x1b[30m]: ${message}\x1b[0m`);
        }
        else if (FLAGS.ERROR === code) {
            Debugger.Events.emit('debug', `\x1b[41m\x1b[30mdbd.js [DEBUG \x1b[36mError\x1b[30m]: ${message}\x1b[0m`);
        }
        else if (FLAGS.UNEXPECTED === code) {
            Debugger.Events.emit('debug', `\x1b[41m\x1b[30mdbd.js [DEBUG \x1b[36mUnexpected\x1b[30m]: ${message}\x1b[0m`);
        }
    }
    Debugger.log = log;
})(Debugger || (Debugger = {}));
exports.default = Debugger;
//# sourceMappingURL=Debugger.js.map