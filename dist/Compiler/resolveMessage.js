"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("..");
function resolveMessage(channel, options, instancedata) {
    if (typeof channel.send !== "function")
        return new TypeError();
    if (options.embeds.length) {
        for (const embed of options.embeds) {
            if (!embed || !(embed instanceof discord_js_1.MessageEmbed)) {
                options.embeds = __1.Util.removeItemFromArray(options.embeds, embed);
                continue;
            }
            if (embed.description === null || !embed.description.length) {
                embed.description = '\u200b';
            }
        }
    }
    if (instancedata.editMessage) {
        const m = instancedata.editMessage;
        m.edit({
            content: m.content,
            embeds: m.embeds,
            components: m.components
        });
    }
    return channel.send({ ...options }).catch(err => console.log(err));
}
exports.default = resolveMessage;
//# sourceMappingURL=resolveMessage.js.map