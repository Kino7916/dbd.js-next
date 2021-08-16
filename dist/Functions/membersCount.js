"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function Main(d) {
    if (!d.hasUsage()) {
        if (d.data.guild) {
            if (!d.data.guild.available) {
                const _bigint = `${BigInt(d.data.guild.id)}`;
                const guild = await d.util.getGuild(d.data.client, _bigint)
                    .catch(err => null);
                if (!guild)
                    return '';
                return guild.memberCount;
            }
            else {
                return d.data.guild.memberCount;
            }
        }
        else {
            return '';
        }
    }
    const [id, presence = 'all', countBots = "yes"] = d.unpack(d.unpacked).splits;
    const Id = `${BigInt(id)}`;
    const Guild = await d.util.getGuild(d.data.client, Id);
    //.catch(err => null);
    if (!Guild || !Guild.available)
        return '';
    const Members = Array.from((await Guild.members.fetch()).values());
    return Members
        .filter(member => (countBots === "yes" ||
        member.user.bot === false) && (presence.toLowerCase() === "all" ||
        member.presence.status === presence.toLowerCase())).length;
}
exports.default = Main;
//# sourceMappingURL=membersCount.js.map