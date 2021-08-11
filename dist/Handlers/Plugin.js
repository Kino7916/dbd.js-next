import { FunctionList } from '../Compiler/FunctionList';
export var CompilerPlugin;
(function (CompilerPlugin) {
    /** A Rule that allows manager to overwrites an existing built-in function if plugin's identifier are equal */
    CompilerPlugin.overwriteNative = false;
    CompilerPlugin.registeredPlugins = [];
    /** A class Instance of CompilerPlugin for managing available Plugins*/
    class PluginManager extends Map {
        add(...Plugins) {
            for (const plugin of Plugins) {
                if (!CompilerPlugin.overwriteNative && FunctionList["$" + plugin.identifier]) {
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
                if (!CompilerPlugin.overwriteNative && FunctionList["$" + plugin.identifier]) {
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
    CompilerPlugin.manager = new PluginManager();
})(CompilerPlugin || (CompilerPlugin = {}));
//# sourceMappingURL=Plugin.js.map