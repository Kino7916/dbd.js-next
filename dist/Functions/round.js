"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const number = d.unpack(d.unpacked).inside;
    const Result = Math.round(Number(number));
    if (isNaN(Result))
        return d.error('Unexpected NaN from Result!');
    return Result;
}
exports.default = Main;
//# sourceMappingURL=round.js.map