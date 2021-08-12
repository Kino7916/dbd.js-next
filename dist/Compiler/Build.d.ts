import { MessageEmbed, MessageOptions, Message, Interaction, User, GuildMember, Guild, TextChannel, DMChannel, Client } from 'discord.js';
import util from '../Handlers/Util';
import { Command } from '../Main/Main';
export interface UnpackInformation {
    total: string;
    inside: string;
    splits: string[];
}
export interface InstanceDataExtra {
    author?: User;
    member?: GuildMember;
    message?: Message;
    guild?: Guild;
    channel?: DMChannel | TextChannel;
    interaction?: Interaction;
    client: Client;
    bot: any;
    returnCode: boolean;
    command: Command;
    variables: any;
}
export interface InstanceData {
    start: number;
    httpResult: any;
    ignoreErrors: boolean;
    errorMessage: Error | null;
    suppressed: Error | null;
    suppressedMessage: [string, any];
    splits: string[];
    code: string;
    data: InstanceDataExtra;
    strictErrors: boolean;
    sendOptions: MessageOptions;
    unpacked: string;
    embeds: MessageEmbed[];
    errorWasClient: boolean;
    wasUnpacked: boolean;
    util: typeof util;
    useEphemeral: boolean;
    unpack: (string: string) => UnpackInformation;
    createEmbed: () => void;
    getEmbed: () => MessageEmbed;
    hasUsage: () => boolean;
    error: (error: string, onlyIfStrict?: boolean) => void;
}
