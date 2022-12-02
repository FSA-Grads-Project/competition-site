import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchResults = createAsyncThunk('results/getResults',
async () => {
    const response = await axios.get('/api/results');
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