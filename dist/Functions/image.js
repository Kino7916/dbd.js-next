"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const [image, embedIndex = '1'] = d.unpack(d.unpacked).splits;
    if (!image)
        return d.error('Field 1 is required!');
    const embed = d.getEmbed(Number(embedIndex) - 1);
    embed.setImage(image);
    return '';
}
exports.default = Main;
//# sourceMappingURL=image.js.map