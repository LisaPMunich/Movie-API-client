import moviesReducer from "../features/moviesSlice";
import filtersReducer from "../features/filtersSlice";
import {combineReducers} from "redux";

/**
 * Explained here:
 * https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#combining-reducers
 */
export const rootReducer = combineReducers({
        movies: moviesReducer,
        visibilityFilter: filtersReducer,
});

export default rootReducer;