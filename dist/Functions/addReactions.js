"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
async function Main(d) {
    if (!d.hasUsage())
        return d.error('Invalid usage of Function!');
    const [messageId = d.data.message?.id, channelId = d.data.channel?.id, ...emojis] = d.unpack(d.unpacked).splits;
    if (!messageId)
        return d.error('Expecting Message Id as param1!');
    if (d.data.message?.id === messageId) {
        const message = d.data.message;
        for (const emoji of emojis)
            message.react(emoji);
        return '';
    }
    if (!channelId)
        return d.error('Expecting Channel Id as param2!');
    const _bigInt1 = `${BigInt(Number(messageId))}`;
    const _bigInt2 = `${BigInt(Number(channelId))}`;
    const Channel = await d.util.getChannel(d.data.client, _bigInt2)
        .catch(err => null);
    if (Channel instanceof discord_js_1.TextChannel ||
        Channel instanceof discord_js_1.DMChannel ||
        Channel instanceof discord_js_1.NewsChannel) {
        const message = Channel.messages.cache.get(_bigInt1);
        if (!message) {
            const _message2 = await Channel.messages.fetch(_bigInt1);
            if (!_message2)
                return d.error('Message Source of Id is invalid!');
            for (const emoji of emojis)
                _message2.react(emoji);
            return '';
        }
        else {
            for (const emoji of emojis)
                message.react(emoji);
            return '';
        }
    }
    else
        return d.error('Invalid Channel of Channel Id!');
}
exports.default = Main;
//# sourceMappingURL=addReactions.js.map