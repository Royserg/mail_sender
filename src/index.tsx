import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
// Redux
import { StoreProvider } from 'easy-peasy';
import store from 'store';

import { UserProxy } from '../api/proxies/users.proxy';
import { MailerProxy } from '../api/proxies/mailer.proxy';

declare global {
  interface Window {
    api: {
      users: UserProxy;
      mailer: MailerProxy;
    };
  }
}

ReactDOM.render(
  <StoreProvider store={store}>
    <Router>
      <App />
    </Router>
  </StoreProvider>,
  document.getElementById('root')
);
