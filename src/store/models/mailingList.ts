import { Action, action, thunk, Thunk } from 'easy-peasy';
import { SaveListDTO, Status, StatusKind } from 'types/mailingList';

// API
const files = window.api.files;

export interface MailingListModel {
  mailingLists: any[];
  uploadStatus: Status;
  deleteStatus: Status;

  // Actions
  setStatus: Action<
    MailingListModel,
    { statusKind: StatusKind; status: Status }
  >;
  updateLists: Action<MailingListModel, any[]>;
  // Thunks
  saveList: Thunk<MailingListModel, SaveListDTO>;
  removeList: Thunk<MailingListModel, { filename: string }>;
  getLists: Thunk<MailingListModel>;
}

const mailingListModel: MailingListModel = {
  mailingLists: [],
  uploadStatus: undefined,
  deleteStatus: undefined,

  // Actions
  setStatus: action((state, { statusKind, status }) => {
    state[statusKind] = status;
  }),
  updateLists: action((state, payload) => {
    state.mailingLists = payload;
  }),
  // Thunks
  saveList: thunk(async (actions, { filename, data }) => {
    actions.setStatus({
      statusKind: StatusKind.uploadStatus,
      status: 'Loading',
    });
    try {
      await files.saveList({ filename, data });
      actions.setStatus({
        statusKind: StatusKind.uploadStatus,
        status: 'Success',
      });
    } catch (err) {
      actions.setStatus({
        statusKind: StatusKind.uploadStatus,
        status: 'Error',
      });
    }
    actions.getLists();
  }),

  removeList: thunk(async (actions, { filename }) => {
    actions.setStatus({
      statusKind: StatusKind.deleteStatus,
      status: 'Loading',
    });

    try {
      await files.removeList({ filename });
      actions.setStatus({
        statusKind: StatusKind.deleteStatus,
        status: 'Success',
      });
      actions.getLists();
    } catch (err) {
      actions.setStatus({
        statusKind: StatusKind.deleteStatus,
        status: 'Error',
      });
    }
  }),

  getLists: thunk(async (actions, payload) => {
    try {
      const mailingLists = await files.getLists();
      actions.updateLists(mailingLists);
    } catch (err) {
      console.log(err);
    }
  }),
};

export default mailingListModel;
