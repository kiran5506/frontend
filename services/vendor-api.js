import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";


export const vendorRegister = createAsyncThunk('vendorauth/register', async (vendorData, { rejectWithValue }) => {
    try {
        return (await axiosInstance.post(endpoints.VENDOR.register, vendorData)).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const vendorLogin = createAsyncThunk('vendorauth/login', async (vendorData, { rejectWithValue }) => {
    try {
        return (await axiosInstance.post(endpoints.VENDOR.login, vendorData)).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})