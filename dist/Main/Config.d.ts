import { ClientOptions as DiscordClientOptions } from 'discord.js';
import { Command, ClientOptions } from './Main';
import { Status } from '../Handlers/StatusHandler';
import { Collection } from '../Handlers/Util';
declare namespace C {
    const Statuses: Collection<string, Status>;
    const Commands: Collection<string, Command>;
    var ClientOptions: DiscordClientOptions;
    var CommandPrefix: string[];
    var Options: ClientOptions;
    var CaseSensitiveTrigger: boolean;
    function checkUpAsModified(): boolean;
}
export default C;
