import { createSlice } from '@reduxjs/toolkit';
import * as actions from './usersSelectedProjectActions';

const initialState = {
    project: 0,
    files: {},
    messages: []
};

export const usersSelectedProjectReducer = createSlice({
    name: 'selectedProjectData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(actions.setSelectedProject, (state, action) => {
                state.project = action.payload;
            })
            .addCase(actions.setProjectMessages, (state, action) => {
                state.messages = [...action.payload];
            })
    },
});


export const selectSelectedProjectData = (state) => state.selectedProjectData;

export default usersSelectedProjectReducer.reducer;