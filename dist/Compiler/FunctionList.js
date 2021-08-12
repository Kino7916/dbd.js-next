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
    FunctionList["$authorAvatar"] = "Returns the Avatar of Author";
    FunctionList["$authorID"] = "Returns the User ID of Author";
    FunctionList["$botPing"] = "Returns the ping of Latency based from Message and Interaction";
    FunctionList["$channelID"] = "Returns the Channel ID of Channel";
    FunctionList["$channelType"] = "Returns the Channel Type of Channel ID;$channelType or $channelType[channelId]";
    FunctionList["$color"] = "Set the color of an Embed;$color[Color/Hex]";
    FunctionList["$description"] = "Set the description of an Embed;$description[text]";
    FunctionList["$discriminator"] = "Returns the discriminator (#1234) of User Id;$discriminator or $discriminator[userId]";
    FunctionList["$divide"] = "Returns the division of supplied numbers;$divide[...numbers]";
    FunctionList["$ephemeral"] = "Identifies wether Interaction reply type is ephemeral";
    FunctionList["$footer"] = "Set the footer of an Embed;$footer[text; iconURL (optional)]";
    FunctionList["$footerIcon"] = "Set the footer icon of an Embed;$footerIcon[iconURL]";
    FunctionList["$image"] = "Set the Image of an Embed;$image[imageURL]";
    FunctionList["$membersCount"] = "Returns the amount of Members in Guild;$membersCount or $membersCount[guildId; presenceStatus; countBots]";
    FunctionList["$mentioned"] = "Returns the mentioned User Id of mention number;$mentioned[number]";
    FunctionList["$mentionedRoles"] = "Returns the mentioned Role Id of mention number;$mentionedRoles[number]";
    FunctionList["$mentionedChannels"] = "Returns the mentioned Channel Id of mention number;$mentionedChannels[number]";
    FunctionList["$message"] = "The message which calls the Command / is a part of Event;$message, $message[arg number] or $message[</>argNumber(-argNumber)</>]";
    FunctionList["$multi"] = "Returns the multiplications of supplied numbers;$multi[...numbers]";
    FunctionList["$nomention"] = "Restricts any kind of mention in Response";
    FunctionList["$onlyIf"] = "Breaks Loop execution if supplied conditions are not met;$onlyIf[value1==/!=/>/</>=/<=value2;error message]";
    FunctionList["$ping"] = "Returns a numeric of Client Websocket Ping";
    FunctionList["$repliedUser"] = "Returns the Replied User Id in Message";
    FunctionList["$round"] = "Returns a supplied numeric expression rounded to the nearest integer;$round[number]";
    FunctionList["$serverIcon"] = "Return's the Icon URL of Guild";
    FunctionList["$sub"] = "Returns the subtractions of supplied numbers;$sub[...numbers]";
    FunctionList["$sum"] = "Returns the sumarized of supplied numbers;$sum[...numbers]";
    FunctionList["$thumbnail"] = "Set the Thumbnail of an Embed;$thumbnail[imageURL]";
    FunctionList["$title"] = "Set the Title of an Embed;$title[text]";
    FunctionList["$truncate"] = "Returns the integral part of the a numeric expression, x, removing any fractional digits;$truncate[number]";
    FunctionList["$userAvatar"] = "Returns the User Avatar of User Id;$userAvatar or $userAvatar[userId]";
    FunctionList["$username"] = "Returns the Username of User Id;$username or $username[userId]";
    FunctionList["$userTag"] = "Returns the Tag of User Id;$userTag or $userTag[userId]";
})(FunctionList = exports.FunctionList || (exports.FunctionList = {}));
//# sourceMappingURL=FunctionList.js.map