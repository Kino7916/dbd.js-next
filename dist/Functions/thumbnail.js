"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const [thumbnail, embedIndex = '1'] = d.unpack(d.unpacked).inside;
    if (!thumbnail)
        return d.error('Field 1 is required!');
    const embed = d.getEmbed(Number(embedIndex) - 1);
    embed.setThumbnail(thumbnail);
    return '';
}
exports.default = Main;
//# sourceMappingURL=thumbnail.js.map