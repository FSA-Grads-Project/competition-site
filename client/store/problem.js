import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// creating thunk

export const fetchProblems = createAsyncThunk('problems/getProblems',
async () => {
    const response = await axios.get('/api/problems');
    // console.log(response.data)
    return response.data
});

export const fetchCurrentProblem = createAsyncThunk('problems/getCurrentProblem',
async () => {
    const response = await axios.get('/api/problems');
    const problems = response.data;

    const currentDate = new Date();
    const currentDateAsTime = currentDate.getTime();

    const problemsFiltered = problems.filter((problem) => {
        const startDate = Date.parse(problem.startDate);
        const endDate = Date.parse(problem.endDate);
        return startDate < currentDateAsTime && endDate > currentDateAsTime;
    });

    return problemsFiltered[0];
});

// createSlice creates the action + reducer

export const problemSlice = createSlice({
    name: 'problems',
    initialState: {
        currentProblem: {},
        problems: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: {
        [fetchCurrentProblem.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchCurrentProblem.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.currentProblem = action.payload;
        },
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
