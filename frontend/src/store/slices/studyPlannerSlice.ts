import { createSlice } from '@reduxjs/toolkit';
import { ResponseData } from '../../utilities/dataResponse';

const initialState = {
    isLoading: false,
    isAddPlanLoading: false,
    generateStudyPlan: ResponseData,
};
const studyPlannerSlice = createSlice({
    name: 'studyPlanner',
    initialState,
    reducers: {
        setGenerateStudyPlanLoading: (state, { payload }) => {
            state.isLoading = payload
        },
        setAddPlanLoading: (state, { payload }) => {
            state.isAddPlanLoading = payload
        },
        getGenerateStudyPlanDispatch: (state, { payload }) => {
            state.generateStudyPlan = payload;
        },
    },
});

const { reducer, actions } = studyPlannerSlice;

export const {
    setGenerateStudyPlanLoading,
    setAddPlanLoading,
    getGenerateStudyPlanDispatch,
} = actions;

export default reducer;
