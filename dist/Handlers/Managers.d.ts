import { EventResolvable, Events, Alpha_Types as Types } from "../Main/ALPHA_TYPES";
import { ActivityOptions } from "../Main/Main";
declare const Events: Types[];
export interface Command {
    name?: string;
    type?: EventResolvable<Events>;
    event?: EventResolvable<Events>;
    aliases?: string | string[];
    nonPrefix?: boolean;
    code: string;
}
export declare class CommandManager {
    add(...commands: Command[]): void;
    load(path: string, debug?: boolean): Promise<void>;
}
export declare class StatusManager {
    add(...activities: ActivityOptions[]): void;
}
export declare namespace Managers {
    const Command: CommandManager;
    const Status: StatusManager;
}
export {};
