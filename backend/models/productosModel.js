import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

export const obtenerTodos = async () => {
  const [rows] = await pool.query('SELECT * FROM productos');
  return rows;
};

export const obtenerPorId = async (id) => {
  const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
  return rows[0];
};

export const crearProducto = async (producto) => {
  const { nombre, descripcion, precio, img, categoria, stock } = producto;
  const [result] = await pool.query(
    'INSERT INTO productos (nombre, descripcion, precio, img, categoria, stock) VALUES (?,?,?,?,?,?)',
    [nombre, descripcion, precio, img, categoria, stock]
  );
  return result;
};