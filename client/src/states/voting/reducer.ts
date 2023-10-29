import { createReducer } from '@reduxjs/toolkit'
import { clearVotings, fetchVotings } from './actions'

export interface VotingsState {
    votings: Array<any>
    count: number
    loading?: boolean
}

export const initialVotingsState: VotingsState = {
    votings: [],
    count: 0,
    loading: false
}

export default createReducer(initialVotingsState, (builder) =>
    builder
        .addCase(fetchVotings.fulfilled, (state, action) => {
            state.votings = action.payload.votings;
            state.count = action.payload.count;
        })
        .addCase(clearVotings, (state, action) => { state = initialVotingsState; })
    )