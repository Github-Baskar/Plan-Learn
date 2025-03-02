import mongoose from "mongoose";

const studyPlanSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
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
        duration: {
            type: {
                start: Date,
                end: Date,
            },
            required: true
        },
        studyTime: {
            type: String,
            required: true
        },
        time: {
            type: {
                start: String,
                end: String,
            },
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
        learningResources: {
            articlesAndJournals: [{
                description: String,
                link: String,
                thumbnail: String,
                title: String
            }],
            books: [{
                title: String,
                author: String,
                description: String,
                image: String,
            }],
            onlineCourses: [{
                title: String,
                description: String,
                link: String,
                platform: String,
                thumbnail: String,
            }],
            videosAndDocumentaries: [{
                title: String,
                description: String,
                link: String,
                platform: String,
                thumbnail: String,
            }]
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