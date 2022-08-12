import { createAction } from '@reduxjs/toolkit';
import * as actionTypes from './teamDataConstants';

export const setAllTeamsData = createAction(actionTypes.SET_ALL_TEAMS_DATA);
export const clearAllTeamsData = createAction(actionTypes.CLEAR_ALL_TEAMS_DATA);
export const setSelectedTeam = createAction(actionTypes.SET_SELECTED_TEAM);
export const clearSelectedTeam = createAction(actionTypes.CLEAR_SELECTED_TEAM);