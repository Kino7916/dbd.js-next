"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Managers = exports.StatusManager = exports.CommandManager = void 0;
const __1 = require("..");
const ALPHA_TYPES_1 = require("../Main/ALPHA_TYPES");
const Main_1 = require("../Main/Main");
const fs = require("fs");
const Util_1 = require("./Util");
const Debugger_1 = require("./Debugger");
const Events = Object.values(ALPHA_TYPES_1.Alpha_Types);
class CommandManager {
    add(...commands) {
        const cmds = Util_1.default.iterateArgs(commands);
        for (const command of cmds) {
            if (!command.code)
                throw new Error("Invalid code, supplied string must be non-empty!");
            const event = command.type || command.event;
            if (Array.isArray(event)) {
                for (const ev of event) {
                    if (!ev || !Events.includes(ev)) {
                        throw new Error(`Invalid event of ${String(ev)}!`);
                    }
                    __1.Config.Commands.set(`C-${ALPHA_TYPES_1.Alpha_Types[ev] || ev}-${__1.Config.Commands.size}`, command);
                }
            }
            else {
                if (!event || !Events.includes(event)) {
                    throw new Error(`Invalid event of ${String(event)}!`);
                }
                __1.Config.Commands.set(`C-${ALPHA_TYPES_1.Alpha_Types[event] || event}-${__1.Config.Commands.size}`, command);
            }
        }
    }
    async load(path, debug) {
        const doDebug = (message, method = Debugger_1.default.FLAGS.INFO) => Debugger_1.default.log(message, method);
        const queue = [path];
        function walk(path) {
            return new Promise(resolve => {
                fs.stat(path, (err, stat) => {
                    if (err && debug) {
                        return doDebug("> Encountered Error while walking " + path, Debugger_1.default.FLAGS.ERROR);
                    }
                    doDebug("> Walking " + path);
                    if (stat.isDirectory()) {
                        fs.readdir(path, (err, files) => {
                            if (err && debug) {
                                return doDebug("> Encountered Error while walking to path", Debugger_1.default.FLAGS.ERROR);
                            }
                            doDebug("> Confirmed AS Directory");
                            for (const name of files) {
                                queue.push(path + "/" + name);
                            }
                            resolve('');
                        });
                    }
                    else if (stat.isFile()) {
                        if (!path.endsWith(".js")) {
                            if (debug) {
                                resolve(doDebug("> Ignoring AS File", Debugger_1.default.FLAGS.WARN));
                            }
                            return;
                        }
                        const module = Util_1.default.requireModule(path);
                        try {
                            Managers.Command.add(module);
                            resolve(doDebug('> File Loaded Successfully'));
                        }
                        catch {
                            resolve(doDebug('> Exceptions when loading commands in file', Debugger_1.default.FLAGS.WARN));
                        }
                    }
                    else {
                        resolve(doDebug("> Unknown kind of Type " + path, Debugger_1.default.FLAGS.UNEXPECTED));
                    }
                });
            });
        }
        if (debug) {
            const stack = new Error().stack;
            const origin = stack.split('\n')[1].trim();
            doDebug('=> "Load" Stack Start');
            doDebug('> From ' + origin);
        }
        while (queue.length > 0) {
            const shifted = queue.shift();
            await walk(shifted);
            if (queue.length < 1) {
                doDebug('=> "Load" Stack End');
            }
        }
    }
}
exports.CommandManager = CommandManager;
class StatusManager {
    add(...activities) {
        const acts = Util_1.default.iterateArgs(activities);
        for (const activity of acts) {
            __1.Config.Statuses.set("ST-" + __1.Config.Statuses.size.toString(), {
                name: activity.activity,
                type: activity.type,
                Lifetime: activity.time,
                url: activity.url,
                status: activity.status.toLowerCase(),
                compile: Main_1.default._compile
            });
        }
    }
}
exports.StatusManager = StatusManager;
var Managers;
(function (Managers) {
    Managers.Command = new CommandManager();
    Managers.Status = new StatusManager();
})(Managers = exports.Managers || (exports.Managers = {}));
//# sourceMappingURL=Managers.js.map