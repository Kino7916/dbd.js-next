/**
 * A List of Available Functions
 *
 * Functions that are displayed are available to be used for Compiler
 */
export declare enum FunctionList {
    $addCmdReactions = "Add Reactions to Author Message;$addCmdReactions[...emoji]",
    $addReactions = "Add Reactions to Message Id;$addReactions[messageId; channelId; ...emoji]",
    $allMembersCount = "Returns the number of Members from Guilds",
    $authorAvatar = "Returns the Avatar of Author",
    $authorID = "Returns the User ID of Author",
    $botPing = "Returns the ping of Latency based from Message and Interaction",
    $channelID = "Returns the Channel ID of Channel",
    $channelType = "Returns the Channel Type of Channel ID;$channelType or $channelType[channelId]",
    $discriminator = "Returns the discriminator (#1234) of User Id;$discriminator or $discriminator[userId]",
    $divide = "Returns the division of supplied numbers;$divide[...numbers]",
    $ephemeral = "Identifies wether Interaction reply type is ephemeral",
    $membersCount = "Returns the amount of Members in Guild;$membersCount or $membersCount[guildId; presenceStatus; countBots]",
    $message = "The message which calls the Command / is a part of Event;$message, $message[arg number] or $message[</>argNumber(-argNumber)</>]",
    $multi = "Returns the multiplications of supplied numbers;$multi[...numbers]",
    $nomention = "Restricts any kind of mention in Response",
    $onlyIf = "Breaks Loop execution if supplied conditions are not met;$onlyIf[value1==/!=/>/</>=/<=value2;error message]",
    $ping = "Returns a numeric of Client Websocket Ping",
    $round = "Returns a supplied numeric expression rounded to the nearest integer;$round[number]",
    $serverIcon = "Return's the Icon URL of Guild",
    $sub = "Returns the subtractions of supplied numbers;$sub[...numbers]",
    $sum = "Returns the sumarized of supplied numbers;$sum[...numbers]",
    $truncate = "Returns the integral part of the a numeric expression, x, removing any fractional digits;$truncate[number]",
    $username = "Returns the Username of User Id;$username or $username[userId]",
    $userTag = "Returns the Tag of User Id;$userTag or $userTag[userId]"
}
