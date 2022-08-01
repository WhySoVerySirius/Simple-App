import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setLoginFailed, setLoginSuccess } from './loginDataActions';

const initialState = {
    data: null,
    token: null,
    error: null,
    loginStatus: false,
    user: null,
    email: null,
};

export const loginDataReducer = createSlice({
    name: 'loginData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setLoginSuccess, (state, action) => {
                state.data = action.payload;
                state.token = action.payload.token;
                state.loginStatus = true;
            })
            .addCase(setLoginFailed, (state, action) => {
                state.data = action.payload;
                state.error = action.payload.error
            })
    },
});


export const selectLoginData = (state) => state.loginData;

export default loginDataReducer.reducer;