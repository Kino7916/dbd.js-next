"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.data.message)
        return d.error("Unsupported event for function", false);
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const replied = d.data.message.mentions.repliedUser;
    return replied?.id ?? '';
}
exports.default = Main;
//# sourceMappingURL=repliedUser.js.map