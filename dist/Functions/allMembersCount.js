"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function Main(d) {
    const guilds = await d.util.getGuildsCache(d.data.client);
    return guilds.reduce((acc, val) => {
        return acc += val.memberCount;
    }, 0);
}
exports.default = Main;
//# sourceMappingURL=allMembersCount.js.map