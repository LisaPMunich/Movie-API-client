import rootReducer from "./reducers/reducers";
import {configureStore} from "@reduxjs/toolkit";
import {logger} from "redux-logger";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: true,
});

