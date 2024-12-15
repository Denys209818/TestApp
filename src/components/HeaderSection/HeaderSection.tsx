/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../services/customHooks";
import TableData from "../custom/TableData";
import { faker } from "@faker-js/faker";
import { headerActions } from "../../redux/reducers/headerReducer";


export const HeaderSection = () => {
    const { params } = useAppSelector(state => state.header);

    const dispatch = useAppDispatch();

    const addItem = () => {
        const id = faker.string.uuid();

        dispatch(headerActions.addItem(id));
    }

    const changeCheckedItem = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        e.stopPropagation();

        dispatch(headerActions.changeCheckedItem({id, checked: e.target.checked}));
    }, []);
    
    const changeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        e.stopPropagation();

        dispatch(headerActions.changeValue({id, value: e.target.value}));
    }, []);
    
    const changeKey = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        e.stopPropagation();

        dispatch(headerActions.changeKey({id, value: e.target.value}));
    }, []);

    const removeItem = (id: string) => {
        dispatch(headerActions.removeItem({id}));
    }

    return (
        <TableData
            title="Headers"
            params={params}
            addItem={addItem}
            changeCheckedItem={changeCheckedItem}
            changeValue={changeValue}
            changeKey={changeKey}
            removeItem={removeItem}
        />
    );
}