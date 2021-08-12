"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("../Main/Main");
var Config_1 = require("../Main/Config");
function Main(message) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    if (Config_1.default.Options.ignoreDMs && ((_a = message === null || message === void 0 ? void 0 : message.channel) === null || _a === void 0 ? void 0 : _a.type) === "DM")
        return;
    if (Config_1.default.Options.ignoreBots && ((_b = message === null || message === void 0 ? void 0 : message.author) === null || _b === void 0 ? void 0 : _b.bot) === true) {
        if (((_c = message === null || message === void 0 ? void 0 : message.author) === null || _c === void 0 ? void 0 : _c.id) !== ((_e = (_d = message === null || message === void 0 ? void 0 : message.client) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.id))
            return;
    }
    if (Config_1.default.Options.ignoreMe && ((_f = message === null || message === void 0 ? void 0 : message.author) === null || _f === void 0 ? void 0 : _f.id) === ((_h = (_g = message === null || message === void 0 ? void 0 : message.client) === null || _g === void 0 ? void 0 : _g.user) === null || _h === void 0 ? void 0 : _h.id))
        return;
    var commands = Array.from(Config_1.default.Commands.entries()).filter(function (_a) {
        var key = _a[0], _ = _a[1];
        return key.startsWith('C-messageDelete');
    }).map(function (f) { return f[1]; });
    var client = message.client;
    var args = (_o = (_m = (_l = (_k = (_j = message === null || message === void 0 ? void 0 : message.content) === null || _j === void 0 ? void 0 : _j.trim) === null || _k === void 0 ? void 0 : _k.call(_j)) === null || _l === void 0 ? void 0 : _l.split) === null || _m === void 0 ? void 0 : _m.call(_l, / +/g)) !== null && _o !== void 0 ? _o : [];
    for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
        var command = commands_1[_i];
        Main_1.default._compile(command, {
            bot: client.dbdjsProgram,
            client: client,
            message: message,
            args: args,
            member: message.member,
            channel: message.channel,
            guild: message.guild,
            author: message.author
        });
    }
}
exports.default = Main;
//# sourceMappingURL=messageDelete.js.map