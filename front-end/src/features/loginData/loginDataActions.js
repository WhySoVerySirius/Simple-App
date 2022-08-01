import { createAction } from '@reduxjs/toolkit';
import * as actionTypes from './loginDataConstants';

export const setLoginSuccess = createAction(actionTypes.SET_LOGIN_SUCCESS);
export const setLoginFailed = createAction(actionTypes.SET_LOGIN_FAILED);