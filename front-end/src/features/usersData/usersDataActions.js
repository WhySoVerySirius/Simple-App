import { createAction } from '@reduxjs/toolkit';
import * as actionTypes from './usersDataConstants';

export const setUserData = createAction(actionTypes.SET_USER_DATA);
export const clearUserData = createAction(actionTypes.CLEAR_USER_DATA);
export const setUserDataDone = createAction(actionTypes.SET_USER_DATA_DONE);
export const setOpenUser = createAction(actionTypes.SET_OPEN_USER);
export const clearOpenUser = createAction(actionTypes.CLEAR_OPEN_USER);