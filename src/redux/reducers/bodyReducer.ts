import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParamsType } from "../../components/RequestDialog/types/types";

export type BodyType = {
    type: string;
    jsonText: string,
    params: ParamsType[];
};

const bodySlice = createSlice({
    initialState: {
        type: '',
        jsonText: '',
        params: [] as ParamsType[]
    },
    reducers: {
        setType: (state: BodyType, action: PayloadAction<string>) => {
            state.type = action.payload;
        },
        setJsonText(state: BodyType, action: PayloadAction<string>) {
            state.jsonText = action.payload;
        },
        resetJson(state: BodyType) {
            return {
                ...state,
                jsonText: '',
            };
        },
        resetParams(state: BodyType) {
            return {
                ...state,
                params: []
            };
        },
        addItem(state: BodyType, action: PayloadAction<string>) {
            state.params.push({
                id: action.payload,
                key: '',
                value: '',
                checked: true
            });
        },
        changeCheckedItem(state: BodyType, action: PayloadAction<{ id: string, checked: boolean }>) {
            const { id, checked } = action.payload;

            return {
                ...state,
                params: [...state.params.map(param => {
                    if (param.id === id) {
                        return {
                            ...param,
                            checked: checked
                        };
                    }

                    return param;
                })]
            };
        },
        changeValue(state: BodyType, action: PayloadAction<{ id: string, value: string }>) {
            const { id, value } = action.payload;

            return {
                ...state,
                params: [...state.params.map(param => {
                    if (param.id === id) {
                        return {
                            ...param,
                            value: value
                        };
                    }

                    return param;
                })]
            };
        },
        changeKey(state: BodyType, action: PayloadAction<{ id: string, value: string }>) {
            const { id, value } = action.payload;

            return {
                ...state,
                params: [...state.params.map(param => {
                    if (param.id === id) {
                        return {
                            ...param,
                            key: value
                        };
                    }

                    return param;
                })]
            };
        },
        removeItem(state: BodyType, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;

            return {
                ...state,
                params: [...state.params.filter(param => param.id !== id)]
            };
        },
    },
    name: 'body'
});

export const bodyActions = bodySlice.actions;
export default bodySlice.reducer;