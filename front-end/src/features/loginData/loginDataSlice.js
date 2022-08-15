import { createSlice } from '@reduxjs/toolkit';
import { setLoginData, setLoginFailed, setLogout, setNewPicture, setResponseStatus, setUpdatedData } from './loginDataActions';

const initialState = {
    data: {},
    token: null,
    loginStatus: false,
    error: null,
    responseStatus: null,
    role: null,
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
                console.log(action.payload);
                state.role = action.payload.user.role;
                state.loginStatus = true;
                state.data = action.payload.user;
                state.token = action.payload.token;
                action.payload.remember ?
                    localStorage.setItem('api_token', action.payload.token) :
                    sessionStorage.setItem('api_token', action.payload.token);
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
            .addCase(setUpdatedData, (state, action) => {
                state.data = action.payload.user;
            })
            .addCase(setNewPicture, (state, action) => {
                state.data = {...state.data, image_path: action.payload }
            })
    },
});


export const selectLoginData = (state) => state.loginData;

export default loginDataReducer.reducer;