import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {getUsers} from "./service";

export const setUserProfile = createAction<{ profile: any }>('user/updateUserInfo')
export const setUserToken = createAction<{ token: string }>('user/updateUserToken')
export const clearUser = createAction('config/clearUser');

export const fetchUsers = createAsyncThunk(
    'story/fetchUsers',
    async ({ logged  } : { logged: boolean, }) => {
        if (!logged) return { users:[] }
        const { data } = await getUsers();
        return { users:data }
    }
)