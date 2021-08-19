"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Main_1 = require("../Main/Main");
const Config_1 = require("../Main/Config");
function Main(guild) {
    const commands = Array.from(Config_1.default.Commands.entries()).filter(([key, _]) => key.startsWith('C-guildCreate')).map(f => f[1]);
    const client = guild.client;
    for (const command of commands) {
        Main_1.default._compile(command, {
            bot: client.dbdjsProgram,
            client,
            guild,
        });
    }
}
exports.default = Main;
//# sourceMappingURL=guildDelete.js.map