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
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';

declare global {
  interface Window {
    api: {
      users: UserProxy;
      mailer: MailerProxy;
    };
  }
}

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

const themes = {
  // dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  // light: `${process.env.PUBLIC_URL}/light-theme.css`,
  dark: `dark-theme.css`,
  light: `light-theme.css`,
};

ReactDOM.render(
  <StoreProvider store={store}>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={Theme.Light}>
      <Router>
        <App />
      </Router>
    </ThemeSwitcherProvider>
  </StoreProvider>,
  document.getElementById('root')
);
