"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionList = void 0;
/**
 * A List of Available Functions
 *
 * Functions that are displayed are available to be used for Compiler
 */
var FunctionList;
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
})(FunctionList = exports.FunctionList || (exports.FunctionList = {}));
//# sourceMappingURL=FunctionList.js.map