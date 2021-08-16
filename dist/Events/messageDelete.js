"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Main_1 = require("../Main/Main");
const Config_1 = require("../Main/Config");
function Main(message) {
    if (!message)
        return;
    if (Config_1.default.Options.ignoreDMs && message?.channel?.type === "DM")
        return;
    if (Config_1.default.Options.ignoreBots && message?.author?.bot === true) {
        if (message?.author?.id !== message?.client?.user?.id)
            return;
    }
    if (Config_1.default.Options.ignoreMe && message?.author?.id === message?.client?.user?.id)
        return;
    const commands = Array.from(Config_1.default.Commands.entries()).filter(([key, _]) => key.startsWith('C-messageDelete')).map(f => f[1]);
    const client = message.client;
    const args = message?.content?.trim?.()?.split?.(/ +/g) ?? [];
    for (const command of commands) {
        Main_1.default._compile(command, {
            bot: client.dbdjsProgram,
            client,
            message,
            args,
            member: message.member,
            channel: message.channel,
            guild: message.guild,
            author: message.author
        });
    }
}
exports.default = Main;
//# sourceMappingURL=messageDelete.js.map