import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

export const login = async (email, password) => {
  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE email = ? AND password = ?',
    [email, password]
  );
  return rows[0];
};