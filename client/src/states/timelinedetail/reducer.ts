import { createReducer } from '@reduxjs/toolkit'
import { clearTimelinedetails, fetchTimelinedetails } from './actions'

export interface TimelinedetailsState {
    timelinedetails: Array<any>
    count: number
    loading?: boolean
}

export const initialTimelinedetailsState: TimelinedetailsState = {
    timelinedetails: [],
    count: 0,
    loading: false
}

export default createReducer(initialTimelinedetailsState, (builder) =>
    builder
        .addCase(fetchTimelinedetails.fulfilled, (state, action) => {
            state.timelinedetails = action.payload.timelinedetails;
            state.count = action.payload.count;
        })
        .addCase(clearTimelinedetails, (state, action) => { state = initialTimelinedetailsState; })
    )