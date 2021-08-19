import { RecursiveReadonlyArray } from "discord.js";
export declare enum Alpha_Types {
    Message = "messageCreate",
    MemberJoin = "guildMemberAdd",
    MemberLeave = "guildMemberRemove",
    MessageDelete = "messageDelete",
    Ready = "ready",
    InteractionCreate = "interactionCreate",
    BotJoinGuild = "guildCreate",
    BotLeaveGuild = "guildDelete"
}
export declare type Events = "messageCreate" | "guildMemberAdd" | "guildMemberRemove" | "messageDelete" | "ready" | "interactionCreate" | "guildCreate" | "guildDelete";
export declare type EventResolvable<T> = RecursiveReadonlyArray<T> | T;
