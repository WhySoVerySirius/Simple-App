import { configureStore } from '@reduxjs/toolkit';
import loginDataReducer from '../features/loginData/loginDataSlice';
import homeDataReducer from '../features/homeData/homeDataSlice';
import usersDataReducer from '../features/usersData/usersDataSlice';

export const store = configureStore({
    reducer: {
        loginData: loginDataReducer,
        homeData: homeDataReducer,
        userData: usersDataReducer,
    },
});