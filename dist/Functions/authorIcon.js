"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const [icon, embedIndex = '1'] = d.unpack(d.unpacked).splits;
    if (!icon)
        return d.error('Field 1 is required!');
    const embed = d.getEmbed(Number(embedIndex) - 1);
    embed.setAuthor(embed.author.name, icon, embed.author.url);
    return '';
}
exports.default = Main;
//# sourceMappingURL=authorIcon.js.map