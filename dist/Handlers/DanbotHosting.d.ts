import { ShardingManager, Client } from 'discord.js';
declare function connect(key: string, data: Client | ShardingManager): void;
export default connect;
