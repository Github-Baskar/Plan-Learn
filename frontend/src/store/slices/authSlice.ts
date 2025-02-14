import { createSlice } from '@reduxjs/toolkit';
import { UserInfoSliceType } from '../../types';

const initialState: UserInfoSliceType = {
    isLoading: false,
    userInfo: localStorage.getItem('userInfo')
        ? (JSON.parse(localStorage.getItem('userInfo') as string) as UserInfoSliceType["userInfo"])
        : null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthLoading: (state, { payload }) => {
            state.isLoading = payload
        },
        setCredentialsDispatch: (state, { payload }) => {
            state.userInfo = payload;
            localStorage.setItem('userInfo', JSON.stringify(payload));
        },
        logoutDispatch: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    }
})

const { reducer, actions } = authSlice;

export const {
    setAuthLoading,
    setCredentialsDispatch,
    logoutDispatch,
} = actions;

export default reducer;