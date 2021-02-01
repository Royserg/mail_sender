"use strict";
exports.__esModule = true;
exports.mailerProxy = exports.Channel = void 0;
var electron_1 = require("electron");
var Channel;
(function (Channel) {
    Channel["VERIFY_CONNECTION"] = "VERIFY_CONNECTION";
})(Channel = exports.Channel || (exports.Channel = {}));
exports.mailerProxy = {
    verifyConnection: function (connection) {
        return electron_1.ipcRenderer.invoke(Channel.VERIFY_CONNECTION, connection);
    }
};
