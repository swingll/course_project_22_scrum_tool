import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getStories } from './service';

export const fetchStories = createAsyncThunk(
    'story/fetchStories',
    async ({ logged  } : { logged: boolean, }) => {
        if (!logged) return { stories: [], count: 0 }
        const { data } = await getStories();
        return { stories: data, count: data.length }
    }
)

export const clearStories = createAction('config/clearStories');