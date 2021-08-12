"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("../Main/Main");
var Config_1 = require("../Main/Config");
function Main(member) {
    var commands = Array.from(Config_1.default.Commands.entries()).filter(function (_a) {
        var key = _a[0], _ = _a[1];
        return key.startsWith('C-guildMemberRemove');
    }).map(function (f) { return f[1]; });
    var client = member.client;
    for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
        var command = commands_1[_i];
        Main_1.default._compile(command, {
            bot: client.dbdjsProgram,
            client: client,
            member: member,
            guild: member.guild,
            author: member.user
        });
    }
}
exports.default = Main;
//# sourceMappingURL=guildMemberRemove.js.map