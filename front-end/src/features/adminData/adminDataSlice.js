import { createSlice } from '@reduxjs/toolkit';
import * as action from './adminDataActions';

const initialState = {
    projectData: [],
    teamData: [],
    userData: [],
};

export const adminDataReducer = createSlice({
    name: 'adminData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(action.setAdminData, (state, action) => {
                state.projectData = [...action.payload.projects];
                state.teamData = [...action.payload.teams];
                state.userData = [...action.payload.users];
                console.log(state.teamData)
            })
            .addCase(action.clearAdminData, (state) => {
                state = {
                    projectData: [],
                    teamData: [],
                    userData: [],
                }
            })
            .addCase(action.updateAdminTeamMembers, (state, action) => {
                state.teamData.forEach(element => {
                    if (element.team_id === action.payload.team_id) {
                        element.members.push(action.payload.user);
                    }
                });
            })
            .addCase(action.removeUserFromTeamAdmin, (state, action) => {
                state.teamData.forEach(element => {
                    if (element.team_id === action.payload.team_id) {
                        element.members = element.members.filter(user => user.id !== action.payload.user_id);
                    }
                });
            })
    },
});


export const selectAdminData = (state) => state.adminData;

export default adminDataReducer.reducer;