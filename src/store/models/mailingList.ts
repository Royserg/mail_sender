import { Action, action, thunk, Thunk } from 'easy-peasy';
import { SaveListDTO, Status, StatusKind } from 'types/mailingList';
import { Account } from 'types/account';

// API
const files = window.api.files;
const { sendMail } = window.api.mailer;

export interface MailingListModel {
  mailingLists: any[];

  currentList: any[];
  sent: any[];

  uploadStatus: Status;
  deleteStatus: Status;
  sendStatus: Status;

  // Actions
  setStatus: Action<
    MailingListModel,
    { statusKind: StatusKind; status: Status }
  >;
  updateLists: Action<MailingListModel, any[]>;

  setCurrentList: Action<MailingListModel, any[]>;
  addToSent: Action<MailingListModel, {}>;
  afterSentCleanup: Action<MailingListModel>;

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

  currentList: [],
  sent: [],

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

  // Sending mails actions
  setCurrentList: action((state, payload) => {
    state.currentList = payload;
  }),
  addToSent: action((state, payload) => {
    state.sent = [...state.sent, payload];
  }),
  afterSentCleanup: action((state) => {
    state.currentList = [];
    state.sent = [];
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
      actions.setCurrentList(recipientsData);

      // Inject dynamic data
      for (let i = 0; i < recipientsData.length; i++) {
        let content = mailData.message;
        let recipient = recipientsData[i];

        for (let key of Object.keys(recipient)) {
          if (key !== 'key') {
            content = content.replace(`#${key}`, recipient[key]);
          }
        }

        // Send mail with prepared content if email exists
        if (recipient['email']) {
          try {
            await sendMail({
              auth: auth,
              recipient: recipient['email'],
              cc: mailData.cc,
              subject: mailData.subject,
              html: content,
              attachments: mailData.attachments,
            });

            actions.addToSent({
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
      }

      actions.setStatus({
        statusKind: StatusKind.sendStatus,
        status: 'Success',
      });
      actions.afterSentCleanup();
    }
  ),
};

export default mailingListModel;
