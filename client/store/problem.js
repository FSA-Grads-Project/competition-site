import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// creating thunk

export const fetchProblems = createAsyncThunk('problems/getProblems',
async () => {
    const response = await axios.get('/api/problems');
    // console.log(response.data)
    return response.data
});

// createSlice creates the action + reducer

export const problemSlice = createSlice({
    name: 'problems',
    initialState: {
        problems: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: {
        [fetchProblems.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchProblems.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.problems = action.payload;
        }
    }
});

export default problemSlice.reducer;