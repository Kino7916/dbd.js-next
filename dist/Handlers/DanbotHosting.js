"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var danbot_hosting_1 = require("danbot-hosting");
var discord_js_1 = require("discord.js");
function connect(key, data) {
    if (data instanceof discord_js_1.ShardingManager) {
        new danbot_hosting_1.default.ShardingClient(key, data);
    }
    else {
        var dbhClient = new danbot_hosting_1.default.Client(key, data);
        dbhClient.autopost().then(function (err) {
            if (err)
                return console.error("\u001B[31mDANBOT HOSTING API\u001B[0m: Error encountered! \u001B[30m\u001B[4m\u001B[32m" + err + "\u001B[0m.");
            return console.info("\u001B[32mDANBOT HOSTING API\u001B[0m: Successfull connection was made to REST.");
        });
    }
}
exports.default = connect;
//# sourceMappingURL=DanbotHosting.js.map