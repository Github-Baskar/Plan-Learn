import express from 'express';
const router = express.Router();
import { authUser, signoutUser, registerUser } from '../controllers/userController.js';

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/signout', signoutUser);

export default router;