import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OpenResultModal } from "../../actions/responseAction";

export type ResponseType = {
    status: string;
    json: string;
};

const responseSlice = createSlice({
    initialState: {
        status: '',
        json: '',
    },
    reducers: {
        changeStatus(state: ResponseType, action: PayloadAction<string>) {
            state.status = action.payload.trim();
        },

        changeJSON(state: ResponseType, action: PayloadAction<string>) {
            state.json = action.payload.trim();
        },
        clearData(state: ResponseType) {
            state.json = '';
            state.status = '';
        }
    },
    name: 'response',
    extraReducers(builder) {
        builder.addCase(OpenResultModal.fulfilled, (state: ResponseType, action) => {
            const typedAction = action.payload as unknown as { data: any, status: string };

            state.json = JSON.stringify(typedAction.data, null, 10);
            state.status = typedAction.status;
        });
    },
});

export const responseActions = responseSlice.actions;
export default responseSlice.reducer;