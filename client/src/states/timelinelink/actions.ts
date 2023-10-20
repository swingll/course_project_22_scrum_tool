import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getTimelinelinks } from './service';

export const fetchTimelinelinks = createAsyncThunk(
    'story/fetchTimelinelink',
    async ({ logged  } : { logged: boolean, }) => {
        if (!logged) return { timelines: [], count: 0 }
        const { data } = await getTimelinelinks();
        return { timelinelinks: data, count: data.length }
    }
)

export const clearTimelinelinks = createAction('config/clearTimelinelinks');