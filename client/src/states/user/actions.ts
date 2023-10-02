import { createAction } from '@reduxjs/toolkit';

export const setUserProfile = createAction<{ profile: any }>('user/updateUserInfo')
export const setUserToken = createAction<{ token: string }>('user/updateUserToken')
export const clearUser = createAction('config/clearUser');