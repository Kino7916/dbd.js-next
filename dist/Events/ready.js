"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Main_1 = require("../Main/Main");
const Config_1 = require("../Main/Config");
function Main(client) {
    const commands = Array.from(Config_1.default.Commands.entries()).filter(([key, _]) => key.startsWith('C-ready')).map(f => f[1]);
    for (const command of commands) {
        Main_1.default._compile(command, {
            bot: client.dbdjsProgram,
            client,
            author: client.user
        });
    }
}
exports.default = Main;
//# sourceMappingURL=ready.js.map