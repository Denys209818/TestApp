import { createAsyncThunk } from "@reduxjs/toolkit";
import { SendingRequestType, sendRequest } from "../services/httpClient";
import { RootState } from "../redux/store";

export const OpenResultModal = createAsyncThunk(
    'response/request',
    async ({ url, headers, method, token, prefix, dataType, data }: SendingRequestType, { getState }) => {
      const state = getState() as RootState;
      
      return sendRequest({
        url: url,
        method: method,
        headers: headers,
        token: token,
        prefix: prefix,
        dataType: dataType,
        data: data,
        testData: state.test
      });
    }
  );
  