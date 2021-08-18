import { Type as Events } from "../Main/ALPHA_TYPES";
import { ActivityOptions } from "../Main/Main";
export interface Command {
    name?: string;
    type?: Events;
    event?: Events;
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
