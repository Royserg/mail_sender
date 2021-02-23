import { contextBridge } from 'electron';
import { filesProxy } from './proxies/files.proxy';
import { mailerProxy } from './proxies/mailer.proxy';
import { userProxy } from './proxies/users.proxy';

contextBridge.exposeInMainWorld('api', {
  users: userProxy,
  mailer: mailerProxy,
  files: filesProxy,
  // Send Methods
  // testSend: (args) => ipcRenderer.send('test-send', args),
  // // Receive Methods
  // testReceive: (callback) =>
  //   ipcRenderer.on('test-receive', (event, data) => {
  //     callback(data);
  //   }),
});
