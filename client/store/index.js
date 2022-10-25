import { configureStore } from '@reduxjs/toolkit';
import userSlice  from './user';
import problemSlice from './problem';

const store = configureStore({
    reducer: {
        users: userSlice,
        problems: problemSlice
    }
});

export default store;