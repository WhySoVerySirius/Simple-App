import { createAction } from '@reduxjs/toolkit';
import * as actionTypes from './homeDataConstants';

export const setTeamDataDownloadStarted = createAction(actionTypes.SET_TEAM_DATA_DOWNLOAD_STARTED);
export const setTeamDataDownloadDone = createAction(actionTypes.SET_TEAM_DATA_DOWNLOAD_DONE);
export const setTeamData = createAction(actionTypes.SET_TEAM_DATA);
export const setProjectDataDownloadStarted = createAction(actionTypes.SET_PROJECT_DATA_DOWNLOAD_STARTED);
export const setProjectDataDownloadDone = createAction(actionTypes.SET_PROJECT_DATA_DOWNLOAD_DONE);
export const setProjectData = createAction(actionTypes.SET_PROJECT_DATA);
export const clearData = createAction(actionTypes.CLEAR_DATA);