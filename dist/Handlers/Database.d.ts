import { Database as db, Table, DatabaseOptions } from 'dbdts.db';
export declare class Database {
    table: Table;
    private _queue;
    ready: boolean;
    readyTimestamp: number;
    database: db;
    constructor(options?: DatabaseOptions);
    set(Identifier: string, value: string): void;
    get(Identifier: string): void;
}
