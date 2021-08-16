"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.data.message)
        return d.error("Unsupported event for function", false);
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const mentioned = d.data.message.mentions.users;
    if (!mentioned.size)
        return '';
    const argMention = d.unpack(d.unpacked).inside;
    const n = Number(argMention);
    if (isNaN(n))
        return mentioned.first()?.id;
    return Array.from(mentioned.values())[n - 1] ?? '';
}
exports.default = Main;
//# sourceMappingURL=mentioned.js.map