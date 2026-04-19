import * as Modelo from '../models/usuarioModel.js';

export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Modelo.login(email, password);
    if (usuario) {
      res.json({ ok: true, nombre: usuario.nombre });
    } else {
      res.status(401).json({ ok: false, mensaje: 'Credenciales incorrectas' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};