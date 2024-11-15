// const Nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
// const { MailtrapTransport } = require("mailtrap");
import { MailtrapTransport} from "mailtrap";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from.env file

const TOKEN = process.env.MAILTRAP_TOKEN;

const transport = nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

const sender = {
  address: "scapa@demomailtrap.com",
  name: "Scapa POS",
};
const recipients = [
  "yohanesdevano90@gmail.com",
];

transport
  .sendMail({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    html: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);