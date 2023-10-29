import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getVotings } from './service';

export const fetchVotings = createAsyncThunk(
    'story/fetchVotings',
    async ({ logged  } : { logged: boolean, }) => {
        if (!logged) return { timelines: [], count: 0 }
        const { data } = await getVotings();
        return { votings: data, count: data.length }
    }
)

export const clearVotings = createAction('config/clearVotings');