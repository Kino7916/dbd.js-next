"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MessageEmbed } from 'discord.js';
import util from '../Handlers/Util';
import { CompilerPlugin } from '../Handlers/Plugin';
function build(d, _) {
    return __awaiter(this, void 0, void 0, function* () {
        const InstanceData = {
            start: Date.now(),
            httpResult: null,
            ignoreErrors: false,
            errorMessage: null,
            suppressed: null,
            suppressedMessage: ["", {}],
            splits: [],
            code: "",
            data: Object.assign({ returnCode: false, $TEMPO_VAR: {} }, _),
            strictErrors: false,
            sendOptions: {},
            unpacked: "",
            embeds: [],
            wasUnpacked: false,
            unpack: function (string) {
                if (string.length)
                    this.wasUnpacked = true;
                return {
                    total: string,
                    inside: string.slice(1, string.length - 1),
                    splits: string.slice(1, string.length - 1).split(/[;]/g)
                };
            },
            createEmbed: function () {
                this.embeds.push(new MessageEmbed());
            },
            getEmbed: function () {
                const embed = this.embeds.reverse()[0];
                return embed;
            },
            hasUsage: function () {
                if (this.unpacked)
                    return true;
                return false;
            },
            error: function (error, onlyIfStrict) {
                const errorMessage = new Error(error);
                if (this.ignoreErrors)
                    return;
                if (onlyIfStrict && this.strictErrors) {
                    this.errorMessage = error;
                    return;
                }
                this.errorMessage = error;
            },
            util,
            errorNotClient: false,
            useEphemeral: false
        };
        function walk(data) {
            return __awaiter(this, void 0, void 0, function* () {
                let code = data.code;
                for (const v of data.functions) {
                    if (InstanceData.errorMessage)
                        break;
                    /**
                     * @type {String}
                     */
                    let F = v.shift();
                    const V = v.shift();
                    const isPlugin = CompilerPlugin.manager.array().find(f => f.identifier === F);
                    const File = isPlugin ? isPlugin.callback : require("../Functions/" + F.slice(1) + ".js");
                    // Replace function to correct lowercase and uppercase
                    code = code.replace(new RegExp("\\" + F, "i"), F);
                    if ((isPlugin === null || isPlugin === void 0 ? void 0 : isPlugin.compileUnpacked) === true || V) {
                        InstanceData.unpacked = yield walk(V);
                        code = code.replace(F + "[", F + InstanceData.unpacked);
                    }
                    if (InstanceData.errorMessage)
                        break;
                    let output = File(InstanceData);
                    if (output && typeof output.then === "function")
                        output = yield output;
                    if (InstanceData.wasUnpacked)
                        F = F + InstanceData.unpacked;
                    code = code.replace(F, String(output || (typeof output !== "string" ? F : "")));
                    InstanceData.unpacked = "";
                    InstanceData.wasUnpacked = false;
                    if (InstanceData.errorMessage instanceof Error) {
                        if (!InstanceData.errorNotClient)
                            InstanceData.errorMessage.message = `\`\`\`js\n${F} Compiler ran to ${InstanceData.errorMessage.stack.replace("Script._compile", "ScriptCodeCompiler")}\`\`\``;
                        break;
                    }
                }
                return code;
            });
        }
        return { result: yield walk(d), leftover: InstanceData };
    });
}
module.exports = build;
//# sourceMappingURL=Build.js.map