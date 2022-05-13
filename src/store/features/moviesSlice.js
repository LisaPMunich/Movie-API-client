import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

/**
 * TODO Add thunk for calling movies api
 * https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#writing-thunks
 */
export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state = [...action.payload];
            return state
        },
    },
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;