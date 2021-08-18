"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Managers = exports.StatusManager = exports.CommandManager = void 0;
const __1 = require("..");
const ALPHA_TYPES_1 = require("../Main/ALPHA_TYPES");
const Main_1 = require("../Main/Main");
const fs = require("fs");
const Util_1 = require("./Util");
class CommandManager {
    add(...commands) {
        for (const command of commands) {
            const event = command.type || command.event;
            if (!event || !ALPHA_TYPES_1.Alpha_Types[event]) {
                throw new Error(`Invalid event of ${String(event)}!`);
            }
            if (!command.code)
                throw new Error("Invalid code, supplied string must be non-empty!");
            __1.Config.Commands.add(command);
        }
    }
    async load(path, debug) {
        const doDebug = (message, method = "log") => console[method](message);
        const queue = [path];
        function walk(path) {
            return new Promise(resolve => {
                fs.stat(path, (err, stat) => {
                    if (err && debug) {
                        return doDebug("> Encountered Error while walking " + path);
                    }
                    doDebug("> Walking " + path);
                    if (stat.isDirectory()) {
                        fs.readdir(path, (err, files) => {
                            if (err && debug) {
                                return doDebug("Encountered Error while walking to path");
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
                                resolve(doDebug("> Ignoring AS File"));
                            }
                            return;
                        }
                        const module = Util_1.default.requireModule(path);
                        try {
                            Managers.Command.add(module);
                            resolve(doDebug('> File Loaded Successfully'));
                        }
                        catch {
                            resolve(doDebug('> Exceptions when loading commands in file'));
                        }
                    }
                    else {
                        resolve(doDebug("> Unknown kind of Type " + path));
                    }
                });
            });
        }
        if (debug) {
            const stack = new Error().stack;
            const origin = stack.split('\n')[1].trim();
            doDebug('=> "Load" Stack Start <=');
            doDebug('> From ' + origin);
        }
        while (queue.length > 0) {
            const shifted = queue.shift();
            await walk(shifted);
            if (queue.length < 1) {
                doDebug('=> "Load" Stack End <=');
            }
        }
    }
}
exports.CommandManager = CommandManager;
class StatusManager {
    add(...activities) {
        for (const activity of activities) {
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