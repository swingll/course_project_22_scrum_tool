import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getTasks } from './service';

export const fetchTasks = createAsyncThunk(
    'story/fetchTasks',
    async ({ logged  } : { logged: boolean, }) => {
        if (!logged) return { tasks: [], count: 0 }
        const { data } = await getTasks();
        return { tasks: data, count: data.length }
    }
)

export const clearTasks = createAction('config/clearTasks');