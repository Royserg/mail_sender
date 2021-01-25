import accountModel, { AccountModel } from './account';

export interface StoreModel {
  account: AccountModel;
}

const storeModel: StoreModel = {
  account: accountModel,
};

export default storeModel;
