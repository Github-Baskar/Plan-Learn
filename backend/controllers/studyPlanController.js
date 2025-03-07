import asyncHandler from 'express-async-handler';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import isBetween from 'dayjs/plugin/isBetween.js';

import StudyPlan from '../models/studyPlanModel.js';
import DayOverview from '../models/dayOverviewModel.js';
import Activity from '../models/activityModel.js';
import { extractFormattedDate, formatDateString, formatTimeString, isActivityOverdue } from '../utils/helper.js';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

const checkOverlappingStudyPlans = async (userId, schedule, dateRange, timeRange) => {
    // Parse dateRange into start and end dates
    const [startDateStr, endDateStr] = dateRange;
    const startDate = dayjs(startDateStr, 'DD-MM-YYYY').format("YYYY-MM-DD");
    const endDate = dayjs(endDateStr, 'DD-MM-YYYY').format("YYYY-MM-DD");

    // Parse timeRange into start and end times
    const [startTimeStr, endTimeStr] = timeRange;
    const startTime = dayjs(startTimeStr, "hh:mm A").format("HH:mm");
    const endTime = dayjs(endTimeStr, "hh:mm A").format("HH:mm");

    // Ensure schedule is an array
    if (!Array.isArray(schedule)) {
        throw new Error('Schedule must be an array');
    }

    // Query the database for overlapping study plans
    const overlappingPlans = await StudyPlan.find({
        userId,
        studyDays: { $in: schedule },
        $and: [
            {
                // Duration overlapping conditions
                $or: [
                    {
                        // Case 1: New plan starts during an existing plan
                        'duration.start': { $lte: startDate },
                        'duration.end': { $gte: startDate },
                    },
                    {
                        // Case 2: New plan ends during an existing plan
                        'duration.start': { $lte: endDate },
                        'duration.end': { $gte: endDate },
                    },
                    {
                        // Case 3: New plan completely overlaps an existing plan
                        'duration.start': { $gte: startDate },
                        'duration.end': { $lte: endDate },
                    },
                ],
            },
            {
                // Time overlapping conditions (evaluated only if duration overlapping occurs)
                $or: [
                    {
                        // Check if new time overlaps with an existing time slot
                        $and: [
                            { 'time.start': { $lt: endTime } },
                            { 'time.end': { $gt: startTime } }
                        ]
                    },
                    { 'time.start': startTime }, // Exact match on start time
                    { 'time.end': endTime } // Exact match on end time
                ],
            }
        ]
    });

    return overlappingPlans;
};

// @desc        Checking study plan overlapping
// route        POST /api/study-plan/overlapping
// @access      Private
const overLappingStudyPlan = asyncHandler(async (req, res) => {
    const { userId, dateRange, schedule, timeRange } = req.body;

    if (!userId) {
        res.status(400);
        throw new Error('User ID is required');
    }

    const overlappingPlans = await checkOverlappingStudyPlans(userId, schedule, dateRange, timeRange);

    if (overlappingPlans.length > 0) {
        res.status(400);
        throw new Error('Study plan is overlapping with existing study plan');
    } else {
        res.status(200).json({
            message: "No overlapping study plans found",
        });
    }
});

