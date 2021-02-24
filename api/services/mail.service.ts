import { createTransport } from 'nodemailer';

export interface MailData {
  auth: {
    username: string;
    password: string;
  };
  recipient: string;
  cc: string | string[];
  subject: string;
  html: string;
  attachments: any[];
}

const sendMail = ({
  auth,
  recipient,
  cc,
  subject,
  html,
  attachments,
}: MailData) => {
  const transporter = createTransport({
    // TODO: Could be read from redux/database - If transporter will be saved then this will not be needed
    service: 'outlook',
    auth: {
      user: auth.username,
      pass: auth.password,
    },
  });

  const mailOptions = {
    from: auth.username,
    to: recipient,
    cc,
    subject,
    html,
    attachments,
  };
  // {
  //   path: '/Users/jakub/Desktop/cookie_meme.png',
  // },

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err: any, data: any) => {
      if (err) {
        return reject(mailOptions.to);
      } else {
        return resolve('Email Sent!');
      }
    });
  });
};

const verifyConnection = (username: string, password: string) => {
  const transporter = createTransport({
    pool: true,
    service: 'outlook',
    auth: {
      user: username,
      pass: password,
    },
    maxConnections: 3,
  });
  // TODO: Maybe return transporter and call verify in Thunk
  return transporter.verify();
};

export { sendMail, verifyConnection };
