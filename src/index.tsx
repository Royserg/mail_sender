import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
// Redux
import { StoreProvider } from 'easy-peasy';
import store from 'store';
// TypeOrm
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Account from 'database/entities/account';

// Fix for sql.js database
// Cannot read property 'Database' of undefined: https://github.com/typeorm/typeorm/issues/4291#issuecomment-719585054
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.SQL = window.require('sql.js/js/sql.js');

createConnection({
  type: 'sqljs',
  synchronize: true,
  autoSave: true,
  entities: [Account],
  logging: true,
  logger: 'advanced-console',
  location: 'core-db',
}).then(() => {
  console.log('connected to db');

  ReactDOM.render(
    <StoreProvider store={store}>
      <Router>
        <App />
      </Router>
    </StoreProvider>,
    document.getElementById('root')
  );
});
