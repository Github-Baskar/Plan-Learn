export const getAddStudyPlanConfig = () => ({
    url: `/api/study-plan/add`,
})
export const getStudyPlanListConfig = (id:string) => ({
    url: `/api/study-plan/list/${id}`,
})
export const getStudyPlanInfoConfig = (id:string) => ({
    url: `/api/study-plan/${id}`,
})