"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    var _a, _b;
    if (!d.data.message)
        return d.error("Unsupported event for function", false);
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    var mentioned = d.data.message.mentions.roles;
    if (!mentioned.size)
        return '';
    var argMention = d.unpack(d.unpacked).inside;
    var n = Number(argMention);
    if (isNaN(n))
        return (_a = mentioned.first()) === null || _a === void 0 ? void 0 : _a.id;
    return (_b = Array.from(mentioned.values())[n - 1]) !== null && _b !== void 0 ? _b : '';
}
exports.default = Main;
//# sourceMappingURL=mentionedRoles.js.map