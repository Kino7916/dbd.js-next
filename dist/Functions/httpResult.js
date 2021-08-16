"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage()) {
        return JSON.stringify(d.httpResult ?? 'undefined');
    }
    const json_paths = d.unpack(d.unpacked).splits;
    let response = d.httpResult;
    if (!response)
        return undefined;
    for (const path of json_paths) {
        response = response[path];
        if (!response)
            break;
    }
    if (typeof response !== "string" || typeof response !== "number" || response) {
        response = JSON.stringify(response);
    }
    return response;
}
exports.default = Main;
//# sourceMappingURL=httpResult.js.map