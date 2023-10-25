import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getTimelines } from './service';

export const fetchTimelines = createAsyncThunk(
    'story/fetchTimelines',
    async ({ logged  } : { logged: boolean, }) => {
        if (!logged) return { timelines: [], count: 0 }
        const { data } = await getTimelines();
        return { timelines: data, count: data.length }
    }
)

export const clearTimelines = createAction('config/clearTimelines');