import { Router } from 'express';
import {
  getInventoryItems,
  getLowStockAlerts,
  createInventoryItem,
  updateInventoryItem,
} from '../controllers/inventory.controller.js';

const router = Router();

router.get('/', getInventoryItems);
router.get('/alerts', getLowStockAlerts);
router.post('/', createInventoryItem);
router.put('/:id', updateInventoryItem);

export default router;
