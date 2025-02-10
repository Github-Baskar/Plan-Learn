import { FormDate } from "../types";

export const menuList = [
    {
        path: 'create',
        name: 'Create New Plan ✍️',
        authRoute: true
    },
    {
        path: 'my-plans',
        name: 'My Plans 📅',
        authRoute: true
    },
]

export const generateAiPrompt = ({ topic, level, dateRange, schedule }: FormDate): string => {
    const startDate = dateRange[0];
    const endDate = dateRange[1];
    const preferredDays = schedule.join(', ');
    let prompt = `Design a personalized study plan based on the user's preferences, topic-${topic}, level of expertise-${level}, and desired schedule duration- ${startDate} to ${endDate} (${preferredDays}).The study plan should include the following components: 1.User Profile Input: - Topic of interest (e.g., Mathematics, History, Programming) - Level of expertise (e.g., Beginner, Intermediate, Advanced) - Preferred study duration (e.g., daily, weekly, monthly) - Total time commitment (e.g., number of hours per week) 2.Nature of the Topic: - Provide a brief overview of the chosen topic, including its significance and applications.3.Learning Objectives: - Outline clear learning objectives for the study plan aligned with the user's level and goals.4.Study Schedule: - Create a detailed schedule that breaks down the study plan into manageable sessions, including: - Duration of each session - Frequency of study sessions (daily, weekly) - Breaks and review sessions 5.Learning Resources: - Recommend a diverse range of learning resources, including: - Books (images, titles, authors, and brief descriptions) - Online courses (thumbnails, platforms, course titles, and links) - Videos or documentaries (thumbnails, platforms and links) - Articles or journals (thumbnails, titles and links) 6.Assessment: - Include methods for self-assessment to evaluate progress, such as quizzes, practice tests, or projects.7.Adjustments: - Provide guidance on how to modify the study plan based on progress and feedback.Ensure the study plan is clear, organized, and tailored to the unique preferences and needs of the user, and presents the information in a JSON format.`;
    return prompt;
}
