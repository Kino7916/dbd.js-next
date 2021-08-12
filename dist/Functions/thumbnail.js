"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    var thumbnail = d.unpack(d.unpacked).inside;
    if (!thumbnail)
        return d.error('Field 1 is required!');
    var embed = d.getEmbed();
    if (!embed) {
        d.createEmbed();
        embed = d.getEmbed();
    }
    embed.setThumbnail(thumbnail);
    return '';
}
exports.default = Main;
//# sourceMappingURL=thumbnail.js.map