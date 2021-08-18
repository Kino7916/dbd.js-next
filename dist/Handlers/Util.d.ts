import { Client, Channel, User, Guild, ShardingManager } from "discord.js";
import { InstanceDataExtra } from "../Compiler/Build";
export declare class Collection<K, V> extends Map {
    static createInstance(array?: readonly (readonly [any, any])[]): Collection<any, any>;
    add(...args: V[]): void;
    push(...args: V[]): void;
    array(): any[];
}
/** An Utility object that handles most annoying part's */
declare namespace Util {
    function removeItemFromArray<T>(arr: Array<T>, value: T): Array<T>;
    function requireModule(id: string): any;
    function escape(string: string): string;
    function unescape(string: string): string;
    function findInfoFromPackets(data: InstanceDataExtra, target: string): any;
    function getGuildsCache(client: Client): Promise<Guild[]>;
    function getChannelsCache(client: Client): Promise<Channel[]>;
    function getUsersCache(client: Client): Promise<User[]>;
    function getUser(client: Client, Id: `${bigint}`): Promise<User>;
    function getChannel(client: Client, Id: `${bigint}`): Promise<Channel>;
    function getGuild(client: Client, Id: `${bigint}`): Promise<Guild>;
    function createShardingManager(file: string, token: string, dbhKey: string): ShardingManager;
    function checkCondition(str: string): boolean;
    function msParser(string: string): any;
}
export default Util;
