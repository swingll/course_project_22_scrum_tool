import { createReducer } from '@reduxjs/toolkit'
import { setUserProfile, setUserToken, clearUser } from './actions'

export interface UserState {
    profile: any
    token: string
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
}

export default createReducer(initialUserState, (builder) =>
    builder
        .addCase(setUserProfile, (state, action) => { state.profile = action.payload.profile })
        .addCase(setUserToken, (state, action) => { state.token = action.payload.token })
        .addCase(clearUser, (state, action) => { state.token = initialUserState.token; state.profile = initialUserState.profile })
    )