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

export const getAdminDashboardCounts = createAsyncThunk('admin/dashboardCounts', async (_, { rejectWithValue }) => {
    try {
        return (await axiosInstance.get(endpoints.ADMIN.dashboardCounts)).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Failed to fetch admin dashboard counts' });
    }
})

export const getAdminProfile = createAsyncThunk('admin/profile', async (_, { rejectWithValue }) => {
    try {
        return (await axiosInstance.get(endpoints.ADMIN.profile)).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Failed to fetch admin profile' });
    }
})

export const updateAdminProfile = createAsyncThunk('admin/updateProfile', async (profileData, { rejectWithValue }) => {
    try {
        return (await axiosInstance.put(endpoints.ADMIN.profile, profileData, {
            headers: profileData instanceof FormData
                ? { 'Content-Type': 'multipart/form-data' }
                : undefined,
        })).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Failed to update admin profile' });
    }
})

export const changeAdminPassword = createAsyncThunk('admin/changePassword', async (passwordData, { rejectWithValue }) => {
    try {
        return (await axiosInstance.put(endpoints.ADMIN.changePassword, passwordData)).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Failed to change admin password' });
    }
})
