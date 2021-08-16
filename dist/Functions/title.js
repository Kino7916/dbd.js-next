"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const [text, embedIndex = '1'] = d.unpack(d.unpacked).inside;
    if (!text)
        return d.error('Field 1 is required!');
    const embed = d.getEmbed(Number(embedIndex) - 1);
    embed.setTitle(text);
    return '';
}
exports.default = Main;
//# sourceMappingURL=title.js.map