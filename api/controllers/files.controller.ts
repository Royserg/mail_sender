import { ipcMain } from 'electron';
import { Channel } from '../proxies/files.proxy';
const fs = require('fs');

const LIST_ROOT = './mailing_list/';

ipcMain.handle(Channel.SAVE_LIST, async (event, { filename, data }) => {
  return new Promise((resolve, reject) => {
    // console.log('controller', filename, data);

    const stringifiedData = JSON.stringify(data, null, 4);
    const path = `${LIST_ROOT}${filename}.json`;

    fs.writeFile(path, stringifiedData, (err) => {
      if (err) {
        return reject(err);
      }
      console.log(`${filename} saved into ${LIST_ROOT}`);
      return resolve({ success: true });
    });
  });
});

// ipcMain.handle(Channel.GET_USERS, async (event, args) => {
//   const userRepository = getRepository(User);
//   const users = await userRepository.find();
//   return users;
// });

// ipcMain.handle(Channel.SAVE_USER, async (event, { username, password }) => {
//   const userRepository = getRepository(User);
//   const existing = await userRepository.find();
//   // Update user in the db
//   if (existing[0]) {
//     existing[0].username = username;
//     existing[0].password = password;
//     return await userRepository.save(existing[0]);
//   }

// Create new user
//   const newUser = new User();
//   newUser.username = username;
//   newUser.password = password;
//   return await userRepository.save(newUser);
// });
