import { createReducer } from '@reduxjs/toolkit'
import { clearTimelinedetails, fetchTimelinedetails } from './actions'

export interface TimelinedetailState {
    timelinedetails: Array<any>
    count: number
    loading?: boolean
}

export const initialTimelinedetailState: TimelinedetailState = {
    timelinedetails: [],
    count: 0,
    loading: false
}

export default createReducer(initialTimelinedetailState, (builder) =>
    builder
        .addCase(fetchTimelinedetails.fulfilled, (state, action) => {
            state.timelinedetails = action.payload.timelinedetails;
            state.count = action.payload.count;
        })
        .addCase(clearTimelinedetails, (state, action) => { state = initialTimelinedetailState; })
    )