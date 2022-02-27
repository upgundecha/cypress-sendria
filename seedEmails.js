const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: process.argv[2] || 'localhost',
    port: process.argv[3] || 1025,
    ignoreTLS: true,
});

const emails = [
    {
        from: "info@example.com",
        to: "joe@example.com",
        subject: "Test Email",
        text: "This is test email.",
    },
    {
        from: "info@example.com",
        to: "foo@example.com",
        subject: "Test Email",
        text: "This is test email.",
    },
    {
        from: "info@example.com",
        to: "foo@example.com",
        subject: "Another test email",
        text: "This is test email.",
    },
    {
        from: "info@example.com",
        to: "bar@example.com",
        subject: "Confirmation email",
        html: "<p>This is a confirmation email.</p><a href=\"http://localhost:1080\">Click here</a>",
    }
];

emails.forEach(sendEMail);

function sendEMail(item) {
    transporter.sendMail(item, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}