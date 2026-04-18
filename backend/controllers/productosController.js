import * as Modelo from '../models/productosModel.js';

export const getProductos = async (req, res) => {
  try {
    const productos = await Modelo.obtenerTodos();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductoPorId = async (req, res) => {
  try {
    const producto = await Modelo.obtenerPorId(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const postProducto = async (req, res) => {
  try {
    const resultado = await Modelo.crearProducto(req.body);
    res.status(201).json({ mensaje: 'Producto creado', id: resultado.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};