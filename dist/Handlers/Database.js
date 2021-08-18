"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteDatabaseInteractor = void 0;
const axios_1 = require("axios");
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