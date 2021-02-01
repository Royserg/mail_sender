import { ipcMain } from 'electron';
import { Channel } from '../proxies/mailer.proxy';
import { verifyConnection } from '../services/mail.service';

ipcMain.handle(
  Channel.VERIFY_CONNECTION,
  async (event, { username, password }) => {
    return await verifyConnection(username, password);
  }
);
