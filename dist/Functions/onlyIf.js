"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error('Invalid usage of Function!');
    var _a = d.unpack(d.unpacked).splits, condition = _a[0], _b = _a[1], errorMessage = _b === void 0 ? ' ' : _b;
    var bool = d.util.checkCondition(condition);
    if (!bool) {
        d.error(errorMessage);
        d.errorWasClient = true;
    }
    return '';
}
exports.default = Main;
//# sourceMappingURL=onlyIf.js.map