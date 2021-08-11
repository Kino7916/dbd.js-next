"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error('Invalid usage of Function!');
    if (!d.data.message)
        return d.error('Unexpected object Message of \'null\'!');
    var message = d.data.message;
    var emojis = d.unpack(d.unpacked).splits;
    for (var _i = 0, emojis_1 = emojis; _i < emojis_1.length; _i++) {
        var emoji = emojis_1[_i];
        message.react(emoji);
    }
    return '';
}
exports.default = Main;
//# sourceMappingURL=addCmdReactions.js.map