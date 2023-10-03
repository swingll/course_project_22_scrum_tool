import { createReducer } from '@reduxjs/toolkit'
import { clearTasks, fetchTasks } from './actions'

export interface TaskState {
    tasks: Array<any>
    count: number
    loading?: boolean
}

export const initialTaskState: TaskState = {
    tasks: [],
    count: 0,
    loading: false
}

export default createReducer(initialTaskState, (builder) =>
    builder
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.tasks = action.payload.tasks;
            state.count = action.payload.count;
        })
        .addCase(clearTasks, (state, action) => { state = initialTaskState; })
    )