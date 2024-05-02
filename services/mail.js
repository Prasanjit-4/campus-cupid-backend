import nodemailer from "nodemailer";
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(recipient, token) {
    // send mail with defined transport object
    console.log(token);
    const info = await transporter.sendMail({
        from: '"Campus Cupid App" <campuscupid1@gmail.com>', // sender address
        to: recipient, // list of receivers
        subject: "Login to Campus Cupid", // Subject line
        text: `Token: ${token}`, // plain text body with token
        html: `<b><a href="www.campuscupid.social/api/users/login/${token}">Login</a></b>`, // html body with token
    });

    return info.messageId;
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

async function sendInviteMail(recipient, token) {
    // send mail with defined transport object
    console.log(token);
    const info = await transporter.sendMail({
        from: '"Campus Cupid App" <campuscupid1@gmail.com>', // sender address
        to: recipient, // list of receivers
        subject: "Install Campus Cupid", // Subject line
        text: `Token: ${token}`, // plain text body with token
        html: `<b><a href="http://campus-cupid-site.s3-website-us-east-1.amazonaws.com/">Installer Link</a></b>`, // html body with token
    });

    return info.messageId;
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

export { sendMail };
export { sendInviteMail };