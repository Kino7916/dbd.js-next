"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function Main(d) {
    if (!d.hasUsage()) {
        return d.data.channel.type.toLowerCase();
    }
    const Id = `${BigInt(d.unpack(d.unpacked).inside)}`;
    const Channel = await d.util.getChannel(d.data.client, Id);
    if (!Channel)
        return d.error('Invalid Channel of Channel Id!');
    return Channel.type.toLowerCase();
}
exports.default = Main;
//# sourceMappingURL=channelType.js.map