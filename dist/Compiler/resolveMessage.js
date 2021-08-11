"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function resolveMessage(channel, options) {
    if (options === void 0) { options = {}; }
    if (typeof channel.send !== "function")
        return new TypeError();
    return channel.send(__assign({}, options)).catch(function (err) { return console.log(err); });
}
exports.default = resolveMessage;
//# sourceMappingURL=resolveMessage.js.map