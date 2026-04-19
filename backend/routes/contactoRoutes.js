import { Router } from 'express';
import { postContacto } from '../controllers/contactoController.js';

const router = Router();

router.post('/contacto', postContacto);

export default router;