// @desc        Add study plan
// route        POST /api/study-plan/add
// @access      Private
const addStudyPlan = asyncHandler(async (req, res) => {
    const { userId, levelOfExpertise, studyDays, studyDuration, studyTime, topic, totalTimeCommitment, assessment, dayOverview, learningResources } = req.body;

    if (!userId) {
        res.status(400);
        throw new Error('User ID is required');
    }

    const [startDate, endDate] = formatDateString(studyDuration);
    const [startTime, endTime] = formatTimeString(studyTime);
    const duration = {
        start: extractFormattedDate(startDate),
        end: extractFormattedDate(endDate),
    }
    const time = {
        start: dayjs(startTime, "hh:mm A").format("HH:mm"),
        end: dayjs(endTime, "hh:mm A").format("HH:mm"),
    }

    const newStudyPlan = new StudyPlan({
        userId,
        levelOfExpertise,
        studyDays,
        studyDuration: `${startDate && endDate ? `${startDate} - ${endDate}` : ''}`,
        duration,
        studyTime,
        time,
        topic,
        totalTimeCommitment,
        assessment,
        learningResources,
    })
    await newStudyPlan.save();

    if (newStudyPlan) {
        // Create Day Overviews and Activities
        const dayOverviewDocs = await Promise.all(dayOverview.map(async (day, dayIndex) => {
            const dayOverview = new DayOverview({
                studyPlanId: newStudyPlan._id,
                date: day.date,
                duration: day.duration
            });

            await dayOverview.save();

            // Create Activities for the Day Overview
            const activityDocs = await Promise.all(day.activities.map(async (activity, activityIndex) => {
                if (activity.type === "Break") {
                    return null;
                }

                const newActivity = new Activity({
                    studyPlanId: newStudyPlan._id,
                    dayOverviewId: dayOverview._id,
                    isDisable: dayIndex !== 0 || activityIndex !== 0,
                    type: activity.type,
                    time: activity.time,
                    date: extractFormattedDate(day.date),
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
        });
    } else {
        res.status(400);
        throw new Error('Failed to create study plan');
    }
});

// @desc        Get study plan
// route        GET /api/study-plan
// @access      Private
const getStudyPlanList = asyncHandler(async (req, res) => {
    const { id } = req.params
    const studyPlanList = await StudyPlan.find({ userId: id }, {
        _id: 1,
        topic: 1,
        studyDuration: 1,
        studyTime: 1,
        studyDays: 1,
        levelOfExpertise: 1,
        totalTimeCommitment: 1,
        dayOverview: 1,
        createdAt: 1,
    }).lean();
    if (!studyPlanList) {
        res.status(204);
        throw new Error('No records')
    }
    const data = await Promise.all(
        studyPlanList.map(async (studyPlan) => {
            let allCompleted = true;
            let allPending = true;
            let isOverdue = false;

            const dayOverviews = await Promise.all(
                studyPlan.dayOverview.map(async (overviewId) => {
                    return await DayOverview.findById(overviewId, {
                        _id: 1,
                        activities: 1,
                    }).lean();
                })
            );

            const validDayOverviews = dayOverviews.filter(overview => overview !== null);

            const activityData = await Promise.all(
                validDayOverviews.flatMap(overview =>
                    overview.activities.map(async (activityId) => {
                        return await Activity.findById(activityId, {
                            _id: 1,
                            isComplete: 1,
                            time: 1,
                            date: 1,
                        }).lean();
                    })
                )
            );

            const validActivities = activityData.filter(activity => activity !== null);

            validActivities.forEach(activity => {
                if (!activity.isComplete) {
                    allCompleted = false;
                } else {
                    allPending = false;
                }
                if (!activity.isComplete && isActivityOverdue(activity)) {
                    isOverdue = true;
                }
            });

            let studyPlanStatus = 'Pending';
            if (allCompleted) {
                studyPlanStatus = 'Complete';
            } else if (!allPending) {
                studyPlanStatus = 'On Going';
            }
            if (isOverdue) {
                studyPlanStatus = 'Overdue';
            }

            const { dayOverview, ...rest } = studyPlan;
            return {
                ...rest,
                studyPlanStatus
            };
        })
    );

    if (Array.isArray(data) && data.length > 0) {
        res.status(200).json({
            message: '',
            response: data
        });
    } else {
        res.status(204);
        throw new Error('No records')
    }
});

// @desc        Get study plan info
// route        GET /api/study-plan/{id}
// @access      Private
const getStudyPlanInfo = asyncHandler(async (req, res) => {
    const { id } = req.params
    let data = {};
    let studyPlanStatus = 'Pending';

    const studyPlanInfo = await StudyPlan.findById(id, {
        _id: 1,
        topic: 1,
        studyDuration: 1,
        studyTime: 1,
        levelOfExpertise: 1,
        totalTimeCommitment: 1,
        studyDays: 1,
        assessment: 1,
        learningResources: 1,
        dayOverview: 1
    }).lean()
    if (!studyPlanInfo) {
        res.status(204);
        throw new Error('No records')
    }

    let allCompleted = true;
    let allPending = true;
    let isOverdue = false;
    const dayOverviewInfo = await Promise.all(
        studyPlanInfo.dayOverview.map(async (overviewId) => {
            const dayOverview = await DayOverview.findById(overviewId, {
                _id: 1,
                date: 1,
                duration: 1,
                activities: 1,
            }).lean();

            if (!dayOverview) return null;

            const activityData = await Promise.all(
                dayOverview.activities.map(async (activityId) => {
                    return await Activity.findById(activityId, {
                        _id: 1,
                        isComplete: 1,
                        isDisable: 1,
                        activity: 1,
                        time: 1,
                        date: 1,
                        type: 1,
                    }).lean();
                })
            );
            activityData.forEach(activity => {
                if (!activity.isComplete) {
                    allCompleted = false;
                } else {
                    allPending = false;
                }
                if (!activity.isComplete && isActivityOverdue(activity)) {
                    isOverdue = true;
                    return;
                }
            });

            if (allCompleted) {
                studyPlanStatus = 'Complete';
            } else if (!allPending) {
                studyPlanStatus = 'On Going';
            }
            if (isOverdue) {
                studyPlanStatus = 'Overdue';
            }

            return {
                ...dayOverview,
                activities: activityData,
            };
        })
    );
    if (studyPlanInfo && dayOverviewInfo) {
        data = { ...studyPlanInfo, studyPlanStatus, dayOverview: dayOverviewInfo }
        res.status(200).json({
            message: '',
            response: data
        });
    } else {
        res.status(204);
        throw new Error('No records')
    }
});

// @desc        Update study plan activity
// route        PUT /api/study-plan/{id}
// @access      Private
const updateStudyPlanActivity = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { isComplete, isDisable, nextId } = req.body
    let studyPlanStatus = 'Pending';
    let allCompleted = true;
    let allPending = true;
    let isOverdue = false;

    const activity = await Activity.findOneAndUpdate(
        { _id: id },
        { $set: { isComplete, isDisable } },
        { new: true } // Return updated document
    ).lean();
    if (nextId) {
        await Activity.updateOne(
            { _id: nextId },
            { $set: { isDisable: false } },
        );
    }
    const activityData = await Activity.find({ studyPlanId: activity.studyPlanId }, {
        _id: 1,
        isComplete: 1,
        isDisable: 1,
        time: 1,
        date: 1,
    }).lean();
    activityData.forEach(activity => {
        if (!activity.isComplete) {
            allCompleted = false;
        } else {
            allPending = false;
        }
        if (!activity.isComplete && isActivityOverdue(activity)) {
            isOverdue = true;
            return;
        }
    });
    if (allCompleted) {
        studyPlanStatus = 'Complete';
    } else if (!allPending) {
        studyPlanStatus = 'On Going';
    }
    if (isOverdue) {
        studyPlanStatus = 'Overdue';
    }

    if (activity) {
        const { _id, dayOverviewId, isDisable } = activity
        res.status(200).json({
            message: 'Activity updated successfully',
            response: {
                _id,
                dayOverviewId,
                isComplete,
                isDisable,
                studyPlanStatus,
            }
        });
    } else {
        res.status(204);
        throw new Error('No records')
    }
})

// @desc        Delete study plan
// route        DELETE /api/study-plan/{id}
// @access      Private
const deleteStudyPlan = asyncHandler(async (req, res) => {
    const { id } = req.params

    const studyPlanExists = await StudyPlan.findById(id);
    if (!studyPlanExists) {
        res.status(400);
        throw new Error('Study plan not exists');
    }

    await Promise.all([
        DayOverview.deleteMany({ studyPlanId: id }),
        Activity.deleteMany({ studyPlanId: id })
    ]);
    const studyPlan = await StudyPlan.findByIdAndDelete(id);

    if (studyPlan) {
        res.status(200).json({
            message: 'Study plan deleted successfully'
        });
    } else {
        res.status(204);
        throw new Error('No records')
    }
})

export {
    overLappingStudyPlan,
    addStudyPlan,
    getStudyPlanList,
    getStudyPlanInfo,
    updateStudyPlanActivity,
    deleteStudyPlan,
};