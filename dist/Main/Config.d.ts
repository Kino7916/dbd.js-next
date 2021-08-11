import * as Discord from 'discord.js';
import { Command, ClientOptions } from './Main';
declare class Config {
    _Statuses: Discord.Collection<string, any>;
    _Options: ClientOptions;
    _ClientOptions: Discord.ClientOptions;
    _Commands: Discord.Collection<string, Command>;
    _CommandPrefix: string[];
    _firstModified: boolean;
    _isSensitive: boolean;
    get CaseSensitiveTrigger(): boolean;
    set CaseSensitiveTrigger(value: boolean);
    get Statuses(): Discord.Collection<string, any>;
    set Statuses(value: Discord.Collection<string, any>);
    get Options(): ClientOptions;
    set Options(value: ClientOptions);
    get ClientOptions(): Discord.ClientOptions;
    set ClientOptions(value: Discord.ClientOptions);
    get Commands(): Discord.Collection<string, Command>;
    set Commands(value: Discord.Collection<string, Command>);
    get CommandPrefix(): string[];
    set CommandPrefix(value: string[]);
    checkUpAsModified(): boolean;
}
declare const _default: Config;
export default _default;
