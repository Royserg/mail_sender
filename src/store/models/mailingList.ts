import { Action, action, thunk, Thunk } from 'easy-peasy';
import { SaveListDTO, Status, StatusKind } from 'types/mailingList';
import { Account } from 'types/account';

// API
const files = window.api.files;
const { sendMail } = window.api.mailer;

export interface MailingListModel {
  mailingLists: any[];
  currentlySending: any[];
  uploadStatus: Status;
  deleteStatus: Status;
  sendStatus: Status;

  // Actions
  setStatus: Action<
    MailingListModel,
    { statusKind: StatusKind; status: Status }
  >;
  updateLists: Action<MailingListModel, any[]>;

  updateCurrentlySending: Action<MailingListModel, {}>;
  removeCurrentlySending: Action<MailingListModel>;

  // Thunks
  saveList: Thunk<MailingListModel, SaveListDTO>;
  removeList: Thunk<MailingListModel, { filename: string }>;
  getLists: Thunk<MailingListModel>;

  sendMails: Thunk<
    MailingListModel,
    { mailingList: string; mailData: any; auth: Account }
  >;
}

const mailingListModel: MailingListModel = {
  mailingLists: [],
  currentlySending: [],
  uploadStatus: undefined,
  deleteStatus: undefined,
  sendStatus: undefined,

  // Actions
  setStatus: action((state, { statusKind, status }) => {
    state[statusKind] = status;
  }),
  updateLists: action((state, payload) => {
    state.mailingLists = payload;
  }),

  updateCurrentlySending: action((state, payload) => {
    state.currentlySending = [...state.currentlySending, payload];
  }),
  removeCurrentlySending: action((state) => {
    state.currentlySending = [];
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

  sendMails: thunk(
    async (actions, { mailingList, mailData, auth }, { getState }) => {
      actions.setStatus({
        statusKind: StatusKind.sendStatus,
        status: 'Loading',
      });

      const list = getState().mailingLists.find(
        (l) => l.filename === mailingList
      );

      const recipientsData = list.data;

      for (let i = 0; i < recipientsData.length; i++) {
        let content = mailData.message;
        let recipient = recipientsData[i];

        for (let key of Object.keys(recipient)) {
          if (key !== 'key') {
            content = content.replace(`#${key}`, recipient[key]);
          }
        }

        // Send mail with prepared content
        try {
          await sendMail({
            auth: auth,
            recipient: recipient['email'],
            cc: mailData.cc,
            subject: mailData.subject,
            html: content,
            attachments: mailData.attachments,
          });

          actions.updateCurrentlySending({
            email: recipient['email'],
            success: true,
          });
        } catch (err) {
          console.log('error', err);

          actions.setStatus({
            statusKind: StatusKind.sendStatus,
            status: 'Error',
          });
        }
      }

      actions.setStatus({
        statusKind: StatusKind.sendStatus,
        status: 'Success',
      });
      actions.removeCurrentlySending();
    }
  ),
};

export default mailingListModel;
