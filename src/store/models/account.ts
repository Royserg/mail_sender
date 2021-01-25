import { Action, action, thunk, Thunk } from 'easy-peasy';
import {
  Account,
  AccountConnectionFeedback,
  ConnectionStatus,
} from 'types/account';
// Services
import { verifyConnection } from 'services/mailService';

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
  connect: Thunk<AccountModel, Account>;
}

const accountModel: AccountModel = {
  account: { username: '', password: '' },
  connectionStatus: 'Not connected',
  connectionFeedback: { message: '', success: false },
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
  connect: thunk(async (actions, { username, password }) => {
    actions.setConnectionStatus('Loading');
    // 1. Create transporter object from nodemailer (Redux)
    // 3. Save transporter if it successfully connected (Redux)

    try {
      console.log('thunk', username, password);
      const isConnectionValid = await verifyConnection(username, password);

      if (isConnectionValid) {
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
