import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { authUser, signoutUser, registerUser } from '../controllers/userController.js';
import { addStudyPlan } from '../controllers/studyPlanController.js';

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/signout', signoutUser);
router.post('/add-study-plan', protect, addStudyPlan);

export default router;