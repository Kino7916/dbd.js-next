import { DMChannel, TextChannel, NewsChannel, MessageOptions } from "discord.js";
import { InstanceData } from "./Build";
declare function resolveMessage(channel: DMChannel | TextChannel | NewsChannel, options: MessageOptions, instancedata: InstanceData): TypeError | Promise<void | import("discord.js").Message>;
export default resolveMessage;
