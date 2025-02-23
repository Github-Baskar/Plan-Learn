import { toast } from "react-toastify";
import { NavigateFunction } from 'react-router-dom';
import { axios, getError } from "../../lib";
import { chatSession } from "../../utilities/aiModel";
import { AppDispatch, getGenerateStudyPlanDispatch, getStudyPlanInfoDispatch, getStudyPlanListDispatch, setAddPlanLoading, setGenerateStudyPlanLoading, setStudyPlanInfoLoading, setStudyPlanListLoading } from "..";
import { getAddStudyPlanConfig, getStudyPlanInfoConfig, getStudyPlanListConfig } from "../../lib/requests/studyPlanner";
import { PlannerResponseDataType } from "../../types";

export const getGenerateStudyPlan = (ai_prompt: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setGenerateStudyPlanLoading(true));
        try {
            const result = await chatSession.sendMessage(ai_prompt);
            const response = result.response.text();
            dispatch(getGenerateStudyPlanDispatch(JSON.parse(response)));
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
            const { url } = getAddStudyPlanConfig();
            const res = await axios.post(url, data);
            toast.success(res.data?.message || "Study plan added successfully.");
            navigate('/my-plans')
            res.status === 201 && dispatch(getGenerateStudyPlanDispatch({}));
        } catch (error) {
            toast.error(getError(error = {}));
        } finally {
            dispatch(setAddPlanLoading(false));
        }
    };
};

export const getStudyPlanList = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(setStudyPlanListLoading(true));
        try {
            const { url } = getStudyPlanListConfig();
            const res = await axios.get(url);
            if (res.status === 200 && res?.data?.response) {
                dispatch(getStudyPlanListDispatch(res.data.response));
            }
        } catch (error) {
            toast.error(getError(error = {}));
        } finally {
            dispatch(setStudyPlanListLoading(false));
        }
    };
}

export const getStudyPlanInfo = (id: string, navigate?: NavigateFunction) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setStudyPlanInfoLoading(true));
        try {
            navigate && navigate(`/my-plans/${id}`)
            const { url } = getStudyPlanInfoConfig(id);
            const res = await axios.get(url);
            res?.data?.response && dispatch(getStudyPlanInfoDispatch(res.data.response));
        } catch (error) {
            toast.error(getError(error = {}));
        } finally {
            dispatch(setStudyPlanInfoLoading(false));
        }
    };
}

export const updateActivity = (params: { id: string }, data: { isComplete: boolean }, setStatus: React.Dispatch<React.SetStateAction<string>>) => {
    return async () => {
        try {
            const { url } = getStudyPlanInfoConfig(params?.id);
            const res = await axios.put(url, data);
            res?.data?.response?.studyPlanStatus && setStatus(res.data.response.studyPlanStatus);
            toast.success(res.data?.message || "Activity updated successfully.");
        } catch (error) {
            toast.error(getError(error = {}));
        }
    };
}

export const deleteStudyPlan = (id: string, navigate?: NavigateFunction) => {
    return async (dispatch: AppDispatch) => {
        navigate && dispatch(setStudyPlanInfoLoading(true));
        try {
            const { url } = getStudyPlanInfoConfig(id);
            const res = await axios.delete(url);
            if (navigate) {
                navigate('/my-plans')
            } else {
                dispatch(setStudyPlanListLoading(true));
                dispatch(getStudyPlanListDispatch([]));
                dispatch(getStudyPlanList());
            }
            toast.success(res.data?.message || "Study plan deleted successfully.");
        } catch (error) {
            toast.error(getError(error = {}));
        } finally {
            navigate && dispatch(setStudyPlanInfoLoading(false));
        }
    };
}