import { obtenerTodos, obtenerPorId, crearProducto } from '../models/productosModel.js';

export const getProductos = async (req, res) => {
  try {
    const data = await obtenerTodos();
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductoPorId = async (req, res) => {
  try {
    const data = await obtenerPorId(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const postProducto = async (req, res) => {
  try {
    const data = await crearProducto(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};