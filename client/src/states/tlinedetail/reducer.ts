import { createReducer } from '@reduxjs/toolkit'
import { clearTlinedetails, fetchTlinedetails } from './actions'

export interface TlinedetailsState {
    tlinedetails: Array<any>
    count: number
    loading?: boolean
}

export const initialTlinedetailsState: TlinedetailsState = {
    tlinedetails: [],
    count: 0,
    loading: false
}

export default createReducer(initialTlinedetailsState, (builder) =>
    builder
        .addCase(fetchTlinedetails.fulfilled, (state, action) => {
            state.tlinedetails = action.payload.tlinedetails;
            state.count = action.payload.count;
        })
        .addCase(clearTlinedetails, (state, action) => { state = initialTlinedetailsState; })
    )