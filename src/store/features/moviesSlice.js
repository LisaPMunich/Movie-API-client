import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

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