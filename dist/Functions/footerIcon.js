"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    var icon = d.unpack(d.unpacked).inside;
    if (!icon)
        return d.error('Field 1 is required!');
    var embed = d.getEmbed();
    if (!embed) {
        d.createEmbed();
        embed = d.getEmbed();
    }
    embed.setFooter(embed.footer.text, icon);
    return '';
}
exports.default = Main;
//# sourceMappingURL=footerIcon.js.map