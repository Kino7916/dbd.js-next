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
        const guilds = yield d.util.getGuildsCache(d.data.client);
        return guilds.reduce((acc, val) => {
            return acc += val.memberCount;
        }, 0);
    });
}
export default Main;
//# sourceMappingURL=allMembersCount.js.map