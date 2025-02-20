import { toast } from "react-toastify";
import { NavigateFunction } from 'react-router-dom';
import { axios, getError } from "../../lib";
// import { chatSession } from "../../utilities/aiModel";
import { AppDispatch, getGenerateStudyPlanDispatch, setAddPlanLoading, setGenerateStudyPlanLoading } from "..";
import { ResponseData } from "../../utilities/dataResponse";
import { getAddStudyPlannerConfig } from "../../lib/requests/studyPlanner";
import { PlannerResponseDataType } from "../../types";

export const getGenerateStudyPlan = (ai_prompt: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setGenerateStudyPlanLoading(true));
        try {
            // const result = await chatSession.sendMessage(ai_prompt);
            // const response = result.response.text();
            dispatch(getGenerateStudyPlanDispatch(ResponseData));
            toast.success("Study plan generated successfully");
        } catch (error) {
            toast.error(getError(error = {}));
        } finally {
            dispatch(setGenerateStudyPlanLoading(false));
        }
    };
};

export const addStudyPlan = (data: Omit<PlannerResponseDataType, "significance" | "applications" | "learningObjectives" | "adjustments">, navigate: NavigateFunction) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setAddPlanLoading(true));
        try {
            const { url } = getAddStudyPlannerConfig();
            const res = await axios.post(url, data);
            console.log(res, "res")
            toast.success("Study plan added successfully");
            navigate('/my-plans')
        } catch (error) {
            toast.error(getError(error = {}));
        } finally {
            dispatch(setAddPlanLoading(false));
        }
    };
};