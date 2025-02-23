import { AddPlannerDataType } from "../types";

export const menuList = [
    {
        path: 'create',
        name: 'Create New Plan ✍️',
        authRoute: false
    },
    {
        path: 'my-plans',
        name: 'My Plans 📅',
        authRoute: false
    },
]

export const generateAiPrompt = ({ topic, level, dateRange, timeRange, schedule }: AddPlannerDataType): string => {
    const startDate = dateRange[0],
        endDate = dateRange[1],
        startTime = timeRange[0],
        endTime = timeRange[1];
    const preferredDays = schedule.join(', ');
    let prompt = `Design a personalized study plan based on the user's preferences, topic-${topic}, level of expertise-${level}, and desired schedule duration- ${startDate} to ${endDate} (${startTime} to ${endTime})  (${preferredDays}).The study plan should include the following components: 1.User Profile Input: - Topic of interest (e.g., Mathematics, History, Programming) - Level of expertise (e.g., Beginner, Intermediate, Advanced) - Preferred study duration (e.g., daily, weekly, monthly) - Total duration for study plan (e.g., 5 hrs) 2.Nature of the Topic: - Provide a brief overview of the chosen topic, including its significance and applications.3.Learning Objectives: - Outline clear learning objectives for the study plan aligned with the user's level and goals.4.Study Schedule: - Create a detailed schedule that breaks down the study plan into manageable sessions in day overview breakdown only and activities has time, type, activity for each activities, including: - Duration of each session - Frequency of study sessions (daily, weekly) - Breaks and review sessions 5.Learning Resources: - Recommend a diverse range of learning resources, including: - Books (titles, authors, links and descriptions) - Online courses (titles, platforms, links and descriptions) - Videos or documentaries (titles, platforms, links and descriptions) - Articles or journals (titles, platforms, links and descriptions) 6.Assessment: - Include methods for self-assessment to evaluate progress, such as quizzes, practice tests, or projects.7.Adjustments: - Provide guidance on how to modify the study plan based on progress and feedback.Ensure the study plan is clear, organized, and tailored to the unique preferences and needs of the user, and presents the information in a JSON format.`
    return prompt;
}

export const dayNameToNumber: { [key: string]: number } = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
};

export const expertiseLevelOptions = [
    {
        label: 'Begineer',
        value: 'Begineer'
    },
    {
        label: 'Intermediate',
        value: 'Intermediate'
    },
    {
        label: 'Advanced',
        value: 'Advanced'
    }
]

export const daysOptions = [
    {
        label: 'Monday',
        value: 'Monday'
    },
    {
        label: 'Tuesday',
        value: 'Tuesday'
    },
    {
        label: 'Wednesday',
        value: 'Wednesday'
    },
    {
        label: 'Thursday',
        value: 'Thursday'
    },
    {
        label: 'Friday',
        value: 'Friday'
    },
    {
        label: 'Saturday',
        value: 'Saturday'
    },
    {
        label: 'Sunday',
        value: 'Sunday'
    }
]