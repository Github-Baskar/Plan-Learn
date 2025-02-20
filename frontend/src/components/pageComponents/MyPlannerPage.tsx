import { DeleteIcon } from "../../icons/DeleteIcon"

const MyPlannerPage = () => {
    const planData = [
        {
            topic: "Web Development",
            studyPlanDuration: "1st Mar 2024 to 1st Jun 2024",
            levelOfExpertise: "Beginner",
            sessionDuration: "1 Hour",
            status: "Completed"
        },
        {
            topic: "Data Science",
            studyPlanDuration: "15th Feb 2024 to 15th Aug 2024",
            levelOfExpertise: "Intermediate",
            sessionDuration: "1.5 Hours",
            status: "Ongoing"
        },
        {
            topic: "Machine Learning",
            studyPlanDuration: "10th Jan 2024 to 10th May 2024",
            levelOfExpertise: "Advanced",
            sessionDuration: "2 Hours",
            status: "Completed"
        },
        {
            topic: "Cybersecurity",
            studyPlanDuration: "5th Apr 2024 to 5th Sep 2024",
            levelOfExpertise: "Beginner",
            sessionDuration: "1 Hour",
            status: "Completed"
        },
        {
            topic: "Cloud Computing",
            studyPlanDuration: "20th May 2024 to 20th Aug 2024",
            levelOfExpertise: "Intermediate",
            sessionDuration: "1.5 Hours",
            status: "Pending"
        }
    ]
    return (
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-3 gap-4 w-[80%] my-6">
                {
                    planData && Array.isArray(planData) && planData.length > 0 ?
                        planData.map((studyPlan, index) => {
                            return (
                                <div key={index} className="group relative bg-white shadow-lg rounded-2xl p-5 border border-gray-200 cursor-pointer w-full max-w-md transition-transform duration-300 hover:scale-105">
                                    <h2 className="text-lg font-semibold text-gray-700 transition-all duration-300 group-hover:text-blue-600  group-hover:underline">{studyPlan.topic}</h2>
                                    <p className="text-sm text-gray-500">{studyPlan.studyPlanDuration}</p>

                                    <div className="mt-3">
                                        <p className="text-gray-700">
                                            <span className="font-medium">Expertise:</span> {studyPlan.levelOfExpertise}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-medium">Session Duration:</span> {studyPlan.sessionDuration}
                                        </p>
                                        <span
                                            className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${studyPlan.status === "Completed"
                                                ? "bg-green-100 text-green-600"
                                                : studyPlan.status === "Ongoing"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : "bg-yellow-100 text-yellow-600"
                                                }`}
                                        >
                                            {studyPlan.status}
                                        </span>
                                    </div>
                                    <div className="absolute top-5 end-5">
                                        <DeleteIcon />
                                    </div>
                                </div>
                            )
                        }) : ''
                }
            </div>
        </div>
    )
}

export default MyPlannerPage