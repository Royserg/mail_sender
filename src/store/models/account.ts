import { Action, action, thunk, Thunk } from 'easy-peasy';
import { Account, AccountConnectionFeedback } from 'types/account';
// Services
import { verifyConnection } from 'services/mailService';

export interface AccountModel {
  account: Account;
  connectionFeedback: AccountConnectionFeedback;
  // Actions
  saveAccount: Action<AccountModel, Account>;
  removeAccount: Action<AccountModel, void>;
  setConnectionFeedback: Action<AccountModel, AccountConnectionFeedback>;
  // Thunks
  connect: Thunk<AccountModel, Account>;
}

const accountModel: AccountModel = {
  account: { username: '', password: '' },
  connectionFeedback: { message: '', success: false },
  // transporter?: '??' TODO: think about it

  // Actions
  saveAccount: action((state, payload) => {
    state.account = payload;
  }),
  removeAccount: action((state) => {
    state.account = { username: '', password: '' };
  }),

  setConnectionFeedback: action((state, payload) => {
    state.connectionFeedback = payload;
  }),
  // Thunks
  connect: thunk(async (actions, { username, password }) => {
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
      }
    } catch (error) {
      console.log(error);

      actions.removeAccount();
      actions.setConnectionFeedback({
        message: 'Authentication unsuccessful',
        success: false,
      });
    }
  }),
};

export default accountModel;
