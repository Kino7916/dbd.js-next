import { ChannelTypes } from "discord.js/typings/enums";
/**
 * A List of Available Functions
 *
 * Functions that are displayed are available to be used for Compiler
 */
export var FunctionList;
(function (FunctionList) {
    FunctionList["$addCmdReactions"] = "Add Reactions to Author Message;$addCmdReactions[...emoji]";
    FunctionList["$addReactions"] = "Add Reactions to Message Id;$addReactions[messageId; channelId; ...emoji]";
    FunctionList["$allMembersCount"] = "Returns the number of Members from Guilds";
    FunctionList["$authorID"] = "Returns the User ID of Author";
    FunctionList["$authorAvatar"] = "Returns the Avatar of Author";
    FunctionList["$botPing"] = "Returns the ping of Latency based from Message and Interaction";
    FunctionList["$channelID"] = "Returns the Channel ID of Channel";
    FunctionList["$channelType"] = "Returns the Channel Type of Channel ID;$channelType or $channelType[channelId]";
    FunctionList["$divide"] = "Returns the division of supplied numbers;$divide[...numbers]";
    FunctionList["$membersCount"] = "Returns the amount of Members in Guild;$membersCount or $membersCount[guildId; presenceStatus; countBots]";
    FunctionList["$multi"] = "Returns the multiplications of supplied numbers;$multi[...numbers]";
    FunctionList["$ping"] = "Returns a numeric of Client Websocket Ping";
    FunctionList["$round"] = "Returns a supplied numeric expression rounded to the nearest integer;$round[number]";
    FunctionList["$sub"] = "Returns the subtractions of supplied numbers;$sub[...numbers]";
    FunctionList["$sum"] = "Returns the sumarized of supplied numbers;$sum[...numbers]";
    FunctionList["$truncate"] = "Returns the integral part of the a numeric expression, x, removing any fractional digits;$truncate[number]";
    FunctionList["$username"] = "Returns the Username of User Id;$username or $username[userId]";
    FunctionList["$userTag"] = "Returns the Tag of User Id;$userTag or $userTag[userId]";
})(FunctionList || (FunctionList = {}));
export var FunctionListDetailed;
(function (FunctionListDetailed) {
    FunctionListDetailed.$addCmdReactions = {
        description: FunctionList.$addCmdReactions,
        params: [
            {
                name: "...emoji",
                type: "Iterable EmojiResolvable",
                description: "An Iterable of Resolvables as an Emoji",
                selections: ['EmojiId', 'UnicodeEmoji', 'EmojiFormat']
            }
        ],
        return: "Void"
    };
    FunctionListDetailed.$addReactions = {
        description: FunctionList.$addReactions,
        params: [
            {
                name: "messageId",
                type: "Number",
                description: "An Id represents Message Id"
            },
            {
                name: "channelId",
                type: "Number",
                description: "An Id represents Channel Id"
            },
            {
                name: "...emoji",
                type: "Iterable EmojiResolvable",
                description: "An Iterable of Resolvables as an Emoji",
                selections: ['EmojiId', 'UnicodeEmoji', 'EmojiFormat']
            }
        ],
        return: "Void"
    };
    FunctionListDetailed.$allMembersCount = {
        description: FunctionList.$allMembersCount,
        params: [],
        return: "Number"
    };
    FunctionListDetailed.$authorAvatar = {
        description: FunctionList.$authorAvatar,
        params: [],
        return: "Image URL"
    };
    FunctionListDetailed.$authorID = {
        description: FunctionList.$authorID,
        params: [],
        return: "Number"
    };
    FunctionListDetailed.$botPing = {
        description: FunctionList.$botPing,
        params: [],
        return: "Number"
    };
    FunctionListDetailed.$channelID = {
        description: FunctionList.$channelID,
        params: [],
        return: "Number"
    };
    FunctionListDetailed.$channelType = {
        description: FunctionList.$channelType,
        params: [],
        return: Object.keys(ChannelTypes)
    };
    FunctionListDetailed.$divide = {
        description: FunctionList.$divide,
        params: [
            {
                name: "...numbers",
                type: "Iterable Numbers",
                description: "An Iterable of numeric to be divisioned, separated by `;`"
            }
        ],
        return: 'Number'
    };
    FunctionListDetailed.$membersCount = {
        description: FunctionList.$membersCount,
        params: [{
                name: "guildId",
                type: "Number",
                description: "An Id represents a Guild Id"
            },
            {
                name: "presenceStatus",
                type: "PresenceStatus",
                description: "A status represents User Status",
                default: "all",
                selections: ['all', 'idle', 'offline', 'invisible', 'dnd', 'online']
            },
            {
                name: "countBots",
                type: "Boolean",
                description: "Identifies if result should also return bots",
                default: "yes",
                selections: ['yes', 'no']
            }],
        return: "Number"
    };
    FunctionListDetailed.$multi = {
        description: FunctionList.$multi,
        return: "Number",
        params: [
            {
                name: "...numbers",
                type: "Iterable Numbers",
                description: "An Iterable of numeric to be multiplied, separated by `;`"
            },
        ]
    };
    FunctionListDetailed.$ping = {
        description: "$ping",
        params: [],
        return: "Number"
    };
    FunctionListDetailed.$round = {
        description: FunctionList.$round,
        return: 'Number',
        params: [{
                name: "number",
                description: "A numeric expression string type",
                type: "Number"
            }]
    };
    FunctionListDetailed.$sub = {
        description: FunctionList.$sub,
        return: "Number",
        params: [
            {
                name: "...numbers",
                description: "An Iterable of numeric to be subtracted, separated by `;`",
                type: "Iterable Numbers"
            }
        ]
    };
    FunctionListDetailed.$sum = {
        description: FunctionList.$sum,
        return: "Number",
        params: [
            {
                name: "...numbers",
                description: "An Iterable of numeric to be sumarized, separated by `;`",
                type: "Iterable Numbers"
            }
        ]
    };
    FunctionListDetailed.$truncate = {
        description: FunctionList.$truncate,
        return: "Number",
        params: [
            {
                name: "number",
                description: "A numeric expression string type",
                type: "Number"
            }
        ]
    };
    FunctionListDetailed.$username = {
        description: FunctionList.$username,
        return: "Literal",
        params: [
            {
                name: "userId",
                description: "An Id represents User Id",
                default: "Author",
                type: "Number"
            }
        ]
    };
    FunctionListDetailed.$userTag = {
        description: FunctionList.$userTag,
        return: "Literal",
        params: [
            {
                name: "userId",
                description: "An Id represents User Id",
                default: "Author",
                type: "Number"
            }
        ]
    };
})(FunctionListDetailed || (FunctionListDetailed = {}));
//# sourceMappingURL=FunctionList.js.map