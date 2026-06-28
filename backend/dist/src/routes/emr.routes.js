import { Router } from 'express';
import { getMedicalRecords, createMedicalRecord, } from '../controllers/emr.controller.js';
const router = Router();
router.get('/medical-records', getMedicalRecords);
router.post('/medical-records', createMedicalRecord);
export default router;
