import { createSlice } from '@reduxjs/toolkit';
import { setUserData, clearUserData, setUserDataDone } from './usersDataActions';

const initialState = {
    data: [],
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
                console.log(state.data);
                state.responseStatus = 200;
            })
            .addCase(clearUserData, (state) => {
                state.data = {};
                state.responseStatus = null;
            })
            .addCase(setUserDataDone, (state) => {
                state.status = true;
            })
    },
});


export const selectUsersData = (state) => state.userData;

export default usersDataReducer.reducer;