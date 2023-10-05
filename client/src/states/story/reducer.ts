import { createReducer } from '@reduxjs/toolkit'
import { clearStories, fetchStories } from './actions'

export interface StoryState {
    stories: Array<any>
    count: number
    loading?: boolean
}

export const initialStoryState: StoryState = {
    stories: [],
    count: 0,
    loading: false
}

export default createReducer(initialStoryState, (builder) =>
    builder
        .addCase(fetchStories.fulfilled, (state, action) => {
            state.stories = action.payload.stories;
            state.count = action.payload.count;
        })
        .addCase(clearStories, (state, action) => { state = initialStoryState; })
    )