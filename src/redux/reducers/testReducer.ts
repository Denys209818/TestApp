import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TestType = {
    status: string;
    expectedJson: string;
};

const testSlice = createSlice({
    initialState: {
        status: '',
        expectedJson: '',
    },
    reducers: {
        setStatus(state: TestType, action: PayloadAction<string>) {
            state.status = action.payload;
        },
        setExpectedJson(state: TestType, action: PayloadAction<string>) {
            state.expectedJson = action.payload;
        }
    },
    name: 'test'
});

export const testActions = testSlice.actions;
export default testSlice.reducer;