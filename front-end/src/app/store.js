import { configureStore } from '@reduxjs/toolkit';
import loginDataReducer from '../features/loginData/loginDataSlice';
import homeDataReducer from '../features/homeData/homeDataSlice';
import usersDataReducer from '../features/usersData/usersDataSlice';
import teamDataReducer from '../features/teamData/teamDataSlice';
import usersSelectedProjectReducer from '../features/UsersProjectData/usersSelectedProjectSlice';

export const store = configureStore({
    reducer: {
        loginData: loginDataReducer,
        homeData: homeDataReducer,
        userData: usersDataReducer,
        teamData: teamDataReducer,
        selectedProjectData: usersSelectedProjectReducer,
    },
});