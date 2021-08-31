"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
async function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const [key, value] = d.unpack(d.unpacked).splits;
    if (!key)
        return d.error("Supplied arguments must be a non-empty value");
    const db = d.data.bot.database;
    const p = await new Promise(resolve => {
        db.set(`${key}_${d.data.message.guildId}`, value, async (error) => {
            if (error) {
                resolve(error);
            }
            else {
                resolve(null);
            }
        });
    });
    if (p) {
        __1.Debugger.log(p?.message, __1.Debugger.FLAGS.UNEXPECTED);
        return d.error('Unexpected error from database');
    }
    return '';
}
exports.default = Main;
//# sourceMappingURL=setServerVar.js.map