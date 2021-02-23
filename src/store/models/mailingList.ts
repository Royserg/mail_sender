import { Action, action, thunk, Thunk } from 'easy-peasy';
import { SaveListDTO, Status } from 'types/mailingList';

// API
const files = window.api.files;

export interface MailingListModel {
  mailingLists: [];
  uploadStatus: Status;

  // Actions
  setStatus: Action<MailingListModel, Status>;
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
  }),
  removeList: thunk(async (actions, payload) => {
    console.log('remove list triggered');
  }),
  //-> connection status
  getLists: thunk(async (actions, payload) => {
    // TODO:
  }),
};

export default mailingListModel;
