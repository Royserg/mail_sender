import { ipcMain } from 'electron';
import { Channel } from '../proxies/files.proxy';
const fs = require('fs');

const LIST_ROOT = './mailing_list/';

// CREATE
ipcMain.handle(Channel.SAVE_LIST, async (event, { filename, data }) => {
  return new Promise((resolve, reject) => {
    // console.log('controller', filename, data);

    const stringifiedData = JSON.stringify(data, null, 4);
    const path = `${LIST_ROOT}${filename}.json`;

    fs.writeFile(path, stringifiedData, (err) => {
      if (err) {
        reject(err);
      }
      console.log(`${filename} saved into ${LIST_ROOT}`);
      resolve({ success: true });
    });
  });
});

// READ
ipcMain.handle(Channel.GET_LISTS, async (event, payload) => {
  return new Promise((resolve, reject) => {
    const path = `${LIST_ROOT}`;
    fs.readdir(path, async (err, files) => {
      if (err) {
        return reject(err);
      }
      // Get content of each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          files[i] = await readFileContent(file);
        } catch (error) {
          reject(error);
        }
      }

      resolve(files);
    });
  });
});

// Helper reading json content
const readFileContent = (filename: string) => {
  return new Promise((resolve, reject) => {
    const path = `${LIST_ROOT}/${filename}`;

    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      }

      const jsonFileData = {
        filename: filename.replace('.json', ''),
        data: JSON.parse(data),
      };

      resolve(jsonFileData);
    });
  });
};

// DELETE
ipcMain.handle(Channel.REMOVE_LIST, async (event, { filename }) => {
  return new Promise((resolve, reject) => {
    const path = `${LIST_ROOT}/${filename}.json`;

    fs.unlink(path, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve({ msg: 'success' });
    });
  });
});
