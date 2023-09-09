import nodemailer from "nodemailer";
import env from "dotenv";
env.config();

export default nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    tls:{
        rejectUnauthorized: false   
    }
});
