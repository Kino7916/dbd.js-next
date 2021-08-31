import * as Discord from 'discord.js';
import { Events as ClientEvents, EventResolvable } from './ALPHA_TYPES';
import { Command, StatusManager, CommandManager } from '../Handlers/Managers';
import { Database } from '../Handlers/Database';
export interface ClientOptions {
    useInternalSharding: boolean;
    shardCount: number;
    danbotHostingKey: string;
    mobilePresence: boolean;
    ignoreDMs: boolean;
    ignoreMe: boolean;
    ignoreBots: boolean;
    intents: Discord.Intents;
    database?: Database;
    prefix: string[];
    cache: Discord.CacheFactory;
    reverseReading: boolean;
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
    client: any;
    database: any;
    commands: CommandManager;
    status: StatusManager;
    constructor(clientOptions: ClientOptions);
    /**
     * Enable Discord.js event
     * @param event
     */
    enableEvents(...events: EventResolvable<ClientEvents>[]): void;
    /**
     * Register commands to an event
     * @param event
     * @param command
     */
    registerCommands(event: EventResolvable<ClientEvents>, ...commands: Command[]): void;
    /**
     * Starts the package and initialize discord bot with provided token
     * @param token - Discord Bot Token
     */
    login(token: string): any;
    /**
     * Adds an activity to bot status
     */
    addActivity(...options: ActivityOptions[]): void;
    static _compile(command: Command, data: any): Promise<void | TypeError | Discord.Message | {
        result: any;
        leftover: import("../Compiler/Build").InstanceData;
    }>;
}
export default Main;
