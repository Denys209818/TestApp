import { ParamsType } from "../components/RequestDialog/types/types";
import { TestType } from "../redux/reducers/testReducer";

export type SendingRequestType = {
    url: string;
    headers: { [key: string]: string },
    method: string;
    token?: string;
    prefix?: string;
    dataType?: string;
    data?: any;
    testData?: TestType; 
};

export const sendRequest = async (
    { 
        url,
        headers,
        method,
        token,
        prefix,
        dataType,
        data,
        testData,
    }: SendingRequestType
) => {
    const requestInit: RequestInit = {
        headers,
        method: method
    };

    if (token && prefix) {
        requestInit.headers = {
            ...requestInit.headers,
            "Authorization": `${prefix} ${token}`
        };
    }

    if (dataType && method !== 'GET') {
        switch (dataType) {
            case 'form-data': {
                const formData = data as ParamsType[];

                const form = new FormData();

                for(const item of formData) {
                    form.append(item.key, item.value);
                }

                requestInit.headers = {
                    ...requestInit.headers,
                    'Content-Type':'multipart/form-data'
                };

                requestInit.body = form;

                break;
            }

            case 'json': {
                const jsonData = data as string;
                requestInit.headers = {
                    ...requestInit.headers,
                    'Content-Type':'application/json'
                };
                requestInit.body = jsonData;

                break;
            }
        }
    }

    const result = await fetch(url, requestInit);

    try {
        if (result.ok) {
            return  { data: await result.json(), status: result.status, testData };
        }
        
        return { data: await result.json(), status: result.status, testData };
    } catch(err: any) {
        return { data: err.message || 'application come across error!', status: result.status, testData };
    }
}