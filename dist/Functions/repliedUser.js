"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    var _a;
    if (!d.data.message)
        return d.error("Unsupported event for function", false);
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    var replied = d.data.message.mentions.repliedUser;
    return (_a = replied === null || replied === void 0 ? void 0 : replied.id) !== null && _a !== void 0 ? _a : '';
}
exports.default = Main;
//# sourceMappingURL=repliedUser.js.map