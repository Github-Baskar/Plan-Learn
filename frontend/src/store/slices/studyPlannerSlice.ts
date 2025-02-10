import { createSlice } from '@reduxjs/toolkit';
import { ResponseData } from '../../utilities/dataResponse';

const initialState = {
    isLoading: false,
    generateStudyPlan: ResponseData,
};
const studyPlannerSlice = createSlice({
    name: 'studyPlanner',
    initialState,
    reducers: {
        setGenerateStudyPlanLoading: (state, { payload }) => {
            state.isLoading = payload
        },
        getGenerateStudyPlanDispatch: (state, { payload }) => {
            state.generateStudyPlan = payload;
        },
    },
});

const { reducer, actions } = studyPlannerSlice;

export const {
    setGenerateStudyPlanLoading,
    getGenerateStudyPlanDispatch,
} = actions;

export default reducer;
