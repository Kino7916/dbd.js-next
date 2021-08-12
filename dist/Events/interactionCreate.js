"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("../Main/Main");
var Config_1 = require("../Main/Config");
function Main(interaction) {
    var commands = Array.from(Config_1.default.Commands.entries()).filter(function (_a) {
        var key = _a[0], _ = _a[1];
        return key.startsWith('C-interactionCreate');
    }).map(function (f) { return f[1]; });
    var client = interaction.client;
    var _ = interaction;
    for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
        var command = commands_1[_i];
        Main_1.default._compile(command, {
            bot: client.dbdjsProgram,
            client: client,
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