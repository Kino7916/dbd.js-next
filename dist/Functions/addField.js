"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const [title, value, inline = "no", embedIndex = '1'] = d.unpack(d.unpacked).splits;
    if (!title)
        return d.error('Field 1 is required!');
    if (!value)
        return d.error('Field 2 is required!');
    let embed = d.getEmbed(Number(embedIndex) - 1);
    if (!embed) {
        d.createEmbed();
        embed = d.getEmbed();
    }
    embed.addField(title, value, (inline === "yes"));
    return '';
}
exports.default = Main;
//# sourceMappingURL=addField.js.map