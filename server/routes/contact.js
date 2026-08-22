import { Router } from 'express';
import { submitContact } from '../controllers/contact_controller.js';

const router = Router();

router.post('/', submitContact);

export default router;
