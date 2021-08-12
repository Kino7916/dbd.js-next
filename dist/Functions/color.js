"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
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
    var nC = Number(raw_color);
    if (!isNaN(nC))
        return nC;
    var sC = discord_js_1.Util.resolveColor(raw_color);
    if (!isNaN(sC))
        return sC;
    var r_rgb = hexToRgb(raw_color);
    var rgb = ((r_rgb === null || r_rgb === void 0 ? void 0 : r_rgb.r) + (r_rgb === null || r_rgb === void 0 ? void 0 : r_rgb.g) + (r_rgb === null || r_rgb === void 0 ? void 0 : r_rgb.b)) || null;
    if (!isNaN(rgb))
        return rgb;
    return 0;
}
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    var raw_color = d.unpack(d.unpacked).inside;
    if (!raw_color)
        return d.error('Field 1 is required!');
    var embed = d.getEmbed();
    if (!embed) {
        d.createEmbed();
        embed = d.getEmbed();
    }
    var color = getColor(raw_color);
    embed.setColor(color);
    return '';
}
exports.default = Main;
//# sourceMappingURL=color.js.map