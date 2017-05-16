'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'bot@whatspromo.com',
        pass: 'hip0p0tam0emailbot'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});




module.exports = {
    testEmail: function (req, res) {

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"WhatsPromo Email Bot 👻" <no-contestar@whatspromo.com>', // sender address
            to: 'dacripo@gmail.com, dpopescu@whatspromo.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world ?', // plain text body
            html: '<b>Hello world ?👻</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    message: 'Error when sending email',
                    error: error
                });
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
              return res.status(200).json({
                    message: 'Email successfully sent',
                    details: 'ID: '+ info.messageId + ' -- Response: ' + info.response
                });
        });
    },
    sendEmail: function (mailOptions) {
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }
}