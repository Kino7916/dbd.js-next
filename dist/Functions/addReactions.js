"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
function Main(d) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var _d, _e, messageId, _f, channelId, emojis, message, _i, emojis_1, emoji, _bigInt1, _bigInt2, Channel, message, _message2, _g, emojis_2, emoji, _h, emojis_3, emoji;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    if (!d.hasUsage())
                        return [2 /*return*/, d.error('Invalid usage of Function!')];
                    _d = d.unpack(d.unpacked).splits, _e = _d[0], messageId = _e === void 0 ? (_a = d.data.message) === null || _a === void 0 ? void 0 : _a.id : _e, _f = _d[1], channelId = _f === void 0 ? (_b = d.data.channel) === null || _b === void 0 ? void 0 : _b.id : _f, emojis = _d.slice(2);
                    if (!messageId)
                        return [2 /*return*/, d.error('Expecting Message Id as param1!')];
                    if (((_c = d.data.message) === null || _c === void 0 ? void 0 : _c.id) === messageId) {
                        message = d.data.message;
                        for (_i = 0, emojis_1 = emojis; _i < emojis_1.length; _i++) {
                            emoji = emojis_1[_i];
                            message.react(emoji);
                        }
                        return [2 /*return*/, ''];
                    }
                    if (!channelId)
                        return [2 /*return*/, d.error('Expecting Channel Id as param2!')];
                    _bigInt1 = "" + BigInt(Number(messageId));
                    _bigInt2 = "" + BigInt(Number(channelId));
                    return [4 /*yield*/, d.util.getChannel(d.data.client, _bigInt2)
                            .catch(function (err) { return null; })];
                case 1:
                    Channel = _j.sent();
                    if (!(Channel instanceof discord_js_1.TextChannel ||
                        Channel instanceof discord_js_1.DMChannel ||
                        Channel instanceof discord_js_1.NewsChannel)) return [3 /*break*/, 5];
                    message = Channel.messages.cache.get(_bigInt1);
                    if (!!message) return [3 /*break*/, 3];
                    return [4 /*yield*/, Channel.messages.fetch(_bigInt1)];
                case 2:
                    _message2 = _j.sent();
                    if (!_message2)
                        return [2 /*return*/, d.error('Message Source of Id is invalid!')];
                    for (_g = 0, emojis_2 = emojis; _g < emojis_2.length; _g++) {
                        emoji = emojis_2[_g];
                        _message2.react(emoji);
                    }
                    return [2 /*return*/, ''];
                case 3:
                    for (_h = 0, emojis_3 = emojis; _h < emojis_3.length; _h++) {
                        emoji = emojis_3[_h];
                        message.react(emoji);
                    }
                    return [2 /*return*/, ''];
                case 4: return [3 /*break*/, 6];
                case 5: return [2 /*return*/, d.error('Invalid Channel of Channel Id!')];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.default = Main;
//# sourceMappingURL=addReactions.js.map