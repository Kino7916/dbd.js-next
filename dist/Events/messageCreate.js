"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("../Main/Main");
var Config_1 = require("../Main/Config");
function Main(message) {
    if (Config_1.default.Options.ignoreDMs && message.channel.type === "DM")
        return;
    if (Config_1.default.Options.ignoreBots && message.author.bot === true) {
        if (message.author.id !== message.client.user.id)
            return;
    }
    if (Config_1.default.Options.ignoreMe && message.author.id === message.client.user.id)
        return;
    var commands = Array.from(Config_1.default.Commands.entries()).filter(function (_a) {
        var key = _a[0], _ = _a[1];
        return key.startsWith('C-messageCreate');
    }).map(function (f) { return f[1]; });
    var commandsWithName = commands.filter(function (f) { return f.name.length && !f.nonPrefix; });
    var commandsWithoutName = commands.filter(function (f) { return (!f.name && f.nonPrefix) || f.nonPrefix; });
    var args = message.content.trim().split(/ +/g);
    var callCommand = args.shift();
    var findPrefix = Config_1.default.CommandPrefix
        .filter(function (v) { return callCommand.startsWith(v); })
        .sort(function (a, b) { return b.length - a.length; })[0];
    if (findPrefix) {
        var _call = callCommand.slice(findPrefix.length);
        for (var _i = 0, commandsWithName_1 = commandsWithName; _i < commandsWithName_1.length; _i++) {
            var command = commandsWithName_1[_i];
            var _call_1 = Config_1.default.CaseSensitiveTrigger ? _call.slice(0, command.name.length).toLowerCase() : _call.slice(0, command.name.length);
            var _equal = Config_1.default.CaseSensitiveTrigger ? command.name.toLowerCase() : command.name;
            var client = message.client;
            if (!(_call_1 === _equal))
                continue;
            var newArgs = __spreadArray([], args);
            var _slice = _call.slice(_equal.length);
            if (_slice.length)
                newArgs.unshift(_slice);
            Main_1.default._compile(command, {
                bot: client.dbdjsProgram,
                client: client,
                message: message,
                args: newArgs,
                member: message.member,
                channel: message.channel,
                guild: message.guild,
                author: message.author
            });
        }
    }
    for (var _a = 0, commandsWithoutName_1 = commandsWithoutName; _a < commandsWithoutName_1.length; _a++) {
        var command = commandsWithoutName_1[_a];
        var newArgs = __spreadArray([], args);
        if (command.name) {
            var _call_1 = Config_1.default.CaseSensitiveTrigger ? callCommand.slice(0, command.name.length).toLowerCase() : callCommand.slice(0, command.name.length);
            var _equal = Config_1.default.CaseSensitiveTrigger ? command.name.toLowerCase() : command.name;
            if (!(_call_1 === _equal))
                continue;
            var _slice = callCommand.slice(_equal.length);
            if (_slice.length)
                newArgs.unshift(_slice);
        }
        var client = message.client;
        Main_1.default._compile(command, {
            bot: client.dbdjsProgram,
            client: client,
            message: message,
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