import { createSlice } from '@reduxjs/toolkit';
import * as actions from './teamDataActions';

const initialState = {
    teamsData: [],
    selectedTeam: {}
};

export const teamDataReducer = createSlice({
    name: 'teamData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(actions.setAllTeamsData, (state, action) => {
                state.teamsData = action.payload;
            })
            .addCase(actions.clearAllTeamsData, (state) => {
                state = {};
            })
            .addCase(actions.setSelectedTeam, (state, action) => {
                state.selectedTeam = {...action.payload };
            })
            .addCase(actions.clearSelectedTeam, (state) => {
                state.selectedTeam = {};
            })
    },
});


export const selectTeamData = (state) => state.teamData;

export default teamDataReducer.reducer;