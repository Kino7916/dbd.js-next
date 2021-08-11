const dbd = require("./dist");
const manager = dbd.Util.createShardingManager('BotTest.js', 'Token');
manager.spawn({
    amount: 2
})