"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
var discord_js_1 = require("discord.js");
var Collection = /** @class */ (function (_super) {
    __extends(Collection, _super);
    function Collection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Collection.createInstance = function (array) {
        var inst = new Map(array);
        inst['__proto__'] = Collection.prototype;
        return inst;
    };
    Collection.prototype.add = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var arg = args_1[_a];
            this.set(this.size, arg);
        }
    };
    Collection.prototype.push = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        for (var _a = 0, args_2 = args; _a < args_2.length; _a++) {
            var arg = args_2[_a];
            this.set(this.size, arg);
        }
    };
    Collection.prototype.array = function () {
        return Array.from(this.values());
    };
    return Collection;
}(Map));
exports.Collection = Collection;
/** An Utility object that handles most annoying part's */
var Util;
(function (Util) {
    function requireModule(id) {
        var module = require(id);
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
        var _a, _b, _c, _d;
        var result = data[target] || ((_a = data.channel) === null || _a === void 0 ? void 0 : _a[target]) || ((_b = data.member) === null || _b === void 0 ? void 0 : _b[target]) || ((_c = data.message) === null || _c === void 0 ? void 0 : _c[target]) || ((_d = data.interaction) === null || _d === void 0 ? void 0 : _d[target]);
        if (target === 'guild' && result) {
            if (!result.available)
                return this.getGuild(result.id);
            return result;
        }
    }
    Util.findInfoFromPackets = findInfoFromPackets;
    function getGuildsCache(client) {
        return __awaiter(this, void 0, void 0, function () {
            var shard, shardResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shard = client.shard;
                        if (!shard) return [3 /*break*/, 2];
                        return [4 /*yield*/, shard.fetchClientValues("guilds.cache")];
                    case 1:
                        shardResponse = _a.sent();
                        return [2 /*return*/, shardResponse.reduce(function (p, value) {
                                p = p.concat(Array.from(value.values()));
                                return p;
                            }, [])];
                    case 2: return [2 /*return*/, Array.from(client.guilds.cache.values())];
                }
            });
        });
    }
    Util.getGuildsCache = getGuildsCache;
    function getChannelsCache(client) {
        return __awaiter(this, void 0, void 0, function () {
            var shard, shardResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shard = client.shard;
                        if (!shard) return [3 /*break*/, 2];
                        return [4 /*yield*/, shard.fetchClientValues("channels.cache")];
                    case 1:
                        shardResponse = _a.sent();
                        return [2 /*return*/, shardResponse.reduce(function (p, value) {
                                p = p.concat(Array.from(value.values()));
                                return p;
                            }, [])];
                    case 2: return [2 /*return*/, Array.from(client.channels.cache.values())];
                }
            });
        });
    }
    Util.getChannelsCache = getChannelsCache;
    function getUsersCache(client) {
        return __awaiter(this, void 0, void 0, function () {
            var shard, shardResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shard = client.shard;
                        if (!shard) return [3 /*break*/, 2];
                        return [4 /*yield*/, shard.fetchClientValues("users.cache")];
                    case 1:
                        shardResponse = _a.sent();
                        return [2 /*return*/, shardResponse.reduce(function (p, value) {
                                p = p.concat(Array.from(value.values()));
                                return p;
                            }, [])];
                    case 2: return [2 /*return*/, Array.from(client.users.cache.values())];
                }
            });
        });
    }
    Util.getUsersCache = getUsersCache;
    function getUser(client, Id) {
        return __awaiter(this, void 0, void 0, function () {
            var shard, shardCache, allCache, user, fetch_1, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shard = client.shard;
                        if (!shard) return [3 /*break*/, 3];
                        shardCache = client.users.cache;
                        if (shardCache.has(Id))
                            return [2 /*return*/, shardCache.get(Id)];
                        return [4 /*yield*/, shard.fetchClientValues('users.cache')];
                    case 1:
                        allCache = (_a.sent()).reduce(function (acc, g) { return acc.concat(Array.from(g.values())); }, []);
                        user = allCache.find(function (user) { return user.id === Id; });
                        if (user)
                            return [2 /*return*/, user];
                        return [4 /*yield*/, client.users.fetch(Id).catch(function (_) { return null; })];
                    case 2:
                        fetch_1 = _a.sent();
                        return [2 /*return*/, fetch_1];
                    case 3:
                        user = client.users.cache.get(Id);
                        if (user)
                            return [2 /*return*/, user];
                        return [4 /*yield*/, client.users.fetch(Id).catch(function (_) { return null; })];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    Util.getUser = getUser;
    function getChannel(client, Id) {
        return __awaiter(this, void 0, void 0, function () {
            var shard, shardCache, allCache, channel, fetch_2, channel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shard = client.shard;
                        if (!shard) return [3 /*break*/, 3];
                        shardCache = client.channels.cache;
                        if (shardCache.has(Id))
                            return [2 /*return*/, shardCache.get(Id)];
                        return [4 /*yield*/, shard.fetchClientValues('channels.cache')];
                    case 1:
                        allCache = (_a.sent()).reduce(function (acc, g) { return acc.concat(Array.from(g.values())); }, []);
                        channel = allCache.find(function (channel) { return channel.id === Id; });
                        if (channel)
                            return [2 /*return*/, channel];
                        return [4 /*yield*/, client.channels.fetch(Id).catch(function (_) { return null; })];
                    case 2:
                        fetch_2 = _a.sent();
                        return [2 /*return*/, fetch_2];
                    case 3:
                        channel = client.channels.cache.get(Id);
                        if (channel)
                            return [2 /*return*/, channel];
                        return [4 /*yield*/, client.channels.fetch(Id).catch(function (_) { return null; })];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    Util.getChannel = getChannel;
    function getGuild(client, Id) {
        return __awaiter(this, void 0, void 0, function () {
            var shard, shardCache, allCache, guild, fetch_3, guild;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shard = client.shard;
                        if (!shard) return [3 /*break*/, 3];
                        shardCache = client.guilds.cache;
                        // See if Shard has Guild
                        if (shardCache.has(Id))
                            return [2 /*return*/, shardCache.get(Id)];
                        return [4 /*yield*/, shard.fetchClientValues('guilds.cache')];
                    case 1:
                        allCache = (_a.sent()).reduce(function (acc, g) { return acc.concat(Array.from(g.values())); }, []);
                        guild = allCache.find(function (guild) { return guild.id === Id; });
                        // See if Shards cache has Guild
                        if (guild)
                            return [2 /*return*/, guild];
                        return [4 /*yield*/, client.guilds.fetch(Id).catch(function (_) { return null; })];
                    case 2:
                        fetch_3 = _a.sent();
                        // Fetched Guild if no shard has cache of Guild Id
                        return [2 /*return*/, fetch_3];
                    case 3:
                        guild = client.guilds.cache.get(Id);
                        if (guild)
                            return [2 /*return*/, guild];
                        return [4 /*yield*/, client.guilds.fetch(Id).catch(function (_) { return null; })];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    Util.getGuild = getGuild;
    function createShardingManager(file, token, dbhKey) {
        var manager = new discord_js_1.ShardingManager(file, { token: token });
        manager.on("shardCreate", function (shard) {
            shard.on("death", function () { return console.warn("PID " + shard.process.pid + " Shard " + shard.id + ": Event Death"); });
            shard.on("error", function (error) { return console.error("PID " + shard.process.pid + " Shard " + shard.id + ": " + error.stack); });
            shard.on("reconnecting", function () { return console.log("PID " + shard.process.pid + " Shard " + shard.id + ": Reconnecting"); });
            shard.on("ready", function () { return console.log("PID " + shard.process.pid + " Shard " + shard.id + ": Ready"); });
            shard.on("disconnect", function () { return console.warn("PID " + shard.process.pid + " Shard " + shard.id + ": Disconnected"); });
            shard.once("spawn", function () { return console.log("PID " + shard.process.pid + " Shard " + shard.id + ": Spawned"); });
        });
        if (typeof dbhKey === "string" && dbhKey.length) {
            var handler = require("./danbotHosting");
            handler(dbhKey, manager);
        }
        return manager;
    }
    Util.createShardingManager = createShardingManager;
    function checkCondition(str) {
        var operators = function () {
            for (var _i = 0, _a = ["<=", ">=", "==", "!=", "<", ">"]; _i < _a.length; _i++) {
                var op_1 = _a[_i];
                if (str.includes(op_1))
                    return op_1;
            }
        };
        // Getting Operator
        var op = operators();
        // Define Conditions
        var c = str.split(op), c1 = c[0], c2 = c[1], c1N = Number(c1), c2N = Number(c2);
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
        var ms = 0;
        var ar = string.split(/(\D)/g);
        var op = ["s", "m", "h", "d", "M", "y"];
        var intVal = 0;
        var err = null;
        for (var _i = 0, ar_1 = ar; _i < ar_1.length; _i++) {
            var v = ar_1[_i];
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