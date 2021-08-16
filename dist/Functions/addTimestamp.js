"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    let embed = d.getEmbed();
    if (!d.hasUsage()) {
        embed.setTimestamp(Date.now());
        return '';
    }
    const [ms, embedIndex = '1'] = d.unpack(d.unpacked).splits;
    if (!ms)
        return d.error('Field 1 is required!');
    embed = d.getEmbed(Number(embedIndex) - 1);
    const timestamp = Number(ms);
    if (isNaN(timestamp)) {
        embed.setTimestamp(Date.now());
    }
    else {
        embed.setTimestamp(timestamp);
    }
    return '';
}
exports.default = Main;
//# sourceMappingURL=addTimestamp.js.map