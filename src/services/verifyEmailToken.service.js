import db from "../config/db.js";

export const validarToken = async ({ token, user_id }) => {
  const [rows] = await db.query(
    `SELECT user_id FROM email_verification_tokens 
         WHERE user_id = ? 
         AND token = ? 
         AND expires_at > NOW()
         LIMIT 1`,
    [user_id, token],
  );

  if (rows.length === 0) {
    throw new Error("Token inválido ou Expirado!");
  }

  await db.query(`UPDATE users SET email_verified_at = NOW() WHERE id = ?`, [
    user_id,
  ]);

  await db.query(`DELETE FROM email_verification_tokens WHERE user_id = ?`, [
    user_id,
  ]);

  return {
    success: true,
    message: "Email verified successfully.",
  };
};
