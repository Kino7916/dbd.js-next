"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Debugger_1 = require("../Handlers/Debugger");
function resolveMessage(channel, options, instancedata) {
    if (!channel || typeof channel.send !== "function")
        return new TypeError();
    if (instancedata.editMessage) {
        const m = instancedata.editMessage;
        m.edit({
            content: m.content || undefined,
            embeds: m.embeds,
            components: m.components
        });
    }
    return channel.send({ ...options }).catch(err => Debugger_1.default.log(err.message, Debugger_1.default.FLAGS.ERROR));
}
exports.default = resolveMessage;
//# sourceMappingURL=resolveMessage.js.map