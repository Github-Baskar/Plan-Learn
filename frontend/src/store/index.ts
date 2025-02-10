import { configureStore } from '@reduxjs/toolkit';
import studyPlannerReducer from './slices/studyPlannerSlice';

const store = configureStore({
    reducer: {
        studyPlanner: studyPlannerReducer,
    },
});

// RootState type
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch type
export type AppDispatch = typeof store.dispatch;

export * from "./actions";
export * from './slices';

export default store;