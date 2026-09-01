import bcrypt from "bcrypt";
import db from "../config/db.js";
import { gerarToken } from "../utils/token.js";
import { verificarEmail } from "./sendVerificationEmail.service.js";

export const register = async ({ name, email, cpf, password }) => {
  if (!name || !email || !cpf || !password) {
    throw new Error("Nome, email, CPF e senha são obrigatórios.");
  }

  if (cpf.length !== 11) {
    throw new Error("CPF inválido. Envie apenas os 11 números.");
  }

  const [existingUsers] = await db.query(
    `SELECT id, email, cpf
     FROM users
     WHERE email = ? OR cpf = ?
     LIMIT 1`,
    [email, cpf]
  );

  if (existingUsers.length > 0) {
    const existingUser = existingUsers[0];

    if (existingUser.email === email) {
      throw new Error("Esse email já está registrado.");
    }

    if (existingUser.cpf === cpf) {
      throw new Error("Esse CPF já está registrado.");
    }
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const [insertResult] = await db.query(
    `INSERT INTO users (name, email, cpf, password)
     VALUES (?, ?, ?, ?)`,
    [name, email, cpf, passwordHash]
  );

  const user = {
    id: insertResult.insertId,
    name,
    email,
    cpf,
  };

  // Dispara o email de verificação (não trava o cadastro se o envio falhar)
  const emailResult = await verificarEmail(user.email, user.id);
  if (!emailResult.success) {
    console.error("Falha ao enviar email de verificação:", emailResult.message);
  }

  const token = gerarToken(user);

  return {
    success: true,
    message: "Usuário cadastrado com sucesso.",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
    },
  };
};

export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email e senha são obrigatórios.");
  }

  const [rows] = await db.query(
    `SELECT id, name, email, cpf, password, active
     FROM users
     WHERE email = ?
     LIMIT 1`,
    [email]
  );

  if (rows.length === 0) {
    throw new Error("Email ou senha inválidos.");
  }

  const user = rows[0];

  if (!user.active) {
    throw new Error("Usuário inativo.");
  }

  let hash = user.password;

  if (hash.startsWith("$2y$")) {
    hash = "$2b$" + hash.slice(4);
  }

  const isPasswordValid = await bcrypt.compare(password, hash);

  if (!isPasswordValid) {
    throw new Error("Email ou senha inválidos.");
  }

  const token = gerarToken(user);

  return {
    success: true,
    message: "Login realizado com sucesso.",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
    },
  };
};