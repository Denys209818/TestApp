/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";
import QueryField from "../QueryField";
import classNames from "classnames";
import QuerySection from "../QuerySection";
import AuthSection from "../AuthSection";
import HeaderSection from "../HeaderSection";
import BodySection from "../BodySection";
import { useAppDispatch, useAppSelector } from "../../services/customHooks";
import { queryActions } from "../../redux/reducers/queryReducer";
import TestSection from "../TestSection";
import DataModal from "../custom/DataModal";
import { OpenResultModal } from "../../actions/responseAction";

export const RequestDialog: React.FC = () => {
    const [activeTab, setActiveTab] = useState('params');
    const dispatch = useAppDispatch();

    const { query, method } = useAppSelector(state => state.query);
    const { params: headers } = useAppSelector(state => state.header);
    const { token, prefix } = useAppSelector(state => state.auth);
    const { type: bodyType, jsonText, params: bodyParams } = useAppSelector(state => state.body);

    const setQuery = (arg: string) => {
        dispatch(queryActions.changeQuery(arg));
    }

    const onSendRequest = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(queryActions.setError(''));

        async function send() {
            const resultObj = {} as { [key: string]: string };

            for (const header of headers) {
                resultObj[header.key] = header.value;
            }

            let data: any;

            if (bodyType) {
                switch (bodyType) {
                    case 'json': {
                        data = jsonText;

                        break;
                    }

                    case 'form-data': {
                        data = bodyParams;

                        break;
                    }
                }
            }

            dispatch(OpenResultModal({
                url: query,
                method: method,
                headers: resultObj,
                token: token,
                prefix: prefix,
                dataType: bodyType,
                data: data,
            }));
        }

        if (query && query.startsWith('http')) {
            send();
        } else {
            dispatch(queryActions.setError('Enter a valid email'));
        }
    }

    const tabs = useMemo(() => {
        return [
            { title: 'Params', key: 'params', id: 0 },
            { title: 'Authorization', key: 'authorization', id: 1 },
            { title: 'Headers', key: 'headers', id: 2 },
            { title: 'Body', key: 'body', id: 3 },
            { title: 'Tests', key: 'tests', id: 4 },
        ];
    }, []);

    return (<div className="absolute size-full flex items-center justify-center">
        <div className="block w-full border-2 border-black max-w-[700px] bg-white">
            <div className="block border-b-2 border-black px-2 py-1 bg-[#A0D683]">
                <h1 className="font-display text-title">
                    Виконати запит
                </h1>
            </div>

            <div className="block p-4">
                <h3>URL</h3>

                <QueryField
                    query={query}
                    setQuery={(arg: string) => setQuery(arg)}
                    onSubmitHandler={onSendRequest}
                />
            </div>

            <div className="block p-4">
                <ul className="flex gap-2 list-none m-0">
                    {tabs.map(tab => (
                        <li
                            key={tab.id}
                            className={classNames("block p-1 border-b-2 hover:cursor-pointer", {
                                "border-black": activeTab === tab.key
                            })}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.title}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="block p-4">
                {activeTab === 'params' && <QuerySection />}

                {activeTab === 'authorization' && <AuthSection />}

                {activeTab === 'headers' && <HeaderSection />}

                {activeTab === 'body' && <BodySection />}

                {activeTab === 'tests' && <TestSection />}
            </div>

        </div>
        <DataModal />
    </div>);
}