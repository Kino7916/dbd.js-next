var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DMChannel, NewsChannel, TextChannel } from "discord.js";
function Main(d) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if (!d.hasUsage())
            return d.error('Invalid usage of Function!');
        const [messageId = (_a = d.data.message) === null || _a === void 0 ? void 0 : _a.id, channelId = (_b = d.data.channel) === null || _b === void 0 ? void 0 : _b.id, ...emojis] = d.unpack(d.unpacked).splits;
        if (!messageId)
            return d.error('Expecting Message Id as param1!');
        if (((_c = d.data.message) === null || _c === void 0 ? void 0 : _c.id) === messageId) {
            const message = d.data.message;
            for (const emoji of emojis)
                message.react(emoji);
            return '';
        }
        if (!channelId)
            return d.error('Expecting Channel Id as param2!');
        const _bigInt1 = `${BigInt(Number(messageId))}`;
        const _bigInt2 = `${BigInt(Number(channelId))}`;
        const Channel = yield d.util.getChannel(d.data.client, _bigInt2)
            .catch(err => null);
        if (Channel instanceof TextChannel ||
            Channel instanceof DMChannel ||
            Channel instanceof NewsChannel) {
            const message = Channel.messages.cache.get(_bigInt1);
            if (!message) {
                const _message2 = yield Channel.messages.fetch(_bigInt1);
                if (!_message2)
                    return d.error('Message Source of Id is invalid!');
                for (const emoji of emojis)
                    _message2.react(emoji);
                return '';
            }
            else {
                for (const emoji of emojis)
                    message.react(emoji);
                return '';
            }
        }
        else
            return d.error('Invalid Channel of Channel Id!');
    });
}
export default Main;
//# sourceMappingURL=addReactions.js.map