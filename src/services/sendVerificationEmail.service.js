import crypto from "crypto";
import nodemailer from "nodemailer";
import { dirname } from "path";
import { fileURLToPath } from "url";
import db from "../config/db.js";

function gerarCodigoVerificacao() {
  return crypto.randomBytes(4).toString("hex");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
console.log("EMAIL_USER:", process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
});

export const verificarEmail = async (emailDestino, user_id) => {
  const token = gerarCodigoVerificacao();

  await db.query("DELETE FROM email_verification_tokens WHERE user_id = ?", [
    user_id,
  ]);

  await db.query(
    `INSERT INTO email_verification_tokens 
         (user_id, token, expires_at) 
         VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))`,
    [user_id, token],
  );

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
        <p>Hello,</p>
        <p>We received an email verification request. Please use the code below:</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 24px 0;">
            ${token}
        </p>
        <p>If you did not request this, please ignore this email.</p>
    </div>
    `;

  try {
    await transporter.sendMail({
      from: `"KOLDAN" <${process.env.EMAIL_USER}>`,
      to: emailDestino,
      subject: "Email Verification",
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Falha ao enviar email." };    
    //throw new Error("Falha ao enviar email.");
  }
};
