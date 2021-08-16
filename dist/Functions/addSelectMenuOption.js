"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
async function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const [customId, label, value, description, isDefault = 'no', emoji, messageId, channelId] = d.unpack(d.unpacked).splits;
    if (!customId)
        return d.error("Field 1 is required!");
    if (!label)
        return d.error("Field 2 is required!");
    if (!value)
        return d.error("Field 3 is required!");
    const option = {
        label,
        value,
        default: isDefault === "yes",
        emoji,
        description
    };
    if (messageId) {
        let channel = d.data.channel;
        if (channelId) {
            const _bigint2 = `${BigInt(channelId)}`;
            channel = await (d.util.getChannel(d.data.client, _bigint2)).catch(err => null);
        }
        if (!channel)
            return d.error('Invalid channel of Channel!');
        const _bigint1 = `${BigInt(messageId)}`;
        const message = await channel.messages.fetch(_bigint1, { cache: true, force: false });
        if (!message)
            return d.error("Invalid message of Message Id!");
        if (message.author.id !== d.data.client.user.id)
            return d.error("Incompatible Author of Id with Client for EditMessage!");
        const newComponents = [...message.components];
        const menu = newComponents.find(v => {
            if (v.components[0] instanceof discord_js_1.MessageSelectMenu &&
                v.components[0].customId === customId)
                return true;
            return false;
        }).components[0];
        if (!(menu instanceof discord_js_1.MessageSelectMenu))
            return;
        if (menu.options.length > 24)
            return d.error('Select Menu Options Limit reached of 25, create Failed!');
        menu.addOptions(option);
    }
    else {
        const components = d.sendOptions.components;
        const menu = components.find(v => {
            if (v.components[0] instanceof discord_js_1.MessageSelectMenu &&
                v.components[0].customId === customId)
                return true;
            return false;
        }).components[0];
        if (!(menu instanceof discord_js_1.MessageSelectMenu))
            return;
        if (menu.options.length > 24)
            return d.error('Select Menu Options Limit reached of 25, create Failed!');
        menu.addOptions(option);
    }
}
exports.default = Main;
//# sourceMappingURL=addSelectMenuOption.js.map