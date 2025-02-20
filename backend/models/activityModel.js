import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema(
    {
        dayOverviewId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DayOverview',
            required: true
        },
        isComplete: {
            type: Boolean,
            default: false,
        },
        isOverDue: {
            type: Boolean,
            default: false,
        },
        activity: {
            type: String,
            required: true
        },
        time: {
            type: String,
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