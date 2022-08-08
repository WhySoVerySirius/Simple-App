import { createSlice } from '@reduxjs/toolkit';
import { setLoginData, setLoginFailed, setLogout, setResponseStatus } from './loginDataActions';

const initialState = {
    data: {},
    token: null,
    loginStatus: false,
    error: null,
    responseStatus: null,
};

export const loginDataReducer = createSlice({
    name: 'loginData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setLoginFailed, (state, action) => {
                state.error = action.payload.error
            })
            .addCase(setLoginData, (state, action) => {
                state.data = action.payload.user;
                state.token = action.payload.token;
                state.loginStatus = true;
                sessionStorage.setItem('api_token', action.payload.token)
            })
            .addCase(setLogout, (state) => {
                state.data = {};
                state.token = null;
                state.loginStatus = false;
                state.error = null;
            })
            .addCase(setResponseStatus, (state, action) => {
                state.responseStatus = action.payload;
            })
    },
});


export const selectLoginData = (state) => state.loginData;

export default loginDataReducer.reducer;