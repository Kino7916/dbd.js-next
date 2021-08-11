const dbd = require("./dist");
const djs = require("discord.js");
const bot = new dbd.Bot({
    intents: 32767,
    prefix: "!"
});

dbd.Plugin.overwriteNative = true;
dbd.Plugin.manager.add(
    {
        identifier: "replyInstantEmbed",
        compileUnpacked: true,
        callback: function (d) {
            d.createEmbed();
            const embed = d.getEmbed();
            embed.setTitle('Hello World')
            .setColor('WHITE');
            return '';
        }
    }
)

bot.login`Tokennnnnnnnnn`
