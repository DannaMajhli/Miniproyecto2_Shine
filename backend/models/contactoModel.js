import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

export const guardarContacto = async (contacto) => {
  const { nombre, email, mensaje } = contacto;
  const [result] = await pool.query(
    'INSERT INTO contactos (nombre, email, mensaje) VALUES (?,?,?)',
    [nombre, email, mensaje]
  );
  return result;
};