import { Router } from 'express';
import { postLogin } from '../controllers/usuarioController.js';

const router = Router();

router.post('/login', postLogin);

export default router;