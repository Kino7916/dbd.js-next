"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Main_1 = require("../Main/Main");
const Config_1 = require("../Main/Config");
function Main(member) {
    const commands = Array.from(Config_1.default.Commands.entries()).filter(([key, _]) => key.startsWith('C-guildMemberAdd')).map(f => f[1]);
    const client = member.client;
    for (const command of commands) {
        Main_1.default._compile(command, {
            bot: client.dbdjsProgram,
            client,
            member: member,
            guild: member.guild,
            author: member.user
        });
    }
}
exports.default = Main;
//# sourceMappingURL=guildMemberAdd.js.map