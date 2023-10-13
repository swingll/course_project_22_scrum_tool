import { createReducer } from '@reduxjs/toolkit'
import { clearTimelinelinks, fetchTimelinelinks } from './actions'

export interface TimelinelinkState {
    timelinelinks: Array<any>
    count: number
    loading?: boolean
}

export const initialTimelinelinkState: TimelinelinkState = {
    timelinelinks: [],
    count: 0,
    loading: false
}

export default createReducer(initialTimelinelinkState, (builder) =>
    builder
        .addCase(fetchTimelinelinks.fulfilled, (state, action) => {
            state.timelinelinks = action.payload.timelinelinks;
            state.count = action.payload.count;
        })
        .addCase(clearTimelinelinks, (state, action) => { state = initialTimelinelinkState; })
    )