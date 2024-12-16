import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParamsType } from "../../components/RequestDialog/types/types";

export type QueryType = {
    query: string;
    method: string;
    error: string;
    params: ParamsType[];
};

const querySlice = createSlice({
    initialState: {
        query: '',
        method: 'GET',
        error: '',
        params: [] as ParamsType[],
    },
    reducers: {
        changeMethod(state: QueryType, action: PayloadAction<string>) {
            state.method = action.payload;
        },
        setError(state: QueryType, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        changeQuery(state: QueryType, action: PayloadAction<string>) {
            state.query = action.payload.trim();
        },
        setParams(state: QueryType, action: PayloadAction<ParamsType[]>) {
            state.params = [...action.payload];
        },
        addItem(state: QueryType, action: PayloadAction<string>) {
            state.params.push({
                id: action.payload,
                key: '',
                value: '',
                checked: true
            });
        },
        changeCheckedItem(state: QueryType, action: PayloadAction<{ id: string, checked: boolean }>) {
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
            })]};
        },
        changeValue(state: QueryType, action: PayloadAction<{ id: string, value: string }>) {
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
            })]};
        },
        changeKey(state: QueryType, action: PayloadAction<{ id: string, value: string }>) {
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
            })]};
        },
        removeItem(state: QueryType, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;

            return {
                ...state,
                params: [...state.params.filter(param => param.id !== id)]};
        },
    },
    name: 'query'
});

export const queryActions = querySlice.actions;
export default querySlice.reducer;