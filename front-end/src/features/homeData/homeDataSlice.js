import { createSlice } from '@reduxjs/toolkit';
import {
    setTeamDataDownloadStarted,
    setTeamDataDownloadDone,
    setTeamData,
    setProjectDataDownloadStarted,
    setProjectDataDownloadDone,
    setProjectData
} from './homeDataActions';

const initialState = {
    teamData: [],
    projectData: [],
    teamDataLoading: false,
    projectDataLoading: false,
    error: null
};

export const homeDataReducer = createSlice({
    name: 'homeData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setTeamDataDownloadStarted, (state) => {
                state.teamDataLoading = true;
            })
            .addCase(setTeamDataDownloadDone, (state, action) => {
                state.teamDataLoading = false;
            })
            .addCase(setTeamData, (state, action) => {
                state.teamData = action.payload;
            })
            .addCase(setProjectDataDownloadStarted, (state) => {
                state.projectDataLoading = true;
            })
            .addCase(setProjectDataDownloadDone, (state) => {
                state.teamProjectLoading = false;
            })
            .addCase(setProjectData, (state, action) => {
                state.projectData = action.payload;
            })
    },
});


export const selectHomeData = (state) => state.homeData;

export default homeDataReducer.reducer;