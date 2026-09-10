import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "172.30.0.11",
  user: "koldan_user",
  password: "G+NDoDxY.q_3vR",
  database: "koldan_banco",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;