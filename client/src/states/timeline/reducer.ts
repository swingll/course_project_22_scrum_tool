import { createReducer } from '@reduxjs/toolkit'
import { clearTimelines, fetchTimelines } from './actions'

export interface TimelineState {
    timelines: Array<any>
    count: number
    loading?: boolean
}

export const initialTimelineState: TimelineState = {
    timelines: [],
    count: 0,
    loading: false
}

export default createReducer(initialTimelineState, (builder) =>
    builder
        .addCase(fetchTimelines.fulfilled, (state, action) => {
            state.timelines = action.payload.timelines;
            state.count = action.payload.count;
        })
        .addCase(clearTimelines, (state, action) => { state = initialTimelineState; })
    )