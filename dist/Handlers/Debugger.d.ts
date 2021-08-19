/// <reference types="node" />
import EventEmitter = require("events");
interface DebuggerEvents {
    debug: [message: string];
    error: [error: Error];
}
declare interface DebuggerEmitter extends EventEmitter {
    on<K extends keyof DebuggerEvents>(event: K, listener: (...args: DebuggerEvents[K]) => void): this;
    on<S extends string | symbol>(event: Exclude<S, keyof DebuggerEvents>, listener: (...args: any[]) => void): this;
    once<K extends keyof DebuggerEvents>(event: K, listener: (...args: DebuggerEvents[K]) => void): this;
    once<S extends string | symbol>(event: Exclude<S, keyof DebuggerEvents>, listener: (...args: any[]) => void): this;
    emit<K extends keyof DebuggerEvents>(event: K, ...args: DebuggerEvents[K]): boolean;
    emit<S extends string | symbol>(event: Exclude<S, keyof DebuggerEvents>, ...args: unknown[]): boolean;
    off<K extends keyof DebuggerEvents>(event: K, listener: (...args: DebuggerEvents[K]) => void): this;
    off<S extends string | symbol>(event: Exclude<S, keyof DebuggerEvents>, listener: (...args: any[]) => void): this;
    removeAllListeners<K extends keyof DebuggerEvents>(event?: K): this;
    removeAllListeners<S extends string | symbol>(event?: Exclude<S, keyof DebuggerEvents>): this;
}
declare namespace Debugger {
    enum FLAGS {
        INFO = 1,
        WARN = 2,
        ERROR = 3,
        UNEXPECTED = 4
    }
    const Events: DebuggerEmitter;
    function log(message: string, code: FLAGS): void;
}
export default Debugger;
