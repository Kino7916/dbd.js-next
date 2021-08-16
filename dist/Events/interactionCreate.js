"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Main_1 = require("../Main/Main");
const Config_1 = require("../Main/Config");
function Main(interaction) {
    const commands = Array.from(Config_1.default.Commands.entries()).filter(([key, _]) => key.startsWith('C-interactionCreate')).map(f => f[1]);
    const client = interaction.client;
    const _ = interaction;
    for (const command of commands) {
        Main_1.default._compile(command, {
            bot: client.dbdjsProgram,
            client,
            member: interaction.member,
            guild: interaction.guild,
            author: interaction.user,
            message: _.message,
            channel: interaction.channel
        });
    }
}
exports.default = Main;
//# sourceMappingURL=interactionCreate.js.map