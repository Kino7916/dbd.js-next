"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteDatabaseInteractor = exports.SQLiteDatabase = void 0;
const axios_1 = require("axios");
const dbdts_db_1 = require("dbdts.db");
class SQLiteDatabase {
    constructor(database) {
        this._isMethodsArePromise = false;
        this._useTableName = 'table_dbdjs';
        this.database = database;
        if (![
            dbdts_db_1.Database, RemoteDatabaseInteractor
        ].find(v => this.database instanceof v))
            throw new TypeError("Database must be instanceof Interactor or package('dbd.ts').Database!");
        if (this.database instanceof RemoteDatabaseInteractor) {
            this._isMethodsArePromise = true;
            this.table = this.database;
        }
        else {
            this.table = this.database.createTable(this._useTableName)
                .addColumns([
                new dbdts_db_1.Column()
                    .setName('id')
                    .setPrimary(true)
                    .setType("TEXT"),
                new dbdts_db_1.Column()
                    .setName('data')
                    .setType("TEXT")
            ], false);
            this.database.connect();
        }
    }
    _handlePromise(promise, cb) {
        promise.then(data => cb(null, data))
            .catch(err => cb(err));
    }
    set(key, value, cb) {
        if (this.table instanceof dbdts_db_1.Table && this.database instanceof dbdts_db_1.Database) {
            try {
                this.database.set(this.table, {
                    id: key,
                    value
                });
            }
            catch (err) {
                cb(err);
            }
            finally {
                cb(null);
            }
        }
        else if (this.table instanceof RemoteDatabaseInteractor &&
            this.database instanceof RemoteDatabaseInteractor) {
            this._handlePromise(this.database.set({
                id: key,
                value
            }, {
                where: {
                    column: "id",
                    equals: key
                }
            }), cb);
        }
        return this;
    }
    get(key, cb) {
        if (this.table instanceof dbdts_db_1.Table && this.database instanceof dbdts_db_1.Database) {
            try {
                cb(null, this.database.get(this.table, {
                    where: {
                        column: "id",
                        equals: key
                    }
                }));
            }
            catch (err) {
                cb(err);
            }
        }
        else if (this.table instanceof RemoteDatabaseInteractor &&
            this.database instanceof RemoteDatabaseInteractor) {
            this._handlePromise(this.database.get({
                where: {
                    column: "id",
                    equals: key
                }
            }), cb);
        }
        return this;
    }
    delete(key, cb) {
        if (this.table instanceof dbdts_db_1.Table && this.database instanceof dbdts_db_1.Database) {
            try {
                this.database.delete(this.table, {
                    where: {
                        column: "id",
                        equals: key
                    }
                });
            }
            catch (err) {
                cb(err);
            }
            finally {
                cb(null);
            }
        }
        else if (this.table instanceof RemoteDatabaseInteractor &&
            this.database instanceof RemoteDatabaseInteractor) {
            this._handlePromise(this.database.delete({
                where: {
                    column: "id",
                    equals: key
                }
            }), cb);
        }
        return this;
    }
    all(cb) {
        if (this.table instanceof dbdts_db_1.Table && this.database instanceof dbdts_db_1.Database) {
            try {
                cb(null, this.database.all(this.table));
            }
            catch (err) {
                cb(err);
            }
        }
        else if (this.table instanceof RemoteDatabaseInteractor &&
            this.database instanceof RemoteDatabaseInteractor) {
            this._handlePromise(this.database.all(), cb);
        }
        return this;
    }
}
exports.SQLiteDatabase = SQLiteDatabase;
class RemoteDatabaseInteractor {
    constructor(options) {
        this._databaseReadyTimestamp = 0;
        this.table_name = options.tableName || "table_dbdjs";
        this.origin = options.url;
        this.authorize_key = options.password;
        this.axios = axios_1.default.create(options.axiosOptions);
        this._validate();
    }
    async _validate() {
        const uptime = await this.axios.get(this.origin + "/uptime", { headers: {
                'Authorization': this.authorize_key
            } });
        if (axios_1.default.isAxiosError(uptime)) {
            throw new Error('Unexpected Status code of: ' + uptime.code.toString());
        }
        this._databaseReadyTimestamp = Date.now() - uptime.data;
        return true;
    }
    get readyTimestamp() {
        return this._databaseReadyTimestamp;
    }
    get readyAt() {
        return new Date(this._databaseReadyTimestamp);
    }
    set(data, options) {
        return axios_1.default.post(this.origin + "/set", {
            table: this.table_name,
            data,
            options
        }, { headers: { 'Authorization': this.authorize_key } });
    }
    get(options) {
        return axios_1.default.post(this.origin + "/get", {
            table: this.table_name,
            options
        }, { headers: { 'Authorization': this.authorize_key } }).then(res => res.data).catch(err => err);
    }
    all(options) {
        return axios_1.default.post(this.origin + "/all", {
            table: this.table_name,
            options
        }, { headers: { 'Authorization': this.authorize_key } }).then(res => res.data).catch(err => err);
    }
    delete(options) {
        return axios_1.default.post(this.origin + "/delete", {
            table: this.table_name,
            options
        }, { headers: { 'Authorization': this.authorize_key } }).then(res => res.data).catch(err => err);
    }
}
exports.RemoteDatabaseInteractor = RemoteDatabaseInteractor;
//# sourceMappingURL=Database.js.map