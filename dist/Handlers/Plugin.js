"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompilerPlugin = void 0;
const FunctionList_1 = require("../Compiler/FunctionList");
var CompilerPlugin;
(function (CompilerPlugin) {
    /** A Rule that allows manager to overwrites an existing built-in function if plugin's identifier are equal */
    CompilerPlugin.overwriteNative = false;
    CompilerPlugin.registeredPlugins = [];
    /** A class Instance of CompilerPlugin for managing available Plugins*/
    class PluginManager extends Map {
        static createInstance(array) {
            var inst = new Map(array);
            inst['__proto__'] = PluginManager.prototype;
            return inst;
        }
        add(...Plugins) {
            for (const plugin of Plugins) {
                if (!CompilerPlugin.overwriteNative && FunctionList_1.FunctionList["$" + plugin.identifier]) {
                    console.error('Overwriting Built-In Functions are not allowed, you can change this rule by changing \'CompilerPlugin.overwriteNative\' and set as \'true\'');
                    break;
                }
                plugin.identifier = "$" + plugin.identifier;
                this.set(plugin.identifier, plugin);
            }
            ;
        }
        push(...Plugins) {
            for (const plugin of Plugins) {
                if (!CompilerPlugin.overwriteNative && FunctionList_1.FunctionList["$" + plugin.identifier]) {
                    console.error('Overwriting Built-In Functions are not allowed, you can change this rule by changing \'CompilerPlugin.overwriteNative\' and set as \'true\'');
                    break;
                }
                plugin.identifier = "$" + plugin.identifier;
                this.set(plugin.identifier, plugin);
            }
            ;
        }
        array() {
            return Array.from(this.values());
        }
    }
    CompilerPlugin.PluginManager = PluginManager;
    CompilerPlugin.manager = PluginManager.createInstance();
})(CompilerPlugin = exports.CompilerPlugin || (exports.CompilerPlugin = {}));
//# sourceMappingURL=Plugin.js.map