import { toast } from "react-toastify";
import { getError } from "../../lib";
import { chatSession } from "../../utilities/aiModel";
import { getGenerateStudyPlanDispatch, setGenerateStudyPlanLoading } from "../slices/studyPlannerSlice";
import { AppDispatch } from "..";
import { ResponseData } from "../../utilities/dataResponse";

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