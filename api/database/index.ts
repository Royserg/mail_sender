import 'reflect-metadata';
import { createConnection, ConnectionOptions } from 'typeorm';
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
  })
  .catch(console.error);
