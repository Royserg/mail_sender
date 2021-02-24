import { ipcRenderer } from 'electron';
import { MailData } from '../services/mail.service';

export enum Channel {
  VERIFY_CONNECTION = 'VERIFY_CONNECTION',
  SEND_MAIL = 'SEND_MAIL',
}

export interface MailerProxy {
  verifyConnection(connection: { username: string; password: string }): any;
  sendMail(data: MailData): any;
}

export const mailerProxy: MailerProxy = {
  verifyConnection: (connection) =>
    ipcRenderer.invoke(Channel.VERIFY_CONNECTION, connection),
  sendMail: (data) => ipcRenderer.invoke(Channel.SEND_MAIL, data),
};
