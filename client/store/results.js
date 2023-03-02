import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchResults = createAsyncThunk('results/getResults',
async (id) => {
    const response = await axios.get(`/api/problems/${id}/results`);
    return response.data
});

export const resultsSlice = createSlice({
    name: 'results',
    initialState: {
        results: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: {
        [fetchResults.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchResults.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.results = action.payload;
        }
    }
});


export default resultsSlice.reducer;
