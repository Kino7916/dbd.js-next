"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../Handlers/Util");
var C;
(function (C) {
    C.Statuses = Util_1.Collection.createInstance();
    C.Commands = Util_1.Collection.createInstance();
    C.CommandPrefix = [];
    C.CaseSensitiveTrigger = false;
    var _firstModified = false;
    function checkUpAsModified() {
        if (_firstModified)
            return false;
        _firstModified = true;
        return true;
    }
    C.checkUpAsModified = checkUpAsModified;
})(C || (C = {}));
exports.default = C;
//# sourceMappingURL=Config.js.map