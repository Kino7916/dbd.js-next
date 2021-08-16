"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const arg = d.unpack(d.unpacked).inside;
    if (!arg)
        return d.error("Field 1 is required!");
    const n = Number(arg);
    if (isNaN(n))
        return d.error("Field 1 must be a numeric expression!");
    if (!Number.isFinite(n))
        return d.error('Numeric can\'t be Infinite!');
    return d.splits[n] ?? '';
}
exports.default = Main;
//# sourceMappingURL=splitText.js.map