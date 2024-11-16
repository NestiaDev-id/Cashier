// const Nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
// const { MailtrapTransport } = require("mailtrap");
import { MailtrapClient} from "mailtrap";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from.env file


export const mailtrapClient = new MailtrapClient({
    endpoint: process.env.MAILTRAP_ENDPOINT, 
    token: process.env.MAILTRAP_TOKEN
})

export const sender = {
    email: "scapa@demomailtrap.com",
    name: "Scapa POS"
}

// Email Sending Function
// async function sendEmail(recipientEmail) {
//     if (!recipientEmail) {
//         console.error("Recipient email is missing!");
//         return;
//     }

//     try {
//         const response = await mailtrapClient.send({
//             from: sender,
//             to: [{ email: recipientEmail }], // Ensure this is an array with valid email objects
//             subject: "Verification Email",
//             text: "Please verify your email address by clicking the link below.",
//             html: "<p>Please verify your email address by clicking the link below.</p>",
//         });

//         console.log("Email sent successfully:", response);
//     } catch (error) {
//         console.error("Error sending email:", error.message);
//     }
// }

// // Call the sendEmail function with a valid recipient email
// sendEmail("al.gendon39@gmail.com");