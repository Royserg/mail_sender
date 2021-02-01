import { ipcRenderer } from 'electron';

export enum Channel {
  VERIFY_CONNECTION = 'VERIFY_CONNECTION',
}

export interface MailerProxy {
  verifyConnection(connection: { username: string; password: string }): any;
}

export const mailerProxy: MailerProxy = {
  verifyConnection: (connection) =>
    ipcRenderer.invoke(Channel.VERIFY_CONNECTION, connection),
};
