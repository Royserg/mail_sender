"use strict";
exports.__esModule = true;
exports.userProxy = exports.Channel = void 0;
var electron_1 = require("electron");
var Channel;
(function (Channel) {
    Channel["GET_USER"] = "GET_USER";
    Channel["GET_USERS"] = "GET_USERS";
    Channel["SAVE_USER"] = "SAVE_USER";
})(Channel = exports.Channel || (exports.Channel = {}));
exports.userProxy = {
    getUser: function () { return electron_1.ipcRenderer.invoke(Channel.GET_USER); },
    getUsers: function () { return electron_1.ipcRenderer.invoke(Channel.GET_USERS); },
    saveUser: function (user) { return electron_1.ipcRenderer.invoke(Channel.SAVE_USER, user); }
};
