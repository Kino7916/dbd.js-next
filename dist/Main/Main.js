var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as Discord from 'discord.js';
import connect from '../Handlers/DanbotHosting';
import StatusHandler from '../Handlers/StatusHandler';
import resolveMessage from '../Compiler/resolveMessage';
import { Alpha_Types } from './ALPHA_TYPES';
import Config from './Config';
// Alpha version
// just in case if they're lazy
const Events = Object.values(typeof Alpha_Types);
function runEvent(event) {
    return require("../Events/" + event + ".js")();
}
export class _CL_EXTENDED extends Discord.Client {
}
class Main {
    constructor(clientOptions) {
        this.database = clientOptions.database;
        this._ALPHA_IDS = new Discord.Collection();
        Config.Options = clientOptions;
        Config.ClientOptions = {
            ws: {
                properties: {
                    $browser: "discord.js"
                },
            },
            intents: Config.Options.intents,
            makeCache: Config.Options.cache
        };
        // Internal Sharding
        if (Config.Options.useInternalSharding === true)
            Config.ClientOptions.shards = "auto";
        if (Array.isArray(Config.Options.prefix))
            Config.CommandPrefix = clientOptions.prefix;
        if (typeof Config.Options.prefix === "string") {
            const _string = Config.Options.prefix;
            Config.CommandPrefix.push(_string);
        }
        if (!Config.CommandPrefix.length)
            throw new Error("Mismatch of prefix Type / No prefix was present or set");
        if (Config.Options.mobilePresence === true)
            Config.ClientOptions.ws.properties.$browser = "Discord iOS";
        this.client = new _CL_EXTENDED(Config.ClientOptions);
        this.client.dbdjsProgram = this;
        this.client.once("ready", function (client) {
            StatusHandler(Config.Statuses, client.dbdjsProgram);
            if (!client.shard) {
                console.log(`Connected as ${client.user.username}`);
            }
            if (clientOptions.danbotHostingKey) {
                connect(clientOptions.danbotHostingKey, client);
            }
        });
    }
    /**
     * Enable Discord.js event
     * @param event
     */
    enableEvent(event) {
        if (!Events.includes(event))
            throw new TypeError(`Unsupported event of "${event}"!`);
        this.client.on(event, runEvent(event));
    }
    /**
     * Register commands to an event
     * @param event
     * @param command
     */
    registerCommand(event, command) {
        if (!Events.includes(event))
            throw new TypeError(`Unsupported event of "${event}"!`);
        if (!this.client.eventNames().includes(event))
            throw new Error(`Event named "${event}" is not enabled, please enabled first!`);
        if (!("code" in command) || !command.code)
            throw new Error("Command code is required!");
        Config.Commands.set("C-" + event + "-" + Config.Commands.size.toString(), command);
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
            Config.Statuses.set("ST-" + Config.Statuses.size.toString(), {
                name: activity.activity,
                type: activity.type,
                Lifetime: activity.time,
                url: activity.url,
                status: activity.status.toLowerCase(),
                compile: Main._compile
            });
        }
    }
    static _compile(command, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const output = yield require("../Compiler/Build")(require("../Compiler/Interpreter")(command.code), data);
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
            const body = Object.assign({ embeds: output.leftover.embeds, ephemeral: output.leftover.useEphemeral }, output.leftover.sendOptions);
            if (output.result /* || error.content*/)
                body.content = output.result /* || error.content*/;
            if (output.leftover.data.interaction)
                return output.leftover.data.interaction.reply(body);
            return resolveMessage(output.leftover.data.channel, body);
        });
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
        if (!Object.values(typeof Alpha_Types).includes(eventType))
            throw new Error(`Invalid event type of "${eventType}"!`);
        const command = this._ALPHA_IDS.get(commandId);
        if (!command)
            throw new Error(`Invalid command Id of "${commandId}"!`);
        this.registerCommand(eventType, command);
        // Clearing up memory usages / cache
        this._ALPHA_IDS.delete(commandId);
    }
}
export default Main;
//# sourceMappingURL=Main.js.map