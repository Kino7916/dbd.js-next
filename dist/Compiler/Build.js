"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Util_1 = require("../Handlers/Util");
const Plugin_1 = require("../Handlers/Plugin");
const Debugger_1 = require("../Handlers/Debugger");
async function build(d, _) {
    const InstanceData = {
        start: Date.now(),
        httpResult: null,
        axiosConfig: {
            headers: {},
        },
        ignoreErrors: false,
        errorMessage: null,
        suppressed: null,
        suppressedMessage: ["", {}],
        splits: [],
        code: "",
        data: {
            returnCode: false,
            variables: {},
            ..._
        },
        strictErrors: false,
        sendOptions: {},
        unpacked: "",
        embeds: [],
        wasUnpacked: false,
        unpack: (string) => {
            let _this = this;
            if (!_this?.start)
                _this = InstanceData;
            if (string.length)
                _this.wasUnpacked = true;
            return {
                total: string,
                inside: string.slice(1, string.length - 1),
                splits: string.slice(1, string.length - 1).split(/[;]/g)
            };
        },
        createEmbed: () => {
            let _this = this;
            if (!_this?.start)
                _this = InstanceData;
            _this.embeds.push(new discord_js_1.MessageEmbed());
        },
        getEmbed: (index = 0) => {
            let _this = this;
            if (!_this?.start)
                _this = InstanceData;
            const embed = _this.embeds[index];
            if (!embed) {
                const newEmbed = new discord_js_1.MessageEmbed();
                _this.embeds[index] = newEmbed;
                return newEmbed;
            }
            return embed;
        },
        hasUsage: () => {
            let _this = this;
            if (!_this?.start)
                _this = InstanceData;
            if (_this.unpacked)
                return true;
            return false;
        },
        error: function (error, onlyIfStrict) {
            let _this = this;
            if (!_this?.start)
                _this = InstanceData;
            const errorMessage = new Error(error);
            if (_this.ignoreErrors)
                return;
            if (onlyIfStrict && _this.strictErrors) {
                _this.errorMessage = errorMessage;
                return;
            }
            _this.errorMessage = errorMessage;
        },
        util: Util_1.default,
        errorWasClient: false,
        useEphemeral: false
    };
    async function walk(data) {
        let code = data.code;
        for (const v of data.functions) {
            if (InstanceData.errorMessage)
                break;
            /**
             * @type {String}
             */
            let F = v.shift();
            const V = v.shift();
            const isPlugin = Plugin_1.CompilerPlugin.manager.array().find(f => f.identifier === F);
            const File = isPlugin ? isPlugin.callback : Util_1.default.requireModule("../Functions/" + F.slice(1) + ".js");
            // Replace function to correct lowercase and uppercase
            code = code.replace(new RegExp("\\" + F, "i"), F);
            if (isPlugin && V) {
                InstanceData.unpacked = !isPlugin?.compileUnpacked ? V?.code : await walk(V);
                code = code.replace(F + "[", F + InstanceData.unpacked);
            }
            else if (!isPlugin && V) {
                InstanceData.unpacked = await walk(V);
                code = code.replace(F + "[", F + InstanceData.unpacked);
            }
            if (InstanceData.errorMessage)
                break;
            let output = File(InstanceData);
            if (output && typeof output.then === "function")
                output = await output;
            if (InstanceData.wasUnpacked)
                F = F + InstanceData.unpacked;
            code = code.replace(F, String(output || (typeof output !== "string" ? F : "")));
            InstanceData.unpacked = "";
            InstanceData.wasUnpacked = false;
            if (InstanceData.errorMessage instanceof Error) {
                if (!InstanceData.errorWasClient) {
                    InstanceData.errorMessage.message = `\`\`\`js\n${F} Compiler ran to ${InstanceData.errorMessage.stack.replace("Script._compile", "ScriptCodeCompiler")}\`\`\``;
                    Debugger_1.default.log(`Changed Error Message by '${F}'`, Debugger_1.default.FLAGS.INFO);
                }
                else {
                    Debugger_1.default.log(InstanceData.errorMessage.message, Debugger_1.default.FLAGS.WARN);
                }
                break;
            }
        }
        return code;
    }
    return { result: await walk(d), leftover: InstanceData };
}
exports.default = build;
//# sourceMappingURL=Build.js.map