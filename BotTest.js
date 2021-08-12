const dbd = require("dbd.js");

const bot = new dbd.Bot({
    intents: 32767,
    prefix: ["!", "?"],
    ignoreBots: true,
    ignoreDMs: true,
    ignoreMe: true
});
/**
 * Allows to add custom functions
 */
dbd.Plugin.manager.add({
    identifier: "lerefAvatar",
    callback: async function (d) {
        const leref = await d.util.getUser(d.data.client, '608358453580136499');
        return leref.displayAvatarURL({ size: 2048, dynamic: true })
    }
});

bot.enableEvents('messageCreate');
bot.registerCommands(dbd.Types.Message, {
    name: "if",
    code: "$onlyIf[$message==abc;Nope]\n$lerefAvatar"
});


bot.login('ODQ4MDc4NTA1ODk1OTE5NjQ2.YLHYqA.GJseUe-l29pRwhExRyLOH8lX05o')