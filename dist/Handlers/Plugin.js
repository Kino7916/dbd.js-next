"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompilerPlugin = void 0;
var FunctionList_1 = require("../Compiler/FunctionList");
var CompilerPlugin;
(function (CompilerPlugin) {
    /** A Rule that allows manager to overwrites an existing built-in function if plugin's identifier are equal */
    CompilerPlugin.overwriteNative = false;
    CompilerPlugin.registeredPlugins = [];
    /** A class Instance of CompilerPlugin for managing available Plugins*/
    var PluginManager = /** @class */ (function (_super) {
        __extends(PluginManager, _super);
        function PluginManager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PluginManager.createInstance = function (array) {
            var inst = new Map(array);
            inst['__proto__'] = PluginManager.prototype;
            return inst;
        };
        PluginManager.prototype.add = function () {
            var Plugins = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                Plugins[_i] = arguments[_i];
            }
            for (var _a = 0, Plugins_1 = Plugins; _a < Plugins_1.length; _a++) {
                var plugin = Plugins_1[_a];
                if (!CompilerPlugin.overwriteNative && FunctionList_1.FunctionList["$" + plugin.identifier]) {
                    console.error('Overwriting Built-In Functions are not allowed, you can change this rule by changing \'CompilerPlugin.overwriteNative\' and set as \'true\'');
                    break;
                }
                plugin.identifier = "$" + plugin.identifier;
                this.set(plugin.identifier, plugin);
            }
            ;
        };
        PluginManager.prototype.push = function () {
            var Plugins = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                Plugins[_i] = arguments[_i];
            }
            for (var _a = 0, Plugins_2 = Plugins; _a < Plugins_2.length; _a++) {
                var plugin = Plugins_2[_a];
                if (!CompilerPlugin.overwriteNative && FunctionList_1.FunctionList["$" + plugin.identifier]) {
                    console.error('Overwriting Built-In Functions are not allowed, you can change this rule by changing \'CompilerPlugin.overwriteNative\' and set as \'true\'');
                    break;
                }
                plugin.identifier = "$" + plugin.identifier;
                this.set(plugin.identifier, plugin);
            }
            ;
        };
        PluginManager.prototype.array = function () {
            return Array.from(this.values());
        };
        return PluginManager;
    }(Map));
    CompilerPlugin.PluginManager = PluginManager;
    CompilerPlugin.manager = PluginManager.createInstance();
})(CompilerPlugin = exports.CompilerPlugin || (exports.CompilerPlugin = {}));
//# sourceMappingURL=Plugin.js.map