import dbh from 'danbot-hosting';
import { ShardingManager } from 'discord.js';
function connect(key, data) {
    if (data instanceof ShardingManager) {
        new dbh.ShardingClient(key, data);
    }
    else {
        const dbhClient = new dbh.Client(key, data);
        dbhClient.autopost().then(function (err) {
            if (err)
                return console.error(`\x1b[31mDANBOT HOSTING API\x1b[0m: Error encountered! \x1b[30m\x1b[4m\x1b[32m${err}\x1b[0m.`);
            return console.info(`\x1b[32mDANBOT HOSTING API\x1b[0m: Successfull connection was made to REST.`);
        });
    }
}
export default connect;
//# sourceMappingURL=DanbotHosting.js.map