import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProblems = createAsyncThunk('problems/getProblems',
async () => {
    const response = await axios.get('/api/problems');
    // console.log(response.data)
    return response.data
})

export const problemSlice = createSlice({
    name: 'problems',
    initialState: {
        problems: [],
        status: 'idle',
    },
    reducers: {
        getProblems: (state, action)=>{
            state.problems = action.payload
        }
    },
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