"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function Main(d) {
    if (!d.hasUsage()) {
        return d.data.guild?.bannerURL?.({ size: 2048 });
    }
    const guildId = d.unpack(d.unpacked).inside;
    const _bigint = `${BigInt(guildId)}`;
    const guild = await d.util.getGuild(d.data.client, _bigint);
    if (!guild)
        return d.error('Invalid Guild of Guild Id!');
    return guild?.bannerURL?.({ size: 2048 });
}
exports.default = Main;
//# sourceMappingURL=serverBanner.js.map