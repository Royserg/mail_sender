"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var mailer_proxy_1 = require("./proxies/mailer.proxy");
var users_proxy_1 = require("./proxies/users.proxy");
// declare global {
//   interface Window {
//     api: {
//       users: UserProxy;
//       mailer: MailerProxy;
//     };
//   }
// }
electron_1.contextBridge.exposeInMainWorld('api', {
    users: users_proxy_1.userProxy,
    mailer: mailer_proxy_1.mailerProxy
});
