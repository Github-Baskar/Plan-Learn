import mongoose from "mongoose";

const studyPlanSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        studyPlanStatus: {
            type: String,
            default: "pending",
            enum: ['pending', 'inProgress', 'overDue', 'completed'],
        },
        levelOfExpertise: {
            type: String,
            required: true
        },
        studyDays: {
            type: [String],
            required: true
        },
        studyDuration: {
            type: String,
            required: true
        },
        topic: {
            type: String,
            required: true
        },
        totalTimeCommitment: {
            type: String,
            required: true
        },
        assessment: {
            methods: { type: [String], required: true },
            frequency: { type: String, required: true }
        },
        dayOverview: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DayOverview'
        }] // Reference to activities
    },
    {
        timestamps: true
    }
);

const StudyPlan = mongoose.model("StudyPlan", studyPlanSchema);

export default StudyPlan;