![Development Team](https://cdn.discordapp.com/banners/773352845738115102/dda8de5075c9e54067feca72bf38546e.png?size=4096)

# dbd.js
 Imagine a bot, but in a simple and easy way to accomplish one.

## About
Making a bot, like a Discord Bot to moderate your Servers automatically and as a help utility. 

These experienced developers can accomplish this features easily, but for those with no experience and seek for the best wouldn't take the word `easy`.

This package allows you to make your dreams features for your Discord Bot to be easily approached, no need for Programming Experiences, only syntax and the basic's of the basic plain JavaScript.

We serve developers ready-to-use Functions with a minimum amount of resources, it's framework [discord.js](https://github.com/discordjs/discord.js) is known well and it's programming implementations are handled by us.

# Changelog
- Added Embeds Functions
- Added Interaction support Functions
- Added `reverseReading` for Bot Options

# Examples
As we said, the hard way are handled by us, and you do the easy way.

## Installation
Installing is just an easy step, *just follow the procedures*.

You will require some Softwares and a *[NodeJS](https://nodejs.org)* before installing the package. 

You will need to install:

- [NodeJS](https://nodejs.org) Latest Features
- A Code Editor, Visual Studio Code as example

After done doing so, open up your terminal and follow these:

```
npm init -y
npm install dbd.js
```
Installing globally isn't necessary, but if you want, add a `-g` flag in your command line.
```
npm install -g dbd.js
```
## Setup
```js
/*
 First we initialize the package first, 'require' allows us to collect modules from other Files and Packages.

 We will use this to extract the package known as 'dbd.js'
 */
const dbd = require("dbd.js");
/*
 We initialize the bot client here
*/
const bot = new dbd.Bot({
    // Intents are required to collect data from Discord API
    // We can specify what intents we need for your bot functionallity's
    intents: ["GUILD", "GUILD_MESSAGES"],
    // Prefix are to identify if created messages are a Command
    prefix: "!"
});

// Enabling Events to listen for emitted events
bot.enableEvents('messageCreate');
// After enabling events,
// We register commands for them to execute when the event is emitted
bot.registerCommand(
    // We specificy the event
    'messageCreate',
    // And we add a command to run
    {
        // A name is needed to identify what command will be triggered
        name: 'ping',
        // Here we write the codes, and remember, you can use our Ready-to-use Functions
        code: "Pong, $pingms!"
    }
);

// Login your Project with a Discord Bot Token for the Project to be able to interact with your Bot
bot.login("TOKEN");
```

## Code Functions
We coded an Interpreting system which reacts on specific written words in the `code` key, we call them *`Functions`*, these *`Functions`* are a compacted JavaScript Functions and they do exactly based on their nicknames.

These *`Functions`* are in a format of an Identifier and Function Nickname, `$` as an identifier. These can return values, wether it calculates numbers or work as an If Conditions.

From these *`Functions`*, we can write an embed
```js
`$title[Hello!]
$description[My name is Matthew!
I can help building and moderate your server.
I also have a friend that can manage your Server Economy's, her name's Liz.]
$color[GREEN]`
```

# Package API
## Bot
An class that creates a discord.js Client
- `clientOptions`
    - `useInternalSharding` - Sharding the bot in one process
    - `shardCount` - The amount of shards would Internal Sharding use
    - `danbotHostingKey` - A key for danbot Hosting
    - `mobilePresence` - Changes client presence to use iOS
    - `ignoreDMs` - Ignores any created or deleted messages in Direct Messages
    - `ignoreMe` - Ignores any created or deleted messages by the Client itself
    - `ignoreBots` - Ignores any created or deleted messages by other Discord Bots
    - `intents` - Discord Intents to access and retrieve data from Discord Gateway
    - `prefix` - Identifiers for command triggers at the beginning of message content
    - `cache` - Manages the cache by `discord.js` framework
    - `reverseReading` - Changes interpreter reading principles, `from Top to Bottom` reading to `from Bottom to Top`
## Bot.enableEvents
Listens and register Events to Client
- `...Events` - Events that are currently available for use
    - `messageCreate` - An event listens to created messages
    - `messageDelete` - An event listens to deleted messages
    - `guildMemberAdd` - An event listens to new Guild Members
    - `guildMemberRemove` - An event listens to removed Guild Members
    - `interactionCreate` - An event listens to created interactions by User's Client's
## Bot.registerCommands
Registers commands and executes on event
- `Event` - The event that are listening to
- `...Commands` - Commands that want to be registered to a specific Event
## Bot.login
Logins the Client to Discord API and Gateway
- `Token` - A string of Discord Bot Token

## Plugin
A namespace which handles custom functions by the manager instance
## Plugin.PluginManager
A class that handles custom functions for system
## Plugin.manager
An Instance of PluginManager that handles custom functions for system
## Plugin.overwriteNative
A rule which deny plugins that has the same identifier of an existing *built-in*.
## Plugin.manager.add
Adds custom functions to compiler
- `...PluginsResolvable[]` - A resolvable that is valid as a Custom Function for system
    - `identifier` - A nickname for Custom Function
    - `compileUnpacked` - Compiles the supplied usage for Custom Function
    - `callback` - A JavaScript callback, a param of Compiler data is provided as a Utility to interact with the Compiler. 
