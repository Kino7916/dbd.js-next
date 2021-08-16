"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function Main(d) {
    if (!d.hasUsage()) {
        return d.data.member?.nickname ?? '';
    }
    if (!d.data.guild)
        return d.error('Insufficient supplied data!');
    const [memberId, nicknameTo] = d.unpack(d.unpacked).splits;
    const member = await d.data.guild.members.fetch(memberId);
    if (!member)
        return d.error("Invalid Member of Member Id!");
    if (!nicknameTo) {
        return member.nickname;
    }
    else {
        member.setNickname(nicknameTo);
        return '';
    }
}
//# sourceMappingURL=nickname.js.map