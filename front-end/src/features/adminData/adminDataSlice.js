import { createSlice, current } from '@reduxjs/toolkit';
import * as action from './adminDataActions';

const initialState = {
    projectData: [],
    teamData: [],
    userData: [],
    dataStatus: null,
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
                state.dataStatus = 'loaded';
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
            .addCase(action.updateTeamProjectAdmin, (state, action) => {
                state.teamData.forEach(element => {
                    element.projects.forEach(project => {
                        if (project.project_id === action.payload.project_id) {
                            current(project).status = action.payload.status;
                            current(project).deadline = action.payload.deadline;
                        }
                    })
                })
            })
            .addCase(action.setAdminDataStatus, (state, action) => {
                state.dataStatus = action.payload;
            })
            .addCase(action.setNewTeamCreated, (state, action) => {
                state.teamData = [...state.teamData, action.payload];
            })
            .addCase(action.adminRemoveProjectFromTeam, (state, action) => {
                let filtered;
                let key;
                for (let index = 0; index < current(state.teamData).length; index++) {
                    const element = current(state.teamData)[index];
                    if (element.team_id === action.payload.team_id) {
                        key = index;
                    }
                }
                console.log(key);
                state.teamData.forEach(element => {
                    if (current(element).team_id === action.payload.team_id) {
                        filtered = [...current(element).projects.filter(project => project.project_id !== action.payload.project_id)];
                    }
                })
                let data = [...state.teamData];
                data[key] = filtered;
                state.teamData = [...data];
                console.log(current(state.teamData));
                console.log(filtered);
            })
    },
});


export const selectAdminData = (state) => state.adminData;

export default adminDataReducer.reducer;