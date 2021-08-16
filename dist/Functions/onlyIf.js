"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error('Invalid usage of Function!');
    const [condition, errorMessage = ' '] = d.unpack(d.unpacked).splits;
    const bool = d.util.checkCondition(condition);
    if (!bool) {
        d.error(errorMessage);
        d.errorWasClient = true;
    }
    return '';
}
exports.default = Main;
//# sourceMappingURL=onlyIf.js.map