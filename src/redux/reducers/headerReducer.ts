import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParamsType } from "../../components/RequestDialog/types/types";

export type HeaderType = {
    params: ParamsType[];
};

const headerSlice = createSlice({
    initialState: {
        params: [] as ParamsType[],
    },
    reducers: {
        setParams(state: HeaderType, action: PayloadAction<ParamsType[]>) {
            state.params = [...action.payload];
        },
        addItem(state: HeaderType, action: PayloadAction<string>) {
            state.params.push({
                id: action.payload,
                key: '',
                value: '',
                checked: true
            });
        },
        changeCheckedItem(state: HeaderType, action: PayloadAction<{ id: string, checked: boolean }>) {
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
        changeValue(state: HeaderType, action: PayloadAction<{ id: string, value: string }>) {
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
        changeKey(state: HeaderType, action: PayloadAction<{ id: string, value: string }>) {
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
        removeItem(state: HeaderType, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;

            return {
                ...state,
                params: [...state.params.filter(param => param.id !== id)]
            };
        },
    },
    name: 'header'
});

export const headerActions = headerSlice.actions;
export default headerSlice.reducer;