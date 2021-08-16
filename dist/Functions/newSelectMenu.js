"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
async function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const [customId, min = '0', max = '1', placeholder, disabled = 'no', messageId, channelId] = d.unpack(d.unpacked).splits;
    if (!customId)
        return d.error("Field 2 is required!");
    if (Number(min) < 0 || Number(min) > 25)
        return d.error("Maximum value of 'min' are numeric 0-25");
    if (Number(max) < 1 || Number(max) > 25)
        return d.error("Maximum value of 'max' are numeric 1-25");
    const menu = new discord_js_1.MessageSelectMenu({
        customId,
        minValues: Number(min),
        maxValues: Number(max),
        placeholder,
        disabled: disabled === "yes"
    });
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
        if (newComponents.length > 4)
            return d.error("ACTION_ROW Limit reached, create Failed!");
        const row = new discord_js_1.MessageActionRow();
        newComponents.push(row);
        row.addComponents(menu);
        d.editMessage = message;
        d.editMessage.components = newComponents;
    }
    else {
        if (d.sendOptions.components.length > 4)
            return d.error("ACTION_ROW Limit reached, create Failed!");
        const row = new discord_js_1.MessageActionRow();
        d.sendOptions.components.push(row);
        row.components.push(menu);
    }
}
exports.default = Main;
//# sourceMappingURL=newSelectMenu.js.map