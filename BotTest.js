const dbd = require("dbd.js");

const bot = new dbd.Bot({
    intents: 32767,
    prefix: ["!", "?"],
    ignoreBots: true,
    ignoreDMs: true,
    ignoreMe: true,
    reverseReading: true
});

dbd.Debugger.Events.on('debug', console.log)
.on('error', () => {});

/**
 * Allows to add custom functions
 */
dbd.Plugin.manager.add({
    identifier: "lerefAvatar",
    callback: async function (d) {
        const leref = await d.util.getUser(d.data.client, '608358453580136499');
        return leref.displayAvatarURL({ size: 2048, dynamic: true })
    }
}, {
    identifier: "log",
    compileUnpacked: true,
    callback: async function (d) {

        if (!d.hasUsage()) return '';
        const e = d.unpack(d.unpacked);
        console.log(e.inside);
        return '';
    }
});

bot.enableEvents(['messageCreate'], ['ready']);
dbd.CommandManager.add({
    name: "owo",
    code: '$log[$username is Ready!]',
    type: ['messageCreate', 'ready']
})

bot.registerCommands(dbd.Types.Message, {
    name: "if",
    code: `ABC$title[Title]
    $description[HI]
    $addField[Hi;Hello]
    $addField[Hello;Hi]
    $color[WHITE]`
});


bot.login('ODQ4MDc4NTA1ODk1OTE5NjQ2.YLHYqA.-ptf5eWORxVC9gSNvS033df3KwU')