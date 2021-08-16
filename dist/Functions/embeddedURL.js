"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const [url, embedIndex = '1'] = d.unpack(d.unpacked).inside;
    if (!url)
        return d.error('Field 1 is required!');
    const embed = d.getEmbed(Number(embedIndex) - 1);
    embed.setAuthor(embed.author.name, embed.author.iconURL, url);
    return '';
}
exports.default = Main;
//# sourceMappingURL=embeddedURL.js.map