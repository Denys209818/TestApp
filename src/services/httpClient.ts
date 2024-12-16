import { ParamsType } from "../components/RequestDialog/types/types";

export type SendingRequestType = {
    url: string;
    headers: { [key: string]: string },
    method: string;
    token?: string;
    prefix?: string;
    dataType?: string;
    data?: any; 
};

export const sendRequest = async (
    { 
        url,
        headers,
        method,
        token,
        prefix,
        dataType,
        data
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

    if (dataType) {
        switch (dataType) {
            case 'form-data': {
                const formData = data as ParamsType[];

                const form = new FormData();

                for(const item of formData) {
                    form.append(item.key, item.value);
                }

                requestInit.body = form;

                break;
            }

            case 'json': {
                const jsonData = data as string;
                requestInit.body = jsonData;

                break;
            }
        }
    }

    try {
        const result = await fetch(url, requestInit);

        if (result.ok) {
            return  { data: await result.json(), status: result.status };
        }
        
        return { data: await result.json(), status: result.status};
    } catch {
        return { data: 'application come across error!', status: 500};
    }
}