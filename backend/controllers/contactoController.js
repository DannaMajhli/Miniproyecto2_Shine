import * as Modelo from '../models/contactoModel.js';

export const postContacto = async (req, res) => {
  try {
    const resultado = await Modelo.guardarContacto(req.body);
    res.status(201).json({ mensaje: 'Mensaje enviado', id: resultado.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};