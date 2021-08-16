"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function Main(d) {
    if (!d.hasUsage()) {
        return d.data.author?.tag;
    }
    const Id = `${BigInt(d.unpack(d.unpacked).inside)}`;
    const User = await d.util.getUser(d.data.client, Id);
    if (!User)
        return d.error('Invalid User of User Id!');
    return User.tag;
}
exports.default = Main;
//# sourceMappingURL=userTag.js.map