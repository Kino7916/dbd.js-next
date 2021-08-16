"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function Main(d) {
    if (!d.hasUsage())
        return d.error('Invalid usage of Function!');
    const headerName = d.unpack(d.unpacked).inside;
    delete d.axiosConfig[headerName];
    return '';
}
exports.default = Main;
//# sourceMappingURL=httpRemoveHeader.js.map