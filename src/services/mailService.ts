import config from 'config';
const nodemailer = window.require('nodemailer');

interface MailData {
  recipient: string;
  cc: string | string[];
  subject: string;
  html: string;
}

const sendMail = ({ recipient, cc, subject, html }: MailData) => {
  const transporter = nodemailer.createTransport({
    // TODO: Should be read from redux/database
    service: 'outlook',
    auth: {
      user: config.USERNAME, //TODO: Change for production
      pass: config.PASSWORD,
    },
    maxConnections: 3,
  });

  const mailOptions = {
    from: config.USERNAME,
    to: recipient,
    cc,
    subject,
    html,
    attachments: [],
  };

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
  const transporter = nodemailer.createTransport({
    pool: true,
    service: 'outlook',
    auth: {
      user: config.USERNAME,
      pass: config.PASSWORD,
    },
    maxConnections: 3,
  });

  return transporter.verify();
};

export { sendMail, verifyConnection };
