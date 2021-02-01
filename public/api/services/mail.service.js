"use strict";
exports.__esModule = true;
exports.verifyConnection = exports.sendMail = void 0;
var nodemailer_1 = require("nodemailer");
var sendMail = function (_a) {
    var recipient = _a.recipient, cc = _a.cc, subject = _a.subject, html = _a.html;
    var transporter = nodemailer_1.createTransport({
        // TODO: Should be read from redux/database - If transporter will be saved then this will not be needed
        service: 'outlook',
        auth: {
            user: 'random',
            pass: 'random'
        }
    });
    var mailOptions = {
        from: 'random_usernmae',
        to: recipient,
        cc: cc,
        subject: subject,
        html: html,
        attachments: []
    };
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
    console.log('Called verify from API service');
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
