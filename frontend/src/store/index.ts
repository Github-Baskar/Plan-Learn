import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        // auth: authReducer,
    },
});

//   export * from "./actions";
//   export * from './slices';

export default store;