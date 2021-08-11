import * as Discord from 'discord.js';
class Config {
    constructor() {
        this._Commands = new Discord.Collection();
        this._CommandPrefix = [];
    }
    get CaseSensitiveTrigger() {
        return this._isSensitive;
    }
    set CaseSensitiveTrigger(value) {
        this._isSensitive = value;
    }
    get Statuses() {
        return this._Statuses;
    }
    set Statuses(value) {
        if (this._firstModified)
            return;
        this._Statuses = value;
    }
    get Options() {
        return this._Options;
    }
    set Options(value) {
        if (this._firstModified)
            return;
        this._Options = value;
    }
    get ClientOptions() {
        return this._ClientOptions;
    }
    set ClientOptions(value) {
        if (this._firstModified)
            return;
        this._ClientOptions = value;
    }
    get Commands() {
        return this._Commands;
    }
    set Commands(value) {
        if (this._firstModified)
            return;
        this._Commands = value;
    }
    get CommandPrefix() {
        return this._CommandPrefix;
    }
    set CommandPrefix(value) {
        if (this._firstModified)
            return;
        this._CommandPrefix = value;
    }
    checkUpAsModified() {
        if (this._firstModified)
            return false;
        this._firstModified = true;
        return false;
    }
}
export default new Config();
//# sourceMappingURL=Config.js.map