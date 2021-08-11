"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    var _a = d.unpack(d.unpacked).splits, number = _a[0], _b = _a[1], fractionDigits = _b === void 0 ? '0' : _b;
    var Result = Number(number);
    if (isNaN(Result))
        return d.error('Unexpected NaN from Result!');
    return Result.toFixed(Number(fractionDigits));
}
exports.default = Main;
//# sourceMappingURL=truncate.js.map