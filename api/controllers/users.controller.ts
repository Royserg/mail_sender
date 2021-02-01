import { ipcMain } from 'electron';
import { getRepository } from 'typeorm';
import { User } from '../database/entities/User';
import { Channel } from '../proxies/users.proxy';

ipcMain.handle(Channel.GET_USER, async (event, args) => {
  const user = await getRepository(User).find();
  return user ? user[0] : undefined;
});

ipcMain.handle(Channel.GET_USERS, async (event, args) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  return users;
});

ipcMain.handle(Channel.SAVE_USER, async (event, { username, password }) => {
  const userRepository = getRepository(User);
  const existing = await userRepository.find();
  // Update user in the db
  if (existing[0]) {
    existing[0].username = username;
    existing[0].password = password;
    return await userRepository.save(existing[0]);
  }

  // Create new user
  const newUser = new User();
  newUser.username = username;
  newUser.password = password;
  return await userRepository.save(newUser);
});
