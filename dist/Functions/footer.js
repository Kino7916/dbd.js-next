"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const [text, icon, embedIndex = '1'] = d.unpack(d.unpacked).splits;
    if (!text)
        return d.error('Field 1 is required!');
    const embed = d.getEmbed(Number(embedIndex) - 1);
    embed.setFooter(text, icon);
    return '';
}
exports.default = Main;
//# sourceMappingURL=footer.js.map