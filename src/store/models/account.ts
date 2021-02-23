import { Action, action, thunk, Thunk } from 'easy-peasy';
import {
  Account,
  AccountConnectionFeedback,
  ConnectionStatus,
} from 'types/account';

// API
const { saveUser, getUser } = window.api.users;
const { verifyConnection } = window.api.mailer;

export interface AccountModel {
  account: Account;
  connectionStatus: ConnectionStatus;
  connectionFeedback: AccountConnectionFeedback;
  // Actions
  //-> account
  saveAccount: Action<AccountModel, Account>;
  removeAccount: Action<AccountModel, void>;
  //-> connection status
  setConnectionStatus: Action<AccountModel, ConnectionStatus>;
  //-> connection feedback
  setConnectionFeedback: Action<AccountModel, AccountConnectionFeedback>;
  // Thunks
  init: Thunk<AccountModel>;
  connect: Thunk<AccountModel, Account>;
}

const accountModel: AccountModel = {
  account: { username: '', password: '' },
  connectionStatus: 'Not connected',
  connectionFeedback: { message: 'Not connected!', success: false },
  // transporter?: '??' TODO: think about it

  // Actions
  //-> account
  saveAccount: action((state, payload) => {
    state.account = payload;
  }),
  removeAccount: action((state) => {
    state.account = { username: '', password: '' };
  }),
  //-> connection status
  setConnectionStatus: action((state, payload) => {
    state.connectionStatus = payload;
  }),
  //-> connection feedback
  setConnectionFeedback: action((state, payload) => {
    state.connectionFeedback = payload;
  }),
  // Thunks
  init: thunk(async (actions) => {
    // When application loads, check if user exists in db and load it to Redux
    const user = await getUser();
    if (user) {
      actions.saveAccount(user);
      // Check user connection status to service
      actions.connect({ username: user.username, password: user.password });
    }
  }),
  connect: thunk(async (actions, { username, password }) => {
    actions.setConnectionStatus('Loading');

    try {
      const isConnectionValid = await verifyConnection({ username, password });
      if (isConnectionValid) {
        // Save account to db
        saveUser({ username, password });

        actions.saveAccount({ username, password });
        actions.setConnectionFeedback({
          message: 'Successfully connected',
          success: true,
        });
        actions.setConnectionStatus('Connected');
      }
    } catch (error) {
      console.log(error);

      actions.removeAccount();
      actions.setConnectionFeedback({
        message: 'Authentication unsuccessful',
        success: false,
      });
      actions.setConnectionStatus('Not connected');
    }
  }),
};

export default accountModel;
