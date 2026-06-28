import { Router } from 'express';
import { getExpenses, createExpense } from '../controllers/finance.controller.js';
const router = Router();
router.get('/expenses', getExpenses);
router.post('/expenses', createExpense);
export default router;
