"use strict";
exports.__esModule = true;
exports.filesProxy = exports.Channel = void 0;
var electron_1 = require("electron");
var Channel;
(function (Channel) {
    Channel["SAVE_LIST"] = "SAVE_LIST";
    Channel["REMOVE_LIST"] = "REMOVE_LIST";
    Channel["GET_LISTS"] = "GET_LISTS";
})(Channel = exports.Channel || (exports.Channel = {}));
exports.filesProxy = {
    saveList: function (fileData) { return electron_1.ipcRenderer.invoke(Channel.SAVE_LIST, fileData); },
    removeList: function (filename) { return electron_1.ipcRenderer.invoke(Channel.REMOVE_LIST, filename); },
    getLists: function () { return electron_1.ipcRenderer.invoke(Channel.GET_LISTS); }
};
