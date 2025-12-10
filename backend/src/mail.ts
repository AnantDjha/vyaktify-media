import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config();

type SendMailFunction = (email: string, subject: string, text: string, html: string) => Promise<boolean>;


const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 465,
    secure: true, // use SSL
    auth: {
        // user: "aayushjha0112@gmail.com",
        // pass: "ktfn tohw kaxu hyds",
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string,
    },
});

const sendMail: SendMailFunction = async (email, subject, text, html) => {
    const mailOptions = {
        from: `'Vyaktify media' <${process.env.EMAIL_ID as string}>`,
        to: email,
        subject: subject,
        text: text,
        html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

export default sendMail;
