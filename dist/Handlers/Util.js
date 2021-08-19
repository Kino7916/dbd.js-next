"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const discord_js_1 = require("discord.js");
const Debugger_1 = require("./Debugger");
class Collection extends Map {
    static createInstance(array) {
        var inst = new Map(array);
        inst['__proto__'] = Collection.prototype;
        return inst;
    }
    add(...args) {
        for (const arg of args)
            this.set(this.size, arg);
    }
    push(...args) {
        for (const arg of args)
            this.set(this.size, arg);
    }
    array() {
        return Array.from(this.values());
    }
}
exports.Collection = Collection;
/** An Utility object that handles most annoying part's */
var Util;
(function (Util) {
    function iterateArgs(args) {
        let iteratedArgs = [];
        for (const v of args) {
            if (Array.isArray(v)) {
                iteratedArgs = iteratedArgs.concat(v);
            }
            else {
                iteratedArgs.push(v);
            }
        }
        return iteratedArgs;
    }
    Util.iterateArgs = iterateArgs;
    function removeItemFromArray(arr, value) {
        const index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }
    Util.removeItemFromArray = removeItemFromArray;
    function requireModule(id) {
        const module = require(id);
        if (module.default)
            return module.default;
        return module;
    }
    Util.requireModule = requireModule;
    function escape(string) {
        return string
            .replace('[', '%OP_1%')
            .replace(']', '%OP_2%')
            .replace(';', '%SEP_TR%');
    }
    Util.escape = escape;
    function unescape(string) {
        return string
            .replace('%OP_1%', '[')
            .replace('%OP_2%', ']')
            .replace('%SEP_TR%', ';');
    }
    Util.unescape = unescape;
    function findInfoFromPackets(data, target) {
        const result = data[target] || data.channel?.[target] || data.member?.[target] || data.message?.[target] || data.interaction?.[target];
        if (target === 'guild' && result) {
            if (!result.available)
                return this.getGuild(result.id);
            return result;
        }
    }
    Util.findInfoFromPackets = findInfoFromPackets;
    async function getGuildsCache(client) {
        const shard = client.shard;
        if (shard) {
            const shardResponse = await shard.fetchClientValues("guilds.cache");
            return shardResponse.reduce((p, value) => {
                p = p.concat(Array.from(value.values()));
                return p;
            }, []);
        }
        else {
            return Array.from(client.guilds.cache.values());
        }
    }
    Util.getGuildsCache = getGuildsCache;
    async function getChannelsCache(client) {
        const shard = client.shard;
        if (shard) {
            const shardResponse = await shard.fetchClientValues("channels.cache");
            return shardResponse.reduce((p, value) => {
                p = p.concat(Array.from(value.values()));
                return p;
            }, []);
        }
        else {
            return Array.from(client.channels.cache.values());
        }
    }
    Util.getChannelsCache = getChannelsCache;
    async function getUsersCache(client) {
        const shard = client.shard;
        if (shard) {
            const shardResponse = await shard.fetchClientValues("users.cache");
            return shardResponse.reduce((p, value) => {
                p = p.concat(Array.from(value.values()));
                return p;
            }, []);
        }
        else {
            return Array.from(client.users.cache.values());
        }
    }
    Util.getUsersCache = getUsersCache;
    async function getUser(client, Id) {
        const shard = client.shard;
        if (shard) {
            const shardCache = client.users.cache;
            if (shardCache.has(Id))
                return shardCache.get(Id);
            const allCache = (await shard.fetchClientValues('users.cache')).reduce((acc, g) => acc.concat(Array.from(g.values())), []);
            const user = allCache.find((user) => user.id === Id);
            if (user)
                return user;
            const fetch = await client.users.fetch(Id).catch(_ => null);
            return fetch;
        }
        else {
            const user = client.users.cache.get(Id);
            if (user)
                return user;
            return await client.users.fetch(Id).catch(_ => null);
        }
    }
    Util.getUser = getUser;
    async function getChannel(client, Id) {
        const shard = client.shard;
        if (shard) {
            const shardCache = client.channels.cache;
            if (shardCache.has(Id))
                return shardCache.get(Id);
            const allCache = (await shard.fetchClientValues('channels.cache')).reduce((acc, g) => acc.concat(Array.from(g.values())), []);
            const channel = allCache.find((channel) => channel.id === Id);
            if (channel)
                return channel;
            const fetch = await client.channels.fetch(Id).catch(_ => null);
            return fetch;
        }
        else {
            const channel = client.channels.cache.get(Id);
            if (channel)
                return channel;
            return await client.channels.fetch(Id).catch(_ => null);
        }
    }
    Util.getChannel = getChannel;
    async function getGuild(client, Id) {
        const shard = client.shard;
        if (shard) {
            const shardCache = client.guilds.cache;
            // See if Shard has Guild
            if (shardCache.has(Id))
                return shardCache.get(Id);
            const allCache = (await shard.fetchClientValues('guilds.cache')).reduce((acc, g) => acc.concat(Array.from(g.values())), []);
            const guild = allCache.find((guild) => guild.id === Id);
            // See if Shards cache has Guild
            if (guild)
                return guild;
            const fetch = await client.guilds.fetch(Id).catch(_ => null);
            // Fetched Guild if no shard has cache of Guild Id
            return fetch;
        }
        else {
            const guild = client.guilds.cache.get(Id);
            if (guild)
                return guild;
            return await client.guilds.fetch(Id).catch(_ => null);
        }
    }
    Util.getGuild = getGuild;
    function createShardingManager(file, token, dbhKey) {
        const manager = new discord_js_1.ShardingManager(file, { token });
        manager.on("shardCreate", (shard) => {
            shard.on("death", () => Debugger_1.default.log(`Shard ${shard.id}: Event Death`, Debugger_1.default.FLAGS.INFO));
            shard.on("error", (error) => Debugger_1.default.log(`Shard ${shard.id}: ${error.stack}`, Debugger_1.default.FLAGS.ERROR));
            shard.on("reconnecting", () => Debugger_1.default.log(`Shard ${shard.id}: Reconnecting`, Debugger_1.default.FLAGS.INFO));
            shard.on("ready", () => Debugger_1.default.log(`Shard ${shard.id}: Ready`, Debugger_1.default.FLAGS.INFO));
            shard.on("disconnect", () => Debugger_1.default.log(`Shard ${shard.id}: Disconnected`, Debugger_1.default.FLAGS.WARN));
            shard.once("spawn", () => Debugger_1.default.log(`Shard ${shard.id}: Spawned`, Debugger_1.default.FLAGS.INFO));
        });
        if (typeof dbhKey === "string" && dbhKey.length) {
            const handler = require("./danbotHosting");
            handler(dbhKey, manager);
        }
        return manager;
    }
    Util.createShardingManager = createShardingManager;
    function checkCondition(str) {
        const operators = () => {
            for (const op of ["<=", ">=", "==", "!=", "<", ">"]) {
                if (str.includes(op))
                    return op;
            }
        };
        // Getting Operator
        const op = operators();
        // Define Conditions
        const c = str.split(op), c1 = c[0], c2 = c[1], c1N = Number(c1), c2N = Number(c2);
        // Handle Conditions with Operator
        // Condition must be the exact same
        if (op === "==" && c1 === c2)
            return true;
        // Condition must not be same
        else if (op === "!=" && c1 !== c2)
            return true;
        // Condition is bigger than target
        else if (op === ">") {
            // Handle this operator in a new scope
            // if conditions are number
            if (!isNaN(c1N) && !isNaN(c2N) && c1N > c2N)
                return true;
            // else count length of condition string 
            else if (c1.length > c2.length)
                return true;
            // if those are incorrect / below, return false
            else
                return false;
        }
        // Condition is smaller than target 
        else if (op === "<") {
            // Handle this operator in a new scope
            // if conditions are number
            if (!isNaN(c1N) && !isNaN(c2N) && c1N < c2N)
                return true;
            // else count length of condition string 
            else if (c1.length < c2.length)
                return true;
            // if those are incorrect / below, return false
            else
                return false;
        }
        // Condition is bigger or same as target
        else if (op === ">=") {
            // Handle this operator in a new scope
            // if conditions are number
            if (!isNaN(c1N) && !isNaN(c2N) && c1N >= c2N)
                return true;
            // else count length of condition string 
            else if (c1.length >= c2.length)
                return true;
            // if those are incorrect / below, return false
            else
                return false;
        }
        // Condition is smaller or same as target
        else if (op === "<=") {
            // Handle this operator in a new scope
            // if conditions are number
            if (!isNaN(c1N) && !isNaN(c2N) && c1N <= c2N)
                return true;
            // else count length of condition string 
            else if (c1.length <= c2.length)
                return true;
            // if those are incorrect / below, return false
            else
                return false;
        }
        // If no operator were present but the whole condition are boolean
        else if (!op && str.toLowerCase() === "true")
            return true;
        // If all of them are incorrect
        return false;
    }
    Util.checkCondition = checkCondition;
    function msParser(string) {
        if (typeof string !== "string")
            return 0;
        let ms = 0;
        const ar = string.split(/(\D)/g);
        let op = ["s", "m", "h", "d", "M", "y"];
        let intVal = 0;
        let err = null;
        for (const v of ar) {
            if (!isNaN(Number(v))) {
                intVal = parseInt(v);
            }
            else if (op.includes(v)) {
                if (!intVal) {
                    err = new Error("Unexpected Identifier to be present before number!");
                    break;
                }
                if (v === "s")
                    ms += intVal;
                if (v === "m")
                    ms += intVal * 60;
                if (v === "h")
                    ms += intVal * 60 * 60;
                if (v === "d")
                    ms += intVal * 60 * 60 * 24;
                if (v === "M")
                    ms += intVal * 60 * 60 * 24 * 30;
                if (v === "y")
                    ms += intVal * 60 * 60 * 24 * 30 * 12;
                intVal = 0;
            }
            else {
                err = new Error("Invalid Identifier of '" + v + "' present in string!");
                break;
            }
        }
        if (err)
            return err;
        return ms * 1000;
    }
    Util.msParser = msParser;
})(Util || (Util = {}));
exports.default = Util;
//# sourceMappingURL=Util.js.map