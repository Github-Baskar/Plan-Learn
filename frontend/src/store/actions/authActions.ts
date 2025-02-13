import { toast } from "react-toastify";
import { NavigateFunction } from 'react-router-dom';
import { axios, getError } from "../../lib";
import { AppDispatch, setAuthLoading, setCredentialsDispatch } from "..";
import { getRegisterUserConfig } from "../../lib/requests/auth";

export const registerUser = (data: { [key: string]: string }, navigate: NavigateFunction) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setAuthLoading(true));
        try {
            const { url } = getRegisterUserConfig();
            const res = await axios.post(url, data);
            dispatch(setCredentialsDispatch(res.data));
            toast.success('Account created successfully! Welcome aboard!');
            navigate('/');
        } catch (error) {
            toast.error(getError(error = {}));
        } finally {
            dispatch(setAuthLoading(false));
        }
    };
};