"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error('Invalid usage of Function!');
    const data = d.unpack(d.unpacked).inside;
    if (isNaN(Number(data)))
        return true;
    return false;
}
exports.default = Main;
//# sourceMappingURL=isNaN.js.map