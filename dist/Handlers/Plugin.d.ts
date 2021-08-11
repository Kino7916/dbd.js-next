import { InstanceData } from '../Compiler/Build';
export declare namespace CompilerPlugin {
    /** A Rule that allows manager to overwrites an existing built-in function if plugin's identifier are equal */
    export var overwriteNative: boolean;
    export const registeredPlugins: string[];
    /** A data Resolvable that allows to make custom Functions for dbd.js Compiler */
    interface PluginResolvable {
        /** A string that will represents the Function */
        identifier: string;
        /** Identifies wether Function Usage should be compiled */
        compileUnpacked: boolean;
        /** A callback that will return as a response from function */
        callback: (data: InstanceData) => any;
    }
    /** A class Instance of CompilerPlugin for managing available Plugins*/
    export class PluginManager extends Map<string, PluginResolvable> {
        static createInstance(array?: readonly (readonly [string, PluginResolvable])[]): PluginManager;
        add(...Plugins: PluginResolvable[]): void;
        push(...Plugins: PluginResolvable[]): void;
        array(): PluginResolvable[];
    }
    export const manager: PluginManager;
    export {};
}
