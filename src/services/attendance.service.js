import db from "../config/db.js";

export const scanAttendance = async ({ eventId, registration_number }) => {
  if (!eventId || !registration_number) {
    throw new Error("eventId e registration_number são obrigatórios.");
  }

  const [participants] = await db.query(
    `SELECT id, name, registration_number
     FROM participants
     WHERE registration_number = ?
     LIMIT 1`,
    [registration_number]
  );

  if (participants.length === 0) {
    throw new Error("Participante não encontrado.");
  }

  const participant = participants[0];

  const [linked] = await db.query(
    `SELECT id
     FROM event_participants
     WHERE event_id = ? AND participant_id = ?
     LIMIT 1`,
    [eventId, participant.id]
  );

  if (linked.length === 0) {
    throw new Error("Participante não inscrito neste evento.");
  }

  const [existing] = await db.query(
    `SELECT id, present
     FROM attendance_records
     WHERE event_id = ? AND participant_id = ?
     LIMIT 1`,
    [eventId, participant.id]
  );

  // Já tem registro E já está marcado como presente -> não faz nada de novo
  if (existing.length > 0 && existing[0].present === 1) {
    return {
      success: true,
      alreadyChecked: true,
      message: "Presença já registrada.",
      participant,
    };
  }

  // Já tem registro mas está como ausente -> atualiza pra presente
  if (existing.length > 0 && existing[0].present === 0) {
    await db.query(
      `UPDATE attendance_records
       SET present = 1, validation_method = 'barcode', checked_at = NOW()
       WHERE id = ?`,
      [existing[0].id]
    );

    return {
      success: true,
      alreadyChecked: false,
      message: "Presença confirmada.",
      participant,
    };
  }

  // Não tem registro nenhum ainda -> cria
  await db.query(
    `INSERT INTO attendance_records (event_id, participant_id, present, validation_method)
     VALUES (?, ?, 1, 'barcode')`,
    [eventId, participant.id]
  );

  return {
    success: true,
    alreadyChecked: false,
    message: "Presença confirmada.",
    participant,
  };
};