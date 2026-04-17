import { Router } from 'express';
import { getProductos, getProductoPorId, postProducto } from '../controllers/productosController.js';

const router = Router();

router.get('/productos', getProductos);          // GET todos
router.get('/productos/:id', getProductoPorId);  // GET por ID
router.post('/productos', postProducto);         // POST nuevo

export default router;