"use strict";
exports.__esModule = true;
exports.dbProxy = exports.Channel = void 0;
var electron_1 = require("electron");
var Channel;
(function (Channel) {
    Channel["HELLO"] = "HELLO";
    Channel["GET_USERS"] = "GET_USERS";
})(Channel = exports.Channel || (exports.Channel = {}));
exports.dbProxy = {
    hello: function () { return electron_1.ipcRenderer.invoke(Channel.HELLO); },
    getUsers: function () { return electron_1.ipcRenderer.invoke(Channel.GET_USERS); }
};
