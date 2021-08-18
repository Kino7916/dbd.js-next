/// <reference types="node" />
import EventEmitter = require("events");
import { Command } from './Managers';
import { Collection } from "./Util";
declare class Events extends EventEmitter {
    commands: Collection<string | symbol, Array<Command>>;
    data: any;
    private _events;
    addDataToCompiler(key: any, value: any): void;
    listen(event: string | symbol, ...commands: Command[]): this;
    onEvent(eventName?: string | symbol): (...eventData: any[]) => void;
}
export default Events;
