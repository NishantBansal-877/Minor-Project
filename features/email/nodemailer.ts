import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlTemplate = await fs.readFile(
  path.join(__dirname, "email.html"),
  "utf-8",
);

export const sendEmail = async (
  receiverEmail: string,
  receiverName: string,
  otp: string,
) => {
  console.log(receiverEmail, receiverName, otp);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"LIS" <${process.env.EMAIL_USER}>`,
    to: `${receiverEmail}`,
    subject: "Verify your email address",
    text: `Thanks for signing up!

Your verification code is: ${otp}

If you didn’t create this account, you can safely ignore this email.`,
    html: htmlTemplate
      .replace("{{otp}}", otp)
      .replace("{{name}}", receiverName),
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Email sent:", info.messageId);
};
