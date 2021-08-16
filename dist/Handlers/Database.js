"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const dbdts_db_1 = require("dbdts.db");
class Database {
    constructor(options) {
        this._queue = [];
        this.readyTimestamp = 0;
        this.database = new dbdts_db_1.Database({ ...options, sanitize: true });
        this.table = this.database.createTable('table_dbdjs')
            .addColumns([
            new dbdts_db_1.Column()
                .setName('id')
                .setPrimary(true)
                .setType("TEXT"),
            new dbdts_db_1.Column()
                .setName('data')
                .setType('TEXT')
        ]);
        this.database.once('ready', () => {
            for (const data of this._queue) {
                data[0].call(this, data[1]);
            }
        });
    }
    set(Identifier, value) {
        this.table.set({
            id: String(Identifier),
            data: value
        });
    }
    get(Identifier) {
        const data = this.table.get({
            where: [{
                    column: 'id',
                    equals: Identifier
                }]
        });
        console.log(data);
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map