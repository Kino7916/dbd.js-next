import _Main from '../Main/Main';
import Config from '../Main/Config';
function Main(message) {
    const commands = Array.from(Config.Commands.entries()).filter(([key, _]) => key.startsWith('C-messageCreate')).map(f => f[1]);
    const commandsWithName = commands.filter(f => f.name && !f.nonPrefix);
    const commandsWithoutName = commands.filter(f => !f.name || f.nonPrefix);
    const args = message.content.trim().split(/ +/g);
    const callCommand = args.shift();
    const findPrefix = Config.CommandPrefix
        .filter(v => callCommand.startsWith(v))
        .sort((a, b) => b.length - a.length)[0];
    if (findPrefix) {
        const _call = callCommand.slice(0, findPrefix.length);
        for (const command of commandsWithName) {
            const _call_1 = Config.CaseSensitiveTrigger ? _call.slice(0, command.name.length).toLowerCase() : _call.slice(0, command.name.length);
            const _equal = Config.CaseSensitiveTrigger ? command.name.toLowerCase() : command.name;
            const client = message.client;
            if (!(_call_1 === _equal))
                continue;
            const newArgs = [...args];
            const _slice = _call.slice(_equal.length);
            if (_slice.length)
                newArgs.unshift(_slice);
            _Main._compile(command, {
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
            const _call_1 = Config.CaseSensitiveTrigger ? callCommand.slice(0, command.name.length).toLowerCase() : callCommand.slice(0, command.name.length);
            const _equal = Config.CaseSensitiveTrigger ? command.name.toLowerCase() : command.name;
            if (!(_call_1 === _equal))
                continue;
            const _slice = callCommand.slice(_equal.length);
            if (_slice.length)
                newArgs.unshift(_slice);
        }
        const client = message.client;
        _Main._compile(command, {
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
export default Main;
//# sourceMappingURL=messageCreate.js.map