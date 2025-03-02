import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { addStudyPlan, deleteStudyPlan, getStudyPlanInfo, getStudyPlanList, overLappingStudyPlan, updateStudyPlanActivity } from '../controllers/studyPlanController.js';

router.use(protect);

router.post('/overlapping', overLappingStudyPlan);
router.post('/add', addStudyPlan);
router.get('/list/:id', getStudyPlanList);
router.route('/:id')
    .get(getStudyPlanInfo)
    .put(updateStudyPlanActivity)
    .delete(deleteStudyPlan);

export default router;