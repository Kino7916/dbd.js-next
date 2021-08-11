"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.Types = exports.Plugin = exports.Bot = exports.Util = void 0;
var Util_1 = require("./Handlers/Util");
exports.Util = Util_1.default;
var Main_1 = require("./Main/Main");
exports.Bot = Main_1.default;
var Plugin_1 = require("./Handlers/Plugin");
Object.defineProperty(exports, "Plugin", { enumerable: true, get: function () { return Plugin_1.CompilerPlugin; } });
var Config_1 = require("./Main/Config");
exports.Config = Config_1.default;
var ALPHA_TYPES_1 = require("./Main/ALPHA_TYPES");
Object.defineProperty(exports, "Types", { enumerable: true, get: function () { return ALPHA_TYPES_1.Alpha_Types; } });
//# sourceMappingURL=index.js.map