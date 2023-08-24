import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'facebookon7@gmail.com',
        pass: 'xwcyrmvlqvjuqspt'
    }
});

const sendMail = (to, subject, user) => {
    fs.readFile(path.resolve() + `/public/templates/forgot-password.html`, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        // data = data.replace(/###URL###/g, process.env.ACTIVATE_ACCOUNT_BASE_URL);
        data = data.replace(/###URL###/g, `${process.env.ACTIVATE_ACCOUNT_BASE_URL}/${to}`);
        data = data.replace(/###EMAIL###/g, to);

        const email = {
            from: '2cube-studio.com', // Sender address
            to: to,         // List of recipients
            subject: subject, // Subject line
            html: data
        };
        transporter.sendMail(email, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log(info);
            }
        });
    });
};

export default sendMail;