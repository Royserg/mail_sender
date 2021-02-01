import { contextBridge } from 'electron';
import { mailerProxy, MailerProxy } from './proxies/mailer.proxy';
import { userProxy, UserProxy } from './proxies/users.proxy';

// declare global {
//   interface Window {
//     api: {
//       users: UserProxy;
//       mailer: MailerProxy;
//     };
//   }
// }

contextBridge.exposeInMainWorld('api', {
  users: userProxy,
  mailer: mailerProxy,
  // Send Methods
  // testSend: (args) => ipcRenderer.send('test-send', args),
  // // Receive Methods
  // testReceive: (callback) =>
  //   ipcRenderer.on('test-receive', (event, data) => {
  //     callback(data);
  //   }),
});
