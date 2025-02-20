import mongoose from 'mongoose';

const DayOverviewSchema = new mongoose.Schema(
    {
        studyPlanId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StudyPlan',
            required: true
        },
        dayOverviewStatus: {
            type: String,
            default: "pending",
            enum: ['pending', 'inProgress', 'overDue', 'completed'],
        },
        date: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        activities: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity'
        }] // Reference to activities
    },
    {
        timestamps: true
    }
);

const DayOverview = mongoose.model('DayOverview', DayOverviewSchema);

export default DayOverview;