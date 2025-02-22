import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema(
    {
        studyPlanId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StudyPlan',
            required: true
        },
        dayOverviewId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DayOverview',
            required: true
        },
        isComplete: {
            type: Boolean,
            default: false,
        },
        isDisable: {
            type: Boolean,
            default: true,
        },
        activity: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Activity = mongoose.model('Activity', ActivitySchema);

export default Activity;