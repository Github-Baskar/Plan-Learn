import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import studyPlannerReducer from './slices/studyPlannerSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
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