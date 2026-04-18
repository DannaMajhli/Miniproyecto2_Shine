import { Router } from 'express';
import { getProductos, getProductoPorId, postProducto } from '../controllers/productosController.js';

const router = Router();

router.get('/productos', getProductos);
router.get('/productos/:id', getProductoPorId);
router.post('/productos', postProducto);

export default router;