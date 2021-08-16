"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const DanbotHosting_1 = require("../Handlers/DanbotHosting");
const StatusHandler_1 = require("../Handlers/StatusHandler");
const resolveMessage_1 = require("../Compiler/resolveMessage");
const ALPHA_TYPES_1 = require("./ALPHA_TYPES");
const Config_1 = require("./Config");
const Interpreter_1 = require("../Compiler/Interpreter");
const Util_1 = require("../Handlers/Util");
const Build_1 = require("../Compiler/Build");
const requireModule = Util_1.default.requireModule;
// Alpha version
// just in case if they're lazy
const Events = Object.values(ALPHA_TYPES_1.Alpha_Types);
function runEvent(event) {
    return requireModule("../Events/" + event + ".js");
}
class Main {
    constructor(clientOptions) {
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
            const _string = Config_1.default.Options.prefix;
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
                console.log(`Connected as ${client.user.username}`);
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
    enableEvents(...events) {
        for (const event of events) {
            if (!Events.includes(event))
                throw new TypeError(`Unsupported event of "${event}"!`);
            this.client.on(event, runEvent(event));
        }
    }
    /**
     * Register commands to an event
     * @param event
     * @param command
     */
    registerCommands(event, ...commands) {
        if (!Events.includes(event))
            throw new TypeError(`Unsupported event of "${event}"!`);
        if (!this.client.eventNames().includes(event))
            throw new Error(`Event named "${event}" is not enabled, please enabled first!`);
        for (const command of commands) {
            if (!("code" in command) || !command.code)
                throw new Error("Command code is required!");
            Config_1.default.Commands.set("C-" + event + "-" + Config_1.default.Commands.size.toString(), command);
        }
    }
    /**
     * Starts the package and initialize discord bot with provided token
     * @param token - Discord Bot Token
     */
    login(token) {
        return this.client.login(token);
    }
    /**
     * Adds an activity to bot status
     */
    addActivity(...options) {
        for (const activity of options) {
            Config_1.default.Statuses.set("ST-" + Config_1.default.Statuses.size.toString(), {
                name: activity.activity,
                type: activity.type,
                Lifetime: activity.time,
                url: activity.url,
                status: activity.status.toLowerCase(),
                compile: Main._compile
            });
        }
    }
    static async _compile(command, data) {
        const output = await Build_1.default(Interpreter_1.default(command.code, Config_1.default.Options.reverseReading), { command, ...data });
        let error = {};
        if (data.returnCode)
            return output;
        if (output.leftover.errorMessage && !output.leftover.ignoreErrors)
            error = output.leftover.errorMessage;
        if (output.leftover.suppressed) {
            if (output.leftover.suppressedMessage)
                error = output.leftover.suppressedMessage;
            else
                error = new Error("");
        }
        //if (error instanceof Error) error = await resolveError(error, this, output.leftover.data.message) || {};
        const body = {
            embeds: output.leftover.embeds,
            ephemeral: output.leftover.useEphemeral,
            ...output.leftover.sendOptions
        };
        if (error.message || output.result)
            body.content = error.message || output.result;
        if (output.leftover.data.interaction)
            return output.leftover.data.interaction.reply(body);
        return resolveMessage_1.default(output.leftover.data.channel, body, output.leftover);
    }
    // Alpha functions, just for lazys
    /**
     * Creates a command to list of IDs
     * @param command
     * @deprecated
     * @returns
     */
    createCommand(command) {
        const Id = 1000000 * Math.random();
        if (!("code" in command) || !command.code)
            throw new Error("Command code is required!");
        this._ALPHA_IDS.set(Id, command);
        return Id;
    }
    /**
     * Assigns command Id to Callback Events
     * @param eventType
     * @param commandId
     * @deprecated
     */
    assignType(eventType, commandId) {
        if (!Events.includes(eventType))
            throw new Error(`Invalid event type of "${eventType}"!`);
        const command = this._ALPHA_IDS.get(commandId);
        if (!command)
            throw new Error(`Invalid command Id of "${commandId}"!`);
        this.registerCommands(eventType, command);
        // Clearing up memory usages / cache
        this._ALPHA_IDS.delete(commandId);
    }
}
exports.default = Main;
//# sourceMappingURL=Main.js.map