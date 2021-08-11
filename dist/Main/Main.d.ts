import * as Discord from 'discord.js';
import { Alpha_Types } from './ALPHA_TYPES';
declare type ClientEvents = "messageCreate" | "messageDelete" | "ready" | "guildMemberAdd" | "guildMemberRemove" | "interactionCreate";
export declare class _CL_EXTENDED extends Discord.Client {
    dbdjsProgram: Main;
}
export interface Command {
    name?: string;
    nonPrefix?: boolean;
    aliases?: string[] | string;
    code: string;
}
export interface ClientOptions {
    useInternalSharding: boolean;
    shardCount: number;
    danbotHostingKey: string;
    mobilePresence: boolean;
    pluginManager: any;
    ignoreDMs: true | boolean;
    ignoreMe: true | boolean;
    ignoreBots: true | boolean;
    intents: Discord.Intents;
    database?: any;
    prefix: string[];
    cache: Discord.CacheFactory;
}
export interface ActivityOptions {
    /** The activity to display in User Presence */
    activity: string;
    /** Type of activity in User Presence */
    type?: Discord.ActivityType;
    /** Lifetime for an activity to be displayed in User Presence */
    time: 10 | number;
    /** Compiles activity / Designates activity as a code */
    compileCode?: boolean;
    /** Type of status for User Presence should use */
    status?: Discord.PresenceStatusData;
    /** URL Stream that should be provided */
    url?: string;
}
declare class Main {
    client: _CL_EXTENDED;
    static Types: typeof Alpha_Types;
    database: any;
    private _ALPHA_IDS;
    constructor(clientOptions: ClientOptions);
    /**
     * Enable Discord.js event
     * @param event
     */
    enableEvent(event: ClientEvents): void;
    /**
     * Register commands to an event
     * @param event
     * @param command
     */
    registerCommand(event: ClientEvents, command: Command): void;
    /**
     * Starts the package and initialize discord bot with provided token
     * @param token - Discord Bot Token
     */
    login(token: string): Promise<string>;
    /**
     * Adds an activity to bot status
     */
    addActivity(...options: ActivityOptions[]): void;
    static _compile(command: Command, data: any): Promise<any>;
    /**
     * Creates a command to list of IDs
     * @param command
     * @deprecated
     * @returns
     */
    createCommand(command: Command): number;
    /**
     * Assigns command Id to Callback Events
     * @param eventType
     * @param commandId
     * @deprecated
     */
    assignType(eventType: ClientEvents, commandId: number): void;
}
export default Main;
