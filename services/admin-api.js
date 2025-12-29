import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

export const adminLogin = createAsyncThunk('adminAuth/login', async (adminData, { rejectWithValue }) => {
    try {
        return (await axiosInstance.post(endpoints.ADMIN.login, adminData)).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getSiteSettings = createAsyncThunk('adminSettings/getSettings', async (id, { rejectWithValue }) => {
    try {
        return (await axiosInstance.get(endpoints.ADMIN.getSettings.replace('{id}', id))).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const updateSiteSettings = createAsyncThunk('adminSettings/updateSettings', async ({ id, settingsData }, { rejectWithValue }) => {
    try {
        return (await axiosInstance.put(endpoints.ADMIN.updateSettings.replace('{id}', id), settingsData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
