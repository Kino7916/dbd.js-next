var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function Main(d) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!d.hasUsage()) {
            if (d.data.guild) {
                if (!d.data.guild.available) {
                    const _bigint = `${BigInt(d.data.guild.id)}`;
                    const guild = yield d.util.getGuild(d.data.client, _bigint)
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
        const Guild = yield d.util.getGuild(d.data.client, Id);
        //.catch(err => null);
        if (!Guild || !Guild.available)
            return '';
        const Members = Array.from((yield Guild.members.fetch()).values());
        return Members
            .filter(member => (countBots === "yes" ||
            member.user.bot === false) && (presence.toLowerCase() === "all" ||
            member.presence.status === presence.toLowerCase())).length;
    });
}
export default Main;
//# sourceMappingURL=membersCount.js.map