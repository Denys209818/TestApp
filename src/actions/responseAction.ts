import { createAsyncThunk } from "@reduxjs/toolkit";
import { SendingRequestType, sendRequest } from "../services/httpClient";

export const OpenResultModal = createAsyncThunk(
    'response/request',
    async ({ url, headers, method, token, prefix, dataType, data }: SendingRequestType) => {
      return sendRequest({
        url: url,
        method: method,
        headers: headers,
        token: token,
        prefix: prefix,
        dataType: dataType,
        data: data
      });
    }
  );
  