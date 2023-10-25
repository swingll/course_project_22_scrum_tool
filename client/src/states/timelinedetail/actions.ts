import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getTimelinedetails } from './service';

export const fetchTimelinedetails = createAsyncThunk(
    'story/fetchTimelinedetails',
    async ({ logged  } : { logged: boolean, }) => {
        if (!logged) return { timelines: [], count: 0 }
        const { data } = await getTimelinedetails();
        return { timelinedetails: data, count: data.length }
    }
)

export const clearTimelinedetails = createAction('config/clearTimelinedetails');