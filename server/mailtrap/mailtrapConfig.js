// const Nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
// const { MailtrapTransport } = require("mailtrap");
import { MailtrapClient} from "mailtrap";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from.env file


export const mailtrapClient = new MailtrapClient({endpoint: process.env.MAILTRAP_ENDPOINT, 
    token: process.env.MAILTRAP_TOKEN})

export const sender = {
    email: "scapa@demomailtrap.com",
    name: "Scapa POS"
}