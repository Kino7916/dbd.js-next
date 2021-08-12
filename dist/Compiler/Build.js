"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var Util_1 = require("../Handlers/Util");
var Plugin_1 = require("../Handlers/Plugin");
function build(d, _) {
    return __awaiter(this, void 0, void 0, function () {
        function walk(data) {
            return __awaiter(this, void 0, void 0, function () {
                var code, _loop_1, _i, _a, v, state_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            code = data.code;
                            _loop_1 = function (v) {
                                var F, V, isPlugin, File_1, _c, output;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            if (InstanceData.errorMessage)
                                                return [2 /*return*/, "break"];
                                            F = v.shift();
                                            V = v.shift();
                                            isPlugin = Plugin_1.CompilerPlugin.manager.array().find(function (f) { return f.identifier === F; });
                                            File_1 = isPlugin ? isPlugin.callback : Util_1.default.requireModule("../Functions/" + F.slice(1) + ".js");
                                            // Replace function to correct lowercase and uppercase
                                            code = code.replace(new RegExp("\\" + F, "i"), F);
                                            if (!((isPlugin === null || isPlugin === void 0 ? void 0 : isPlugin.compileUnpacked) === true || V)) return [3 /*break*/, 2];
                                            _c = InstanceData;
                                            return [4 /*yield*/, walk(V)];
                                        case 1:
                                            _c.unpacked = _d.sent();
                                            code = code.replace(F + "[", F + InstanceData.unpacked);
                                            _d.label = 2;
                                        case 2:
                                            if (InstanceData.errorMessage)
                                                return [2 /*return*/, "break"];
                                            output = File_1(InstanceData);
                                            if (!(output && typeof output.then === "function")) return [3 /*break*/, 4];
                                            return [4 /*yield*/, output];
                                        case 3:
                                            output = _d.sent();
                                            _d.label = 4;
                                        case 4:
                                            if (InstanceData.wasUnpacked)
                                                F = F + InstanceData.unpacked;
                                            code = code.replace(F, String(output || (typeof output !== "string" ? F : "")));
                                            InstanceData.unpacked = "";
                                            InstanceData.wasUnpacked = false;
                                            if (InstanceData.errorMessage instanceof Error) {
                                                if (!InstanceData.errorWasClient)
                                                    InstanceData.errorMessage.message = "```js\n" + F + " Compiler ran to " + InstanceData.errorMessage.stack.replace("Script._compile", "ScriptCodeCompiler") + "```";
                                                return [2 /*return*/, "break"];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            _i = 0, _a = data.functions;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            v = _a[_i];
                            return [5 /*yield**/, _loop_1(v)];
                        case 2:
                            state_1 = _b.sent();
                            if (state_1 === "break")
                                return [3 /*break*/, 4];
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, code];
                    }
                });
            });
        }
        var InstanceData;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    InstanceData = {
                        start: Date.now(),
                        httpResult: null,
                        ignoreErrors: false,
                        errorMessage: null,
                        suppressed: null,
                        suppressedMessage: ["", {}],
                        splits: [],
                        code: "",
                        data: __assign({ returnCode: false, variables: {} }, _),
                        strictErrors: false,
                        sendOptions: {},
                        unpacked: "",
                        embeds: [],
                        wasUnpacked: false,
                        unpack: function (string) {
                            if (string.length)
                                this.wasUnpacked = true;
                            return {
                                total: string,
                                inside: string.slice(1, string.length - 1),
                                splits: string.slice(1, string.length - 1).split(/[;]/g)
                            };
                        },
                        createEmbed: function () {
                            this.embeds.push(new discord_js_1.MessageEmbed());
                        },
                        getEmbed: function () {
                            var embed = this.embeds.reverse()[0];
                            return embed;
                        },
                        hasUsage: function () {
                            if (this.unpacked)
                                return true;
                            return false;
                        },
                        error: function (error, onlyIfStrict) {
                            var errorMessage = new Error(error);
                            if (this.ignoreErrors)
                                return;
                            if (onlyIfStrict && this.strictErrors) {
                                this.errorMessage = errorMessage;
                                return;
                            }
                            this.errorMessage = errorMessage;
                        },
                        util: Util_1.default,
                        errorWasClient: false,
                        useEphemeral: false
                    };
                    _a = {};
                    return [4 /*yield*/, walk(d)];
                case 1: return [2 /*return*/, (_a.result = _b.sent(), _a.leftover = InstanceData, _a)];
            }
        });
    });
}
module.exports = build;
//# sourceMappingURL=Build.js.map