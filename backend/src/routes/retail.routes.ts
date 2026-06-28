import { Router } from 'express';
import { getSuppliers, createSupplier, getEquipment, createEquipment } from '../controllers/retail.controller.js';

const router = Router();

router.get('/suppliers', getSuppliers);
router.post('/suppliers', createSupplier);
router.get('/equipment', getEquipment);
router.post('/equipment', createEquipment);

export default router;
