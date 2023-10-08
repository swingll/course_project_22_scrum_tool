import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getTlinedetails } from './service';

export const fetchTlinedetails = createAsyncThunk(
    'story/fetchTlinedetails',
    async ({ logged  } : { logged: boolean, }) => {
        if (!logged) return { timelines: [], count: 0 }
        const { data } = await getTlinedetails();
        return { tlinedetails: data, count: data.length }
    }
)

export const clearTlinedetails = createAction('config/clearTlinedetails');