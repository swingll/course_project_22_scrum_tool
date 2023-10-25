import { createReducer } from '@reduxjs/toolkit'
import { clearTimelines, fetchTimelines } from './actions'

export interface TimelinesState {
    timelines: Array<any>
    count: number
    loading?: boolean
}

export const initialTimelinesState: TimelinesState = {
    timelines: [],
    count: 0,
    loading: false
}

export default createReducer(initialTimelinesState, (builder) =>
    builder
        .addCase(fetchTimelines.fulfilled, (state, action) => {
            state.timelines = action.payload.timelines;
            state.count = action.payload.count;
        })
        .addCase(clearTimelines, (state, action) => { state = initialTimelinesState; })
    )