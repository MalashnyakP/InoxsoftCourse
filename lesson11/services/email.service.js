const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { config, errors: { BAD_REQUEST: { WRONG_TEMPLATE } } } = require('../configs');
const ErrorHandler = require('../errors/ErrorsHandler');
const templates = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_NAME_CREDENTIAL,
        pass: config.EMAIL_PASS_CREDENTIAL
    }
});

const sendEmail = async (userEmail, emailAction, context = {}) => {
    const templateToSend = templates[emailAction];
    context = { ...context, frontendURL: config.FRONTEND_URL };

    if (!templateToSend) {
        throw new ErrorHandler(WRONG_TEMPLATE.status_code, WRONG_TEMPLATE.custom_code, WRONG_TEMPLATE.msg);
    }

    const { templateName, subject } = templateToSend;

    const html = await templateParser.render(templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userEmail,
        subject,
        html
    });
};

module.exports = {
    sendEmail
};
