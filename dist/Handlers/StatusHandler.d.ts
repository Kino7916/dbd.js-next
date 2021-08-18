import { PresenceStatusData, ActivityType } from "discord.js";
import { Command } from "./Managers";
import Main from '../Main/Main';
import { Collection } from "./Util";
export interface Status {
    name: string;
    type: ActivityType;
    url: string;
    Lifetime: 10 | number;
    status: PresenceStatusData;
    compile: (command: Command, data: any) => Promise<string>;
}
/**
 *
 * @param Activities
 * @param This
 */
declare function StatusHandler(Activities: Collection<string, Status>, This: Main): void;
export default StatusHandler;
