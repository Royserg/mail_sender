import 'reflect-metadata';
import { createConnection, ConnectionOptions } from 'typeorm';
import { User } from './entities/User';

const connectionOptions: ConnectionOptions = {
  type: 'sqlite',
  database: './tmp/main.db',
  entities: [User],
  synchronize: true,
  logging: true,
};

createConnection(connectionOptions)
  .then(() => {
    console.log('Connected to database');
  })
  .catch(console.error);
