const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.post(
        'api/surveys', requireLogin, requireCredits, (res,req) => {
            const {title, subject, body, recipients} = req.body;
            
            const survey = new Survey({
                title, //because the key and the attribute are the same ES6 syntax permits this shortcut
                subject,
                body,
                recipients: recipients.split(',').map(email => ({ email: email.trim() })),
                _user: req.user.id,
                dateSent: Date.now()
            });

            //Great place to send an email!
            const mailer = new Mailer(survey,  surveyTemplate(survey));
    });
};