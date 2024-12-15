import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthType = {
    prefix: string;
    token: string;
};

const authSlice = createSlice({
    initialState: {
        prefix: '',
        token: '',
    },
    reducers: {
        changePrefix(state: AuthType, action: PayloadAction<string>) {
            state.prefix = action.payload.trim();
        },

        changeToken(state: AuthType, action: PayloadAction<string>) {
            state.token = action.payload.trim();
        },
    },
    name: 'auth'
});

export const authActions = authSlice.actions;
export default authSlice.reducer;