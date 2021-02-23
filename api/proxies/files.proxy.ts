import { ipcRenderer } from 'electron';

export enum Channel {
  SAVE_LIST = 'SAVE_LIST',
  REMOVE_LIST = 'REMOVE_LIST',
  GET_LISTS = 'GET_LISTS',
}

export interface FilesProxy {
  saveList(fileData: { filename: string; data: any[] }): Promise<any>;
  // removeList(): Promise<any>;
  // getLists(user: { username: string; password: string }): Promise<any>;
}

export const filesProxy: FilesProxy = {
  saveList: (fileData) => ipcRenderer.invoke(Channel.SAVE_LIST, fileData),

  // getUser: () => ipcRenderer.invoke(Channel.GET_USER),
  // getUsers: () => ipcRenderer.invoke(Channel.GET_USERS),
  // saveUser: (user) => ipcRenderer.invoke(Channel.SAVE_USER, user),
};
