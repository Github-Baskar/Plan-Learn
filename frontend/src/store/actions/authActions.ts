import { toast } from "react-toastify";
import { NavigateFunction } from 'react-router-dom';
import { axios, getError } from "../../lib";
import { AppDispatch, logoutDispatch, setAuthLoading, setCredentialsDispatch } from "..";
import { getAuthUserConfig, getRegisterUserConfig, getSignoutUserConfig } from "../../lib/requests/auth";

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

export const authUser = (data: { [key: string]: string }, navigate: NavigateFunction, ...rest: string[]) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setAuthLoading(true));
        try {
            const { url } = getAuthUserConfig();
            const res = await axios.post(url, data);
            const [picture] = rest
            dispatch(setCredentialsDispatch({ ...res.data, picture }));
            toast.success('Signed in successfully! Welcome back!');
            navigate('/');
        } catch (error) {
            toast.error(getError(error = {}));
        } finally {
            dispatch(setAuthLoading(false));
        }
    };
}

export const signoutUser = (navigate: NavigateFunction) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setAuthLoading(true));
        try {
            const { url } = getSignoutUserConfig();
            await axios.post(url);
            dispatch(logoutDispatch());
            toast.success('Signed out successfully. See you next time!');
            navigate('/');
        } catch (error) {
            toast.error(getError(error = {}));
        } finally {
            dispatch(setAuthLoading(false));
        }
    };
}