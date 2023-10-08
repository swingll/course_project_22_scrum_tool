import { createReducer } from '@reduxjs/toolkit'
import {setUserProfile, setUserToken, clearUser, fetchUsers} from './actions'
import {fetchTasks} from "../task/actions";

export interface UserState {
    profile: any
    token: string,
    users: Array<Object>
}

export const initialUserState: UserState = {
    profile: {
        id: '',
        username: '',
        email: '',
        password: '',
        roles: '',
        name: '',
        lastName: '',
        public: '',
        profilePhoto: '',
        createdAt: '',
        updatedAt: '',
    },
    token: '',
    users: []
}

export default createReducer(initialUserState, (builder) =>
    builder
        .addCase(setUserProfile, (state, action) => { state.profile = action.payload.profile })
        .addCase(setUserToken, (state, action) => { state.token = action.payload.token })
        .addCase(clearUser, (state, action) => { state.token = initialUserState.token; state.profile = initialUserState.profile })
        .addCase(fetchUsers.fulfilled,(state,action)=>{state.users = action.payload.users})
)
