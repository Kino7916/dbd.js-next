"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
// Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
function getColor(raw_color) {
    const nC = Number(raw_color);
    if (!isNaN(nC))
        return nC;
    const sC = discord_js_1.Util.resolveColor(raw_color);
    if (!isNaN(sC))
        return sC;
    const r_rgb = hexToRgb(raw_color);
    const rgb = (r_rgb?.r + r_rgb?.g + r_rgb?.b) || null;
    if (!isNaN(rgb))
        return rgb;
    return 0;
}
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const [raw_color, embedIndex = '1'] = d.unpack(d.unpacked).splits;
    if (!raw_color)
        return d.error('Field 1 is required!');
    const embed = d.getEmbed(Number(embedIndex) - 1);
    const color = getColor(raw_color);
    embed.setColor(color);
    return '';
}
exports.default = Main;
//# sourceMappingURL=color.js.map