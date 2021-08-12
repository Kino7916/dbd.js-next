"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var Discord = require("discord.js");
var DanbotHosting_1 = require("../Handlers/DanbotHosting");
var StatusHandler_1 = require("../Handlers/StatusHandler");
var resolveMessage_1 = require("../Compiler/resolveMessage");
var ALPHA_TYPES_1 = require("./ALPHA_TYPES");
var Config_1 = require("./Config");
function requireModule(id) {
    var module = require(id);
    if (module.default)
        return module.default;
    return module;
}
// Alpha version
// just in case if they're lazy
var Events = Object.values(ALPHA_TYPES_1.Alpha_Types);
function runEvent(event) {
    return requireModule("../Events/" + event + ".js");
}
var Main = /** @class */ (function () {
    function Main(clientOptions) {
        this.database = clientOptions.database;
        this._ALPHA_IDS = new Discord.Collection();
        Config_1.default.Options = clientOptions;
        Config_1.default.ClientOptions = {
            ws: {
                properties: {
                    $browser: "discord.js"
                },
            },
            intents: Config_1.default.Options.intents,
            makeCache: Config_1.default.Options.cache
        };
        // Internal Sharding
        if (Config_1.default.Options.useInternalSharding === true)
            Config_1.default.ClientOptions.shards = "auto";
        if (Array.isArray(Config_1.default.Options.prefix))
            Config_1.default.CommandPrefix = clientOptions.prefix;
        if (typeof Config_1.default.Options.prefix === "string") {
            var _string = Config_1.default.Options.prefix;
            Config_1.default.CommandPrefix.push(_string);
        }
        if (!Config_1.default.CommandPrefix.length)
            throw new Error("Mismatch of prefix Type / No prefix was present or set");
        if (Config_1.default.Options.mobilePresence === true)
            Config_1.default.ClientOptions.ws.properties.$browser = "Discord iOS";
        this.client = new Discord.Client(Config_1.default.ClientOptions);
        this.client.dbdjsProgram = this;
        this.client.once("ready", function (client) {
            StatusHandler_1.default(Config_1.default.Statuses, client.dbdjsProgram);
            if (!client.shard) {
                console.log("Connected as " + client.user.username);
            }
            if (clientOptions.danbotHostingKey) {
                DanbotHosting_1.default(clientOptions.danbotHostingKey, client);
            }
        });
    }
    /**
     * Enable Discord.js event
     * @param event
     */
    Main.prototype.enableEvents = function () {
        var events = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            events[_i] = arguments[_i];
        }
        for (var _a = 0, events_1 = events; _a < events_1.length; _a++) {
            var event_1 = events_1[_a];
            if (!Events.includes(event_1))
                throw new TypeError("Unsupported event of \"" + event_1 + "\"!");
            this.client.on(event_1, runEvent(event_1));
        }
    };
    /**
     * Register commands to an event
     * @param event
     * @param command
     */
    Main.prototype.registerCommands = function (event) {
        var commands = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            commands[_i - 1] = arguments[_i];
        }
        if (!Events.includes(event))
            throw new TypeError("Unsupported event of \"" + event + "\"!");
        if (!this.client.eventNames().includes(event))
            throw new Error("Event named \"" + event + "\" is not enabled, please enabled first!");
        for (var _a = 0, commands_1 = commands; _a < commands_1.length; _a++) {
            var command = commands_1[_a];
            if (!("code" in command) || !command.code)
                throw new Error("Command code is required!");
            Config_1.default.Commands.set("C-" + event + "-" + Config_1.default.Commands.size.toString(), command);
        }
    };
    /**
     * Starts the package and initialize discord bot with provided token
     * @param token - Discord Bot Token
     */
    Main.prototype.login = function (token) {
        return this.client.login(token);
    };
    /**
     * Adds an activity to bot status
     */
    Main.prototype.addActivity = function () {
        var options = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            options[_i] = arguments[_i];
        }
        for (var _a = 0, options_1 = options; _a < options_1.length; _a++) {
            var activity = options_1[_a];
            Config_1.default.Statuses.set("ST-" + Config_1.default.Statuses.size.toString(), {
                name: activity.activity,
                type: activity.type,
                Lifetime: activity.time,
                url: activity.url,
                status: activity.status.toLowerCase(),
                compile: Main._compile
            });
        }
    };
    Main._compile = function (command, data) {
        return __awaiter(this, void 0, void 0, function () {
            var output, error, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, requireModule("../Compiler/Build")(requireModule("../Compiler/Interpreter")(command.code), data)];
                    case 1:
                        output = _a.sent();
                        error = {};
                        if (data.returnCode)
                            return [2 /*return*/, output];
                        if (output.leftover.errorMessage && !output.leftover.ignoreErrors)
                            error = output.leftover.errorMessage;
                        if (output.leftover.suppressed) {
                            if (output.leftover.suppressedMessage)
                                error = output.leftover.suppressedMessage;
                            else
                                error = new Error("");
                        }
                        body = __assign({ embeds: output.leftover.embeds, ephemeral: output.leftover.useEphemeral }, output.leftover.sendOptions);
                        if (error.message || output.result)
                            body.content = error.message || output.result;
                        if (output.leftover.data.interaction)
                            return [2 /*return*/, output.leftover.data.interaction.reply(body)];
                        return [2 /*return*/, resolveMessage_1.default(output.leftover.data.channel, body)];
                }
            });
        });
    };
    // Alpha functions, just for lazys
    /**
     * Creates a command to list of IDs
     * @param command
     * @deprecated
     * @returns
     */
    Main.prototype.createCommand = function (command) {
        var Id = 1000000 * Math.random();
        if (!("code" in command) || !command.code)
            throw new Error("Command code is required!");
        this._ALPHA_IDS.set(Id, command);
        return Id;
    };
    /**
     * Assigns command Id to Callback Events
     * @param eventType
     * @param commandId
     * @deprecated
     */
    Main.prototype.assignType = function (eventType, commandId) {
        if (!Events.includes(eventType))
            throw new Error("Invalid event type of \"" + eventType + "\"!");
        var command = this._ALPHA_IDS.get(commandId);
        if (!command)
            throw new Error("Invalid command Id of \"" + commandId + "\"!");
        this.registerCommands(eventType, command);
        // Clearing up memory usages / cache
        this._ALPHA_IDS.delete(commandId);
    };
    return Main;
}());
exports.default = Main;
//# sourceMappingURL=Main.js.map