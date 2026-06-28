import { Router } from 'express';
import { getStaff, createStaff, getShifts, createShift } from '../controllers/hr.controller.js';
const router = Router();
router.get('/staff', getStaff);
router.post('/staff', createStaff);
router.get('/shifts', getShifts);
router.post('/shifts', createShift);
export default router;
