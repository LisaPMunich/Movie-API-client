import {createSlice} from '@reduxjs/toolkit';

const initialState = "";

export const filtersSlice = createSlice({
    name: "visibilityFilter",
    initialState,
    reducers: {
        setVisibilityFilter: (state, action) => {
            state = action.payload;
            return state;
        },
    },
});

export const {setVisibilityFilter} = filtersSlice.actions;

export default filtersSlice.reducer;