import { DMChannel, TextChannel, NewsChannel } from "discord.js";
declare function resolveMessage(channel: DMChannel | TextChannel | NewsChannel, options?: {}): TypeError | Promise<void | import("discord.js").Message>;
export default resolveMessage;
