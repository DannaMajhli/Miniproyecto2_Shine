import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// GET todos los productos
export const obtenerTodos = async () => {
  const [rows] = await pool.query('SELECT * FROM productos');
  return rows;
};

// GET un producto por ID
export const obtenerPorId = async (id) => {
  const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
  return rows[0];
};

// POST nuevo producto
export const crearProducto = async (producto) => {
  const { nombre, descripcion, precio, imagen, categoria, stock } = producto;
  const [result] = await pool.query(
    'INSERT INTO productos (nombre, descripcion, precio, imagen, categoria, stock) VALUES (?,?,?,?,?,?)',
    [nombre, descripcion, precio, imagen, categoria, stock]
  );
  return result;
};