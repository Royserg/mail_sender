"use strict";
exports.__esModule = true;
exports.verifyConnection = exports.sendMail = void 0;
var nodemailer_1 = require("nodemailer");
var sendMail = function (_a) {
    var auth = _a.auth, recipient = _a.recipient, cc = _a.cc, subject = _a.subject, html = _a.html, attachments = _a.attachments;
    var transporter = nodemailer_1.createTransport({
        // TODO: Could be read from redux/database - If transporter will be saved then this will not be needed
        service: 'outlook',
        auth: {
            user: auth.username,
            pass: auth.password
        }
    });
    var mailOptions = {
        from: auth.username,
        to: recipient,
        cc: cc,
        subject: subject,
        html: html,
        attachments: attachments
    };
    // {
    //   path: '/Users/jakub/Desktop/cookie_meme.png',
    // },
    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                return reject(mailOptions.to);
            }
            else {
                return resolve('Email Sent!');
            }
        });
    });
};
exports.sendMail = sendMail;
var verifyConnection = function (username, password) {
    var transporter = nodemailer_1.createTransport({
        pool: true,
        service: 'outlook',
        auth: {
            user: username,
            pass: password
        },
        maxConnections: 3
    });
    // TODO: Maybe return transporter and call verify in Thunk
    return transporter.verify();
};
exports.verifyConnection = verifyConnection;
