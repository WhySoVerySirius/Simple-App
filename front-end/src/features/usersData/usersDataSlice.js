import { createSlice } from '@reduxjs/toolkit';
import { setUserData, clearUserData, setUserDataDone, setOpenUser, clearOpenUser } from './usersDataActions';

const initialState = {
    data: [],
    openUser: {},
    error: null,
    responseStatus: null,
    status: false,
};

export const usersDataReducer = createSlice({
    name: 'userData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setUserData, (state, action) => {
                state.data = [...action.payload.data];
                state.responseStatus = 200;
            })
            .addCase(clearUserData, (state) => {
                state.data = {};
                state.responseStatus = null;
            })
            .addCase(setUserDataDone, (state) => {
                state.status = true;
            })
            .addCase(setOpenUser, (state, action) => {
                state.openUser = {...action.payload };
            })
            .addCase(clearOpenUser, (state) => {
                state.openUser = {};
            })
    },
});


export const selectUsersData = (state) => state.userData;

export default usersDataReducer.reducer;