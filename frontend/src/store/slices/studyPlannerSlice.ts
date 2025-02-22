import { createSlice } from '@reduxjs/toolkit';
// import { ResponseData } from '../../utilities/dataResponse';
type InitialStateType = {
    isLoading: boolean,
    isAddPlanLoading: boolean,
    isStudyPlanListLoading: boolean,
    isStudyPlanInfoLoading: boolean,
    generateStudyPlan: {[key:string]: any},
    studyPlanList: string[] | any,
    studyPlanInfo: {
        _id: string,
        topic: string,
        levelOfExpertise: string,
        studyDuration: string,
        studyDays: string[],
        totalTimeCommitment: string,
        dayOverview: string,
        learningResources: string,
        assessment: {
            methods: string[]
        },
        studyPlanStatus: string
    },
}

const initialState: InitialStateType = {
    isLoading: false,
    isAddPlanLoading: false,
    isStudyPlanListLoading: false,
    isStudyPlanInfoLoading: false,
    generateStudyPlan: {},
    studyPlanList: [],
    studyPlanInfo: {
        _id: '',
        topic: '',
        levelOfExpertise: '',
        studyDuration: '',
        studyDays: [],
        totalTimeCommitment: '',
        dayOverview: '',
        learningResources: '',
        assessment: {
            methods: []
        },
        studyPlanStatus: ''
    },
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
        setStudyPlanListLoading: (state, { payload }) => {
            state.isStudyPlanListLoading = payload
        },
        setStudyPlanInfoLoading: (state, { payload }) => {
            state.isStudyPlanInfoLoading = payload
        },
        getGenerateStudyPlanDispatch: (state, { payload }) => {
            state.generateStudyPlan = payload;
        },
        getStudyPlanListDispatch: (state, { payload }) => {
            state.studyPlanList = payload;
        },
        getStudyPlanInfoDispatch: (state, { payload }) => {
            state.studyPlanInfo = payload;
        },
    },
});

const { reducer, actions } = studyPlannerSlice;

export const {
    setGenerateStudyPlanLoading,
    setAddPlanLoading,
    setStudyPlanListLoading,
    setStudyPlanInfoLoading,
    getGenerateStudyPlanDispatch,
    getStudyPlanListDispatch,
    getStudyPlanInfoDispatch,
} = actions;

export default reducer;
