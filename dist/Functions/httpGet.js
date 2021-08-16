"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
async function Main(d) {
    if (!d.hasUsage())
        return d.error('Invalid usage of Function!');
    const url = d.unpack(d.unpacked).inside;
    const result = await axios_1.default.get(url, d.axiosConfig).catch(err => err.response);
    d.httpResult = result;
    return '';
}
exports.default = Main;
//# sourceMappingURL=httpGet.js.map