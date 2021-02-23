import accountModel, { AccountModel } from './account';
import mailingListModel, { MailingListModel } from './mailingList';

export interface StoreModel {
  account: AccountModel;
  mailingList: MailingListModel;
}

const storeModel: StoreModel = {
  account: accountModel,
  mailingList: mailingListModel,
};

export default storeModel;
