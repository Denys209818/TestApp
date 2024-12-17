/* eslint-disable react-hooks/exhaustive-deps */
import { faker } from "@faker-js/faker";
import { useCallback, useEffect, useState } from "react";
import { TableData } from "../custom/TableData/TableData";
import { ParamsType } from "../RequestDialog/types/types";
import { useAppDispatch, useAppSelector } from "../../services/customHooks";
import { queryActions } from "../../redux/reducers/queryReducer";

export const QuerySection: React.FC = () => {
    const { query, params } = useAppSelector(state => state.query);
    const dispatch = useAppDispatch();

    const [isChange, setIsChange] = useState(false);

    const setQuery = (arg: string) => {
        dispatch(queryActions.changeQuery(arg));
    }

    useEffect(() => {
        changeParamsList();
    }, []);

    useEffect(() => {
        if (isChange) {
            const questInd = query.indexOf('?') < 0 ? query.length : query.indexOf('?');
            let searchParams = query.slice(0, questInd) + '?';

            for (let i = 0; i < params.length; i++) {
                if (params[i].checked) {
                    searchParams += `${params[i].key}=${params[i].value}&`;
                }
            }
            
            setQuery(searchParams.slice(0, -1));
            setIsChange(false);
        } else {
            setIsChange(true);
        }
    }, [params]);

    useEffect(() => {
        if (isChange) {
            changeParamsList();
        } else {
            setIsChange(true);
        }
    }, [query]);

    const changeParamsList = () => {
        const search = params;
        const ind = query.indexOf('?');

        if (ind < 0) {
            dispatch(queryActions.setParams([]));
            setIsChange(() => false);

            return;
        }

        const searchParams = query.slice(ind + 1)
            .split('&');

        const newParams: ParamsType[] = [];

        for (let i = 0; i < searchParams.length; i++) {
            const keyValue = searchParams[i].split('=');

            newParams.push({
                checked: params[i] ? params[i].checked : true,
                id: params[i] ? params[i].id : faker.string.uuid(),
                key: keyValue[0] || '',
                value: keyValue[1] || '',
            });
        }

        const checkFirst = search
            .reduce((prev, curr) => prev + `${curr.key}=${curr.value}&`, '')
            .slice(0, -1);
        const checkSecond = newParams
            .reduce((prev, curr) => prev + `${curr.key}=${curr.value}&`, '')
            .slice(0, -1);

        if (checkFirst !== checkSecond) {
            dispatch(queryActions.setParams(newParams));
            setIsChange(() => false);
        }
    }

    const addItem = () => {
        const id = faker.string.uuid();

        dispatch(queryActions.addItem(id));
    }

    const changeCheckedItem = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        e.stopPropagation();

        dispatch(queryActions.changeCheckedItem({id, checked: e.target.checked}));
    }, []);
    
    const changeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        e.stopPropagation();

        dispatch(queryActions.changeValue({id, value: e.target.value}));
    }, []);
    
    const changeKey = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        e.stopPropagation();

        dispatch(queryActions.changeKey({id, value: e.target.value}));
    }, []);

    const removeItem = (id: string) => {
        dispatch(queryActions.removeItem({id}));
    }

    return (<>
        <TableData
            title="Query params"
            params={params}
            addItem={addItem}
            changeCheckedItem={changeCheckedItem}
            changeValue={changeValue}
            changeKey={changeKey}
            removeItem={removeItem}
        />
    </>);
}