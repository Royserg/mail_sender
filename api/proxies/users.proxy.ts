import { ipcRenderer } from 'electron';
import { User } from '../database/entities/User';

export enum Channel {
  GET_USER = 'GET_USER',
  GET_USERS = 'GET_USERS',
  SAVE_USER = 'SAVE_USER',
}

export interface UserProxy {
  getUsers(): Promise<User[]>;
  getUser(): Promise<User>;
  saveUser(user: { username: string; password: string }): Promise<User>;
}

export const userProxy: UserProxy = {
  getUser: () => ipcRenderer.invoke(Channel.GET_USER),
  getUsers: () => ipcRenderer.invoke(Channel.GET_USERS),
  saveUser: (user) => ipcRenderer.invoke(Channel.SAVE_USER, user),
};
