"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const danbot_hosting_1 = require("danbot-hosting");
const discord_js_1 = require("discord.js");
function connect(key, data) {
    if (data instanceof discord_js_1.ShardingManager) {
        new danbot_hosting_1.default.ShardingClient(key, data);
    }
    else {
        const dbhClient = new danbot_hosting_1.default.Client(key, data);
        dbhClient.autopost().then(function (err) {
            if (err)
                return console.error(`\x1b[31mDANBOT HOSTING API\x1b[0m: Error encountered! \x1b[30m\x1b[4m\x1b[32m${err}\x1b[0m.`);
            return console.info(`\x1b[32mDANBOT HOSTING API\x1b[0m: Successfull connection was made to REST.`);
        });
    }
}
exports.default = connect;
//# sourceMappingURL=DanbotHosting.js.map