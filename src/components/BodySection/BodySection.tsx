/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../services/customHooks";
import { bodyActions } from "../../redux/reducers/bodyReducer";
import TableData from "../custom/TableData";
import { faker } from "@faker-js/faker";

export const BodySection = () => {
    const dispatch = useAppDispatch();
    const { type, jsonText, params } = useAppSelector(state => state.body);

    const setType = (arg: ''|'json'|'form-data') => {
        switch (arg) {
            case 'json': {
                dispatch(bodyActions.resetParams());

                break;
            }

            case 'form-data': {
                dispatch(bodyActions.resetJson());

                break;
            }

            default: {
                dispatch(bodyActions.resetParams());
                dispatch(bodyActions.resetJson());
            }
        }

        dispatch(bodyActions.setType(arg));
    }

    const setJsonValue = (arg: string) => {
        dispatch(bodyActions.setJsonText(arg));
    }

    const addItem = () => {
        const id = faker.string.uuid();

        dispatch(bodyActions.addItem(id));
    }

    const changeCheckedItem = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        e.stopPropagation();

        dispatch(bodyActions.changeCheckedItem({id, checked: e.target.checked}));
    }, []);
    
    const changeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        e.stopPropagation();

        dispatch(bodyActions.changeValue({id, value: e.target.value}));
    }, []);
    
    const changeKey = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        e.stopPropagation();

        dispatch(bodyActions.changeKey({id, value: e.target.value}));
    }, []);

    const removeItem = (id: string) => {
        dispatch(bodyActions.removeItem({id}));
    }

    return (<>
        <h3>Body</h3>

        <div className="flex gap-2 items-center">
            <label className="flex gap-1 items-center" htmlFor="nodata">
                <p>No Data</p>
                <input type="radio" checked={!type} id="nodata" name="option" onChange={() => setType('')} />
            </label>

            <label className="flex gap-1 items-center" htmlFor="json">
                <p>JSON</p>
                <input type="radio" checked={type === 'json'} id="json" name="option" onChange={() => setType('json')} />
            </label>


            <label className="flex gap-1 items-center" htmlFor="form-data">
                <p>Form Data</p>
                <input type="radio" checked={type === 'form-data'} id="form-data" name="option" onChange={() => setType('form-data')} />
            </label>
        </div>

        {type && <div className="block pt-3">
            {type === 'json' && (
                <textarea
                    placeholder="Write a valid JSON data"
                    className="block p-4 w-full h-[200px] border border-black"
                    value={jsonText}
                    onChange={(e => setJsonValue(e.target.value))}
                >

                </textarea>
            )}

            {type === 'form-data' && (
                <TableData
                    title="Form Data"
                    params={params}
                    addItem={addItem}
                    changeCheckedItem={changeCheckedItem}
                    changeValue={changeValue}
                    changeKey={changeKey}
                    removeItem={removeItem}
                />
            )}
        </div>}
    </>);
}