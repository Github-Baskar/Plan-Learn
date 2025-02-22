export const getAddStudyPlanConfig = () => ({
    url: `/api/study-plan/add`,
})
export const getStudyPlanListConfig = () => ({
    url: `/api/study-plan`,
})
export const getStudyPlanInfoConfig = (id:string) => ({
    url: `/api/study-plan/${id}`,
})