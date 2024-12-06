import { Router } from "express";
import { verifyToken } from '../controller/public'

const router = Router();

router.use(verifyToken);
router.get('/');
router.get('/:id');
router.post('/');
router.delete('/:id');
router.put('/:id');

export default router;