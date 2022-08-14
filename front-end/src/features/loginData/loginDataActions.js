import { createAction } from '@reduxjs/toolkit';
import * as actionTypes from './loginDataConstants';

export const setLoginFailed = createAction(actionTypes.SET_LOGIN_FAILED);
export const setLoginData = createAction(actionTypes.SET_LOGIN_DATA);
export const setLogout = createAction(actionTypes.SET_LOGOUT);
export const setResponseStatus = createAction(actionTypes.SET_RESPONSE_STATUS);
export const setUpdatedData = createAction(actionTypes.SET_UPDATED_DATA);
export const setNewPicture = createAction(actionTypes.SET_NEW_PICTURE);