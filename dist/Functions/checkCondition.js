"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const bool = d.util.checkCondition(d.unpack(d.unpacked).inside);
    return `${bool}`;
}
exports.default = Main;
//# sourceMappingURL=checkCondition.js.map