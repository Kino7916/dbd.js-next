"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const [number, fractionDigits = '0'] = d.unpack(d.unpacked).splits;
    const Result = Number(number);
    if (isNaN(Result))
        return d.error('Unexpected NaN from Result!');
    return Result.toFixed(Number(fractionDigits));
}
exports.default = Main;
//# sourceMappingURL=truncate.js.map