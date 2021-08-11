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
            return d.data.channel.type.toLowerCase();
        }
        const Id = `${BigInt(d.unpack(d.unpacked).inside)}`;
        const Channel = yield d.util.getChannel(d.data.client, Id);
        if (!Channel)
            return d.error('Invalid Channel of Channel Id!');
        return Channel.type.toLowerCase();
    });
}
export default Main;
//# sourceMappingURL=channelType.js.map