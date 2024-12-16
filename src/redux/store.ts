import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import queryReducer from "./reducers/queryReducer";
import headerReducer from "./reducers/headerReducer";
import bodyReducer from "./reducers/bodyReducer";
import testReducer from "./reducers/testReducer";
import responseReducer from "./reducers/responseReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        query: queryReducer,
        header: headerReducer,
        body: bodyReducer,
        test: testReducer,
        response: responseReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;