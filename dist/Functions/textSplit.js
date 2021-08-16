"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const [text = "", separator = ""] = d.unpack(d.unpacked).splits;
    if (!text)
        return d.error("Field 1 is required!");
    d.splits = text.split(separator);
    return '';
}
exports.default = Main;
//# sourceMappingURL=textSplit.js.map