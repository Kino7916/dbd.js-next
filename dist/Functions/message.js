"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getConditional(string) {
    if (string === void 0) { string = ""; }
    var arg = [null, null];
    if (string.startsWith(">"))
        arg[0] = parseInt(string.slice(1)) + 1 || null;
    if (string.startsWith("<"))
        arg[1] = parseInt(string.slice(1)) - 1 || null;
    if (string.endsWith(">"))
        arg[0] = parseInt(string.slice(0, string.length - 1)) + 1 || null;
    if (string.endsWith("<"))
        arg[1] = parseInt(string.slice(0, string.length - 1)) - 1 || null;
    var sp = string.split("-");
    if (sp.length > 1) {
        arg[0] = parseInt(sp[0]) - 1 || null;
        arg[1] = parseInt(sp[1]) || null;
    }
    return {
        start: arg[0],
        end: arg[1] || null
    };
}
function Main(d) {
    var _a;
    if (!d.data.message)
        return d.error("Unsupported event for function", false);
    var content = (_a = d.data.message) === null || _a === void 0 ? void 0 : _a.content;
    if (!content || typeof content !== "string")
        return "";
    var args = content.trim().split(/ +/g);
    // This is the command
    // replace empty
    args[0] = ""; // args[0] = "LerefCuteUwu";
    var get = d.unpack(d.unpacked).total;
    if (!get) {
        return args.slice(1).join(" ");
    }
    if (!isNaN(Number(get.slice(1, get.length - 1)))) {
        return args[Number(get.slice(1, get.length - 1))] || "";
    }
    if (!["<", ">", "-"].find(function (v) { return get.includes(v); })) {
        if (d.strictErrors)
            d.error("No match for operator `<->`", true);
        return "";
    }
    //if not a number
    var cd = getConditional(get.slice(1, get.length - 1));
    return args.slice(1).slice(cd.start, cd.end || args.length).join(" ");
}
exports.default = Main;
//# sourceMappingURL=message.js.map