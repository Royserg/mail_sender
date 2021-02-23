"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var files_proxy_1 = require("./proxies/files.proxy");
var mailer_proxy_1 = require("./proxies/mailer.proxy");
var users_proxy_1 = require("./proxies/users.proxy");
electron_1.contextBridge.exposeInMainWorld('api', {
    users: users_proxy_1.userProxy,
    mailer: mailer_proxy_1.mailerProxy,
    files: files_proxy_1.filesProxy
});
