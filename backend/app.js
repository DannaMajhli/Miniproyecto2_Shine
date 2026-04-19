import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';                          // <-- este
import { fileURLToPath } from 'url';
import productosRoutes from './routes/productosRoutes.js';
import contactoRoutes from './routes/contactoRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/api', productosRoutes);
app.use('/api', contactoRoutes);
app.use('/api', usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));