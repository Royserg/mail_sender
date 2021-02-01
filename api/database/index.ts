import 'reflect-metadata';
import { createConnection, getRepository, ConnectionOptions } from 'typeorm';
import { User } from './entities/User';

const connectionOptions: ConnectionOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User],
  synchronize: true,
  logging: true,
};

createConnection(connectionOptions)
  .then(() => {
    console.log('Connected to database');
    // const userRepository = getRepository(User);
    // const user = new User();
    // user.username = 'Jakub';
    // user.password = 'JakubsPassword';
    // return userRepository.save(user);
  })
  .catch(console.error);
