import { configureStore } from '@reduxjs/toolkit';
import loginDataReducer from '../features/loginData/loginDataSlice';
import homeDataReducer from '../features/homeData/homeDataSlice';

export const store = configureStore({
    reducer: {
        loginData: loginDataReducer,
        homeData: homeDataReducer
    },
});