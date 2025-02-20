import asyncHandler from 'express-async-handler';
import StudyPlan from '../models/studyPlanModel.js';
import DayOverview from '../models/dayOverviewModel.js';
import Activity from '../models/activityModel.js';

// @desc        Add study plan
// route        POST /api/user/add-study-plan
// @access      Private
const addStudyPlan = asyncHandler(async (req, res) => {
    const { userId, levelOfExpertise, studyDays, studyDuration, topic, totalTimeCommitment, assessment, dayOverview } = req.body;

    if (!userId) {
        res.status(400);
        throw new Error('User ID is required');
    }

    const newStudyPlan = new StudyPlan({
        userId,
        levelOfExpertise,
        studyDays,
        studyDuration,
        topic,
        totalTimeCommitment,
        assessment,
    })
    await newStudyPlan.save();

    if (newStudyPlan) {
        // Create Day Overviews and Activities
        const dayOverviewDocs = await Promise.all(dayOverview.map(async (day) => {
            const dayOverview = new DayOverview({
                studyPlanId: newStudyPlan._id,
                date: day.date,
                duration: day.duration
            });

            await dayOverview.save();

            // Create Activities for the Day Overview
            const activityDocs = await Promise.all(day.activities.map(async (activity) => {
                if (activity.type === "Break") {
                    return null;
                }

                const newActivity = new Activity({
                    dayOverviewId: dayOverview._id,
                    type: activity.type,
                    time: activity.time,
                    activity: activity.activity
                });

                return await newActivity.save();
            }));
            const filteredActivityDocs = activityDocs.filter(activity => activity !== null);
            dayOverview.activities = filteredActivityDocs.map(a => a._id);
            await dayOverview.save();

            return dayOverview._id;
        }));

        // Update StudyPlan with Day Overview IDs
        newStudyPlan.dayOverview = dayOverviewDocs.map(a => a._id);
        await newStudyPlan.save();

        res.status(201).json({
            message: "Study plan added successfully!",
            data: {
                _id: newStudyPlan._id,
            }
        });
    } else {
        res.status(400);
        throw new Error('Failed to create study plan');
    }
});

export {
    addStudyPlan,
};