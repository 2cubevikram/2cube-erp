import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import jwt from "jsonwebtoken";


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

const sendMail = async (to, subject, user) => {
    // Generate a token with expiration time of x minutes
    const token = await generateToken(user, 1);

    fs.readFile(path.resolve() + `/public/templates/forgot-password.html`, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        data = data.replace(/###URL###/g, `${process.env.ACTIVATE_ACCOUNT_BASE_URL}/${token}`);
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

const generateToken = (userId) => {
    const secretKey = process.env.SECRET_JWT || "";
    return jwt.sign({user_id: userId.toString()}, secretKey, {
        expiresIn: '5m'
    });
};



export default sendMail;