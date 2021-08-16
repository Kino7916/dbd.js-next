"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
const Util_1 = require("./Util");
const Main_1 = require("../Main/Main");
class Events extends EventEmitter {
    constructor() {
        super(...arguments);
        this.commands = new Util_1.Collection();
        this.data = {};
        this._events = [];
    }
    addDataToCompiler(key, value) {
        this.data[key] = value;
    }
    listen(event, ...commands) {
        if (!(this._events.includes(event))) {
            this._events.push(event);
            this.on(event, this.onEvent());
        }
        let array = [];
        if (!(this.commands.has(event))) {
            this.commands.set(event, array);
        }
        array = array.concat(commands);
        return this;
    }
    onEvent(eventName) {
        return (...eventData) => {
            const commands = this.commands.get(eventName);
            for (const command of commands) {
                Main_1.default._compile(command, {
                    eventData,
                    ...this.data
                });
            }
        };
    }
}
exports.default = Events;
//# sourceMappingURL=Events.js.map