import { Router } from 'express';
import { getMemberships, createMembership, getDocuments, createDocument } from '../controllers/crm.controller.js';
const router = Router();
router.get('/memberships', getMemberships);
router.post('/memberships', createMembership);
router.get('/documents', getDocuments);
router.post('/documents', createDocument);
export default router;
