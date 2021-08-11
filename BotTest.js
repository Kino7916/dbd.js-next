const dbd = require("./dist")

const bot = new dbd.Bot({
    intents: 32767,
    prefix: ["!", "?"],
    ignoreBots: true,
    ignoreDMs: true,
    ignoreMe: true
});

dbd.Plugin.manager.add({
    identifier: "executionTime",
    callback: function (d) {
        return Date.now() - d.start;
    }
})

bot.enableEvent('messageCreate');
bot.registerCommand(dbd.Types.Message, {
    name: "ping",
    code: "Pong!"
});

bot.registerCommand(dbd.Types.Message, {
    name: "test",
    code: "$pingms\n$executionTimems"
});

bot.login('Token')