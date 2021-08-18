import { MessageEmbed, MessageOptions, Message, ButtonInteraction, CommandInteraction, MessageComponentInteraction, SelectMenuInteraction, User, GuildMember, Guild, TextChannel, DMChannel, Client, NewsChannel } from 'discord.js';
import { InterpreterResult } from './Interpreter';
import util from '../Handlers/Util';
import { Command } from '../Handlers/Managers';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
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
    channel?: DMChannel | TextChannel | NewsChannel;
    interaction?: ButtonInteraction | CommandInteraction | SelectMenuInteraction | MessageComponentInteraction;
    client: Client;
    bot: any;
    returnCode: boolean;
    command: Command;
    variables: any;
}
export interface InstanceData {
    start: number;
    httpResult: AxiosResponse;
    onlyEdit?: boolean;
    editMessage?: Message;
    axiosConfig: AxiosRequestConfig;
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
    getEmbed: (index?: number) => MessageEmbed;
    hasUsage: () => boolean;
    error: (error: string, onlyIfStrict?: boolean) => void;
}
declare function build(d: InterpreterResult, _: any): Promise<{
    result: any;
    leftover: InstanceData;
}>;
export default build;
