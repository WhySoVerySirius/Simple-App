import { createAction } from '@reduxjs/toolkit';
import * as actionTypes from './usersSelectedProjectConstants';

export const setSelectedProject = createAction(actionTypes.SET_SELECTED_PROJECT);
export const clearSelectedProject = createAction(actionTypes.CLEAR_SELECTED_PROJECT);
export const setProjectMessages = createAction(actionTypes.SET_PROJECT_MESSAGES);
export const clearProjectMessages = createAction(actionTypes.CLEAR_PROJECT_MESSAGES);
export const setProjectFiles = createAction(actionTypes.SET_PROJECT_FILES);
export const clearProjectFiles = createAction(actionTypes.CLEAR_PROJECT_FILES);