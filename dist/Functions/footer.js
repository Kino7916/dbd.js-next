"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    var _a = d.unpack(d.unpacked).splits, text = _a[0], icon = _a[1];
    if (!text)
        return d.error('Field 1 is required!');
    var embed = d.getEmbed();
    if (!embed) {
        d.createEmbed();
        embed = d.getEmbed();
    }
    embed.setFooter(text, icon);
    return '';
}
exports.default = Main;
//# sourceMappingURL=footer.js.map