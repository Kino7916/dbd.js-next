"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function Main(d) {
    if (!d.hasUsage())
        return d.error('Invalid usage of Function!');
    const [headerName, value] = d.unpack(d.unpacked).splits;
    const n = Number(value);
    if (isNaN(n)) {
        d.axiosConfig[headerName] = value;
    }
    else {
        d.axiosConfig[headerName] = n;
    }
    return '';
}
exports.default = Main;
//# sourceMappingURL=httpAddHeader.js.map