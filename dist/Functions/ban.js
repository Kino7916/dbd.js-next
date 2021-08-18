"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    const guild = d.data.guild;
    if (!guild)
        return d.error("Invalid guild of Guild!");
    const [Id, reason = null] = d.unpack(d.unpacked).splits;
    return new Promise(resolve => {
        guild.members.ban(Id, { reason }).then(() => resolve('')).catch(() => resolve(d.error('Failed to issue ban for GuildMember')));
    });
}
exports.default = Main;
//# sourceMappingURL=ban.js.map