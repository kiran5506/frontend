import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";


const postData = {
  grant_type: "password",
  username: "Admin",
  password: "QWRtaW5AITQzMQ=="
}

export const generateToken = createAsyncThunk('generate/token', async (_, { rejectWithValue }) => {
    try {
        return (await axiosInstance.post(endpoints.GENERATETOKEN.create, postData)).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})