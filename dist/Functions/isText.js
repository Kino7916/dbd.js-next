"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
function handle(channel) {
    if (!channel)
        return '';
    if (channel instanceof discord_js_1.NewsChannel ||
        channel instanceof discord_js_1.TextChannel ||
        channel instanceof discord_js_1.DMChannel ||
        channel instanceof discord_js_1.ThreadChannel) {
        return channel.isText();
    }
    else
        return '';
}
async function Main(d) {
    if (!d.hasUsage())
        return handle(d.data.channel);
    const channelId = d.unpack(d.unpacked).inside;
    const _bigint = `${BigInt(channelId)}`;
    const channel = await d.util.getChannel(d.data.client, _bigint);
    if (!channel)
        return d.error('Invalid Channel of Channel Id!');
    return handle(channel);
}
exports.default = Main;
//# sourceMappingURL=isText.js.map