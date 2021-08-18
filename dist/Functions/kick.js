"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Main(d) {
    if (!d.hasUsage())
        return d.error("Invalid usage of Function!");
    if (!d.data.guild)
        return d.error("Invalid guild of Guild!");
    const guild = d.data.guild;
    const [Id, reason = null] = d.unpack(d.unpacked).splits;
    return new Promise(resolve => {
        guild.members.kick(Id, reason)
            .then(() => resolve(''))
            .catch(() => resolve(d.error("Failed to issue kick for GuildMember!")));
    });
}
exports.default = Main;
//# sourceMappingURL=kick.js.map