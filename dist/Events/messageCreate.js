"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Main_1 = require("../Main/Main");
const Config_1 = require("../Main/Config");
function Main(message) {
    if (Config_1.default.Options.ignoreDMs && message.channel.type === "DM")
        return;
    if (Config_1.default.Options.ignoreBots && message.author.bot === true) {
        if (message.author.id !== message.client.user.id)
            return;
    }
    if (Config_1.default.Options.ignoreMe && message.author.id === message.client.user.id)
        return;
    const commands = Array.from(Config_1.default.Commands.entries()).filter(([key, _]) => key.startsWith('C-messageCreate')).map(f => f[1]);
    const commandsWithName = commands.filter(f => f.name.length && !f.nonPrefix);
    const commandsWithoutName = commands.filter(f => (!f.name && f.nonPrefix) || f.nonPrefix);
    const args = message.content.trim().split(/ +/g);
    const callCommand = args.shift();
    const findPrefix = Config_1.default.CommandPrefix
        .filter(v => callCommand.startsWith(v))
        .sort((a, b) => b.length - a.length)[0];
    if (findPrefix) {
        const _call = callCommand.slice(findPrefix.length);
        for (const command of commandsWithName) {
            const _call_1 = Config_1.default.CaseSensitiveTrigger ? _call.slice(0, command.name.length).toLowerCase() : _call.slice(0, command.name.length);
            const _equal = Config_1.default.CaseSensitiveTrigger ? command.name.toLowerCase() : command.name;
            const client = message.client;
            if (!(_call_1 === _equal))
                continue;
            const newArgs = [...args];
            const _slice = _call.slice(_equal.length);
            if (_slice.length)
                newArgs.unshift(_slice);
            Main_1.default._compile(command, {
                bot: client.dbdjsProgram,
                client,
                message,
                args: newArgs,
                member: message.member,
                channel: message.channel,
                guild: message.guild,
                author: message.author
            });
        }
    }
    for (const command of commandsWithoutName) {
        const newArgs = [...args];
        if (command.name) {
            const _call_1 = Config_1.default.CaseSensitiveTrigger ? callCommand.slice(0, command.name.length).toLowerCase() : callCommand.slice(0, command.name.length);
            const _equal = Config_1.default.CaseSensitiveTrigger ? command.name.toLowerCase() : command.name;
            if (!(_call_1 === _equal))
                continue;
            const _slice = callCommand.slice(_equal.length);
            if (_slice.length)
                newArgs.unshift(_slice);
        }
        const client = message.client;
        Main_1.default._compile(command, {
            bot: client.dbdjsProgram,
            client,
            message,
            args: newArgs,
            member: message.member,
            channel: message.channel,
            guild: message.guild,
            author: message.author
        });
    }
}
exports.default = Main;
//# sourceMappingURL=messageCreate.js.map