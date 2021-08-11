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
            return d.data.author.discriminator;
        }
        const Id = `${BigInt(d.unpack(d.unpacked).inside)}`;
        const User = yield d.util.getUser(d.data.client, Id);
        if (!User)
            return d.error('Invalid User of User Id!');
        return User.discriminator;
    });
}
export default Main;
//# sourceMappingURL=discriminator.js.map