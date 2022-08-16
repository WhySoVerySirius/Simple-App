import { createAction } from '@reduxjs/toolkit';
import * as actionTypes from './adminDataConstants';

export const setAdminData = createAction(actionTypes.SET_ADMIN_DATA);
export const clearAdminData = createAction(actionTypes.CLEAR_ADMIN_DATA);
export const updateAdminTeamMembers = createAction(actionTypes.UPDATE_ADMIN_TEAM_MEMBERS);
export const removeUserFromTeamAdmin = createAction(actionTypes.REMOVE_USER_FROM_TEAM_ADMIN);
export const updateTeamProjectAdmin = createAction(actionTypes.UPDATE_TEAM_PROJECT_ADMIN);
export const setAdminDataStatus = createAction(actionTypes.SET_ADMIN_DATA_STATUS);
export const setNewTeamCreated = createAction(actionTypes.SET_NEW_TEAM_CREATED);
export const adminRemoveProjectFromTeam = createAction(actionTypes.ADMIN_REMOVE_PROJECT_FROM_TEAM);