var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ShardingManager } from "discord.js";
/** An Utility object that handles most annoying part's */
var Util;
(function (Util) {
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
        var _a, _b, _c, _d;
        const result = data[target] || ((_a = data.channel) === null || _a === void 0 ? void 0 : _a[target]) || ((_b = data.member) === null || _b === void 0 ? void 0 : _b[target]) || ((_c = data.message) === null || _c === void 0 ? void 0 : _c[target]) || ((_d = data.interaction) === null || _d === void 0 ? void 0 : _d[target]);
        if (target === 'guild' && result) {
            if (!result.available)
                return this.getGuild(result.id);
            return result;
        }
    }
    Util.findInfoFromPackets = findInfoFromPackets;
    function getGuildsCache(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const shard = client.shard;
            if (shard) {
                const shardResponse = yield shard.fetchClientValues("guilds.cache");
                return shardResponse.reduce((p, value) => {
                    p = p.concat(Array.from(value.values()));
                    return p;
                }, []);
            }
            else {
                return Array.from(client.guilds.cache.values());
            }
        });
    }
    Util.getGuildsCache = getGuildsCache;
    function getChannelsCache(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const shard = client.shard;
            if (shard) {
                const shardResponse = yield shard.fetchClientValues("channels.cache");
                return shardResponse.reduce((p, value) => {
                    p = p.concat(Array.from(value.values()));
                    return p;
                }, []);
            }
            else {
                return Array.from(client.channels.cache.values());
            }
        });
    }
    Util.getChannelsCache = getChannelsCache;
    function getUsersCache(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const shard = client.shard;
            if (shard) {
                const shardResponse = yield shard.fetchClientValues("users.cache");
                return shardResponse.reduce((p, value) => {
                    p = p.concat(Array.from(value.values()));
                    return p;
                }, []);
            }
            else {
                return Array.from(client.users.cache.values());
            }
        });
    }
    Util.getUsersCache = getUsersCache;
    function getUser(client, Id) {
        return __awaiter(this, void 0, void 0, function* () {
            const shard = client.shard;
            if (shard) {
                const shardCache = client.users.cache;
                if (shardCache.has(Id))
                    return shardCache.get(Id);
                const allCache = (yield shard.fetchClientValues('users.cache')).reduce((acc, g) => acc.concat(Array.from(g.values())), []);
                const user = allCache.find((user) => user.id === Id);
                if (user)
                    return user;
                const fetch = yield client.users.fetch(Id).catch(_ => null);
                return fetch;
            }
            else {
                const user = client.users.cache.get(Id);
                if (user)
                    return user;
                return yield client.users.fetch(Id).catch(_ => null);
            }
        });
    }
    Util.getUser = getUser;
    function getChannel(client, Id) {
        return __awaiter(this, void 0, void 0, function* () {
            const shard = client.shard;
            if (shard) {
                const shardCache = client.channels.cache;
                if (shardCache.has(Id))
                    return shardCache.get(Id);
                const allCache = (yield shard.fetchClientValues('channels.cache')).reduce((acc, g) => acc.concat(Array.from(g.values())), []);
                const channel = allCache.find((channel) => channel.id === Id);
                if (channel)
                    return channel;
                const fetch = yield client.channels.fetch(Id).catch(_ => null);
                return fetch;
            }
            else {
                const channel = client.channels.cache.get(Id);
                if (channel)
                    return channel;
                return yield client.channels.fetch(Id).catch(_ => null);
            }
        });
    }
    Util.getChannel = getChannel;
    function getGuild(client, Id) {
        return __awaiter(this, void 0, void 0, function* () {
            const shard = client.shard;
            if (shard) {
                const shardCache = client.guilds.cache;
                // See if Shard has Guild
                if (shardCache.has(Id))
                    return shardCache.get(Id);
                const allCache = (yield shard.fetchClientValues('guilds.cache')).reduce((acc, g) => acc.concat(Array.from(g.values())), []);
                const guild = allCache.find((guild) => guild.id === Id);
                // See if Shards cache has Guild
                if (guild)
                    return guild;
                const fetch = yield client.guilds.fetch(Id).catch(_ => null);
                // Fetched Guild if no shard has cache of Guild Id
                return fetch;
            }
            else {
                const guild = client.guilds.cache.get(Id);
                if (guild)
                    return guild;
                return yield client.guilds.fetch(Id).catch(_ => null);
            }
        });
    }
    Util.getGuild = getGuild;
    function createShardingManager(file, token, dbhKey) {
        const manager = new ShardingManager(file, { token });
        manager.on("shardCreate", (shard) => {
            shard.on("death", () => console.warn `PID ${shard.process.pid} Shard ${shard.id}: Event Death`);
            shard.on("error", (error) => console.error `PID ${shard.process.pid} Shard ${shard.id}: ${error.stack}`);
            shard.on("reconnecting", () => console.log `PID ${shard.process.pid} Shard ${shard.id}: Reconnecting`);
            shard.on("ready", () => console.log `PID ${shard.process.pid} Shard ${shard.id}: Ready`);
            shard.on("disconnect", () => console.warn `PID ${shard.process.pid} Shard ${shard.id}: Disconnected`);
            shard.once("spawn", () => console.log `PID ${shard.process.pid} Shard ${shard.id}: Spawned`);
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
export default Util;
//# sourceMappingURL=Util.js.map