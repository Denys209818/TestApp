import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OpenResultModal } from "../../actions/responseAction";
import { TestType } from "./testReducer";

export type ResponseType = {
    status: string;
    json: string;
    jsonError: string;
    statusError: string;
};

const responseSlice = createSlice({
    initialState: {
        status: '',
        json: '',
        jsonError: '',
        statusError: '',
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
            const typedAction = action.payload as unknown as { data: any, status: string, testData: TestType };

            state.jsonError = '';
            state.statusError = '';

            const tData = typedAction.testData;

            if (tData.status !== '' && tData.status.toString() !== typedAction.status.toString()) {
                state.statusError = `Status ${typedAction.status} can't be mathed with ${tData.status}`;
            }

            try {
                if (tData.expectedJson !== '') {
                    const obj1 = JSON.parse(tData.expectedJson);
                    const obj2 = typedAction.data;

                    if (JSON.stringify(obj1) !== JSON.stringify(obj2)) {
                        state.jsonError = `JSON\n ${JSON.stringify(obj2)}\n can't be mathed with ${tData.expectedJson}`;
                    }
                }
            }
            catch {
                state.jsonError = `Can't convert JSON`;
            }

            state.json = JSON.stringify(typedAction.data, null, 10);
            state.status = typedAction.status;
        });
    },
});

export const responseActions = responseSlice.actions;
export default responseSlice.reducer;