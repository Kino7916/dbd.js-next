"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const [text, icon, url, embedIndex = '1'] = d.unpack(d.unpacked).splits;
    if (!text)
        return d.error('Field 1 is required!');
    const embed = d.getEmbed(Number(embedIndex) - 1);
    embed.setAuthor(text, icon, url);
    return '';
}
exports.default = Main;
//# sourceMappingURL=author.js.map