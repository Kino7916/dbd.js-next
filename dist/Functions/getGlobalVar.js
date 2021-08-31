"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
async function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const [key, id = d.data.author?.id] = d.unpack(d.unpacked).splits;
    if (!key)
        return d.error("Supplied arguments must be a non-empty value");
    const db = d.data.bot.database;
    const p = await new Promise(resolve => {
        db.get(`${key}`, async (error, data) => {
            if (error) {
                resolve(error);
            }
            else {
                resolve(data);
            }
        });
    });
    if (p?.message && p instanceof Error) {
        __1.Debugger.log(p?.message, __1.Debugger.FLAGS.UNEXPECTED);
        return d.error('Unexpected error from database');
    }
    return p;
}
exports.default = Main;
//# sourceMappingURL=getGlobalVar.js.map