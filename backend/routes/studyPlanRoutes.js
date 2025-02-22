import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { addStudyPlan, deleteStudyPlan, getStudyPlanInfo, getStudyPlanList, updateStudyPlanActivity } from '../controllers/studyPlanController.js';

router.use(protect);

router.post('/add', addStudyPlan);
router.get('/', getStudyPlanList);
router.route('/:id')
    .get(getStudyPlanInfo)
    .put(updateStudyPlanActivity)
    .delete(deleteStudyPlan);

export default router;