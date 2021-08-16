"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
async function Main(d) {
    if (!d.hasUsage())
        return d.error('Invalid usage of Function!');
    const [url, body] = d.unpack(d.unpacked).splits;
    const result = await axios_1.default.patch(url, body, d.axiosConfig).catch(err => err.response);
    d.httpResult = result;
    return '';
}
exports.default = Main;
//# sourceMappingURL=httpPatch.js.map