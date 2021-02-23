import { ipcRenderer } from 'electron';

export enum Channel {
  SAVE_LIST = 'SAVE_LIST',
  REMOVE_LIST = 'REMOVE_LIST',
  GET_LISTS = 'GET_LISTS',
}

export interface FilesProxy {
  saveList(fileData: { filename: string; data: any[] }): Promise<any>;
  removeList({ filename: string }): Promise<{ message: string }>;
  getLists(): Promise<any[]>;
}

export const filesProxy: FilesProxy = {
  saveList: (fileData) => ipcRenderer.invoke(Channel.SAVE_LIST, fileData),
  removeList: (filename) => ipcRenderer.invoke(Channel.REMOVE_LIST, filename),
  getLists: () => ipcRenderer.invoke(Channel.GET_LISTS),
};
