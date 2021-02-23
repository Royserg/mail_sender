import Actions from '@ant-design/pro-form/lib/layouts/QueryFilter/Actions';
import { Action, action, thunk, Thunk } from 'easy-peasy';
import { SaveListDTO, Status } from 'types/mailingList';

// API
const files = window.api.files;

export interface MailingListModel {
  mailingLists: any[];
  uploadStatus: Status;

  // Actions
  setStatus: Action<MailingListModel, Status>;
  updateLists: Action<MailingListModel, any[]>;
  // Thunks
  saveList: Thunk<MailingListModel, SaveListDTO>;
  removeList: Thunk<MailingListModel>;
  getLists: Thunk<MailingListModel>;
}

const mailingListModel: MailingListModel = {
  mailingLists: [],
  uploadStatus: undefined,

  // Actions
  setStatus: action((state, payload) => {
    state.uploadStatus = payload;
  }),
  updateLists: action((state, payload) => {
    state.mailingLists = payload;
  }),
  // Thunks
  saveList: thunk(async (actions, { filename, data }) => {
    // Save to file
    actions.setStatus('Loading');
    try {
      await files.saveList({ filename, data });
      actions.setStatus('Success');
    } catch (err) {
      actions.setStatus('Error');
    }
    actions.getLists();
  }),
  removeList: thunk(async (actions, payload) => {
    console.log('remove list triggered');
  }),
  //-> connection status
  getLists: thunk(async (actions, payload) => {
    try {
      const mailingLists = await files.getLists();
      actions.updateLists(mailingLists);
      console.log(mailingLists);
    } catch (err) {
      console.log(err);
    }
  }),
};

export default mailingListModel;
