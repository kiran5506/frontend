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

export const verifyVendorOtp = createAsyncThunk('vendorauth/verifyOtp', async (otpData, { rejectWithValue }) => {
    try {
        return (await axiosInstance.post(endpoints.VENDOR.verifyOtp, otpData)).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const fetchAllVendors = createAsyncThunk('vendor/list', async (_, { rejectWithValue }) => {
    try {
        return (await axiosInstance.get(endpoints.VENDOR.list)).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const deleteVendor = createAsyncThunk('vendor/delete', async (id, { rejectWithValue }) => {
    try {
        return (await axiosInstance.delete(endpoints.VENDOR.delete.replace('{id}', id))).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const viewVendorById = createAsyncThunk('vendor/viewById', async (id, { rejectWithValue }) => {
    try {
        return (await axiosInstance.get(endpoints.VENDOR.findById.replace('{id}', id))).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const updateProfileCompletionStatus = createAsyncThunk('vendorauth/updateProfileCompletion', async (vendorId, { rejectWithValue }) => {
    try {
        return (await axiosInstance.post(endpoints.VENDOR.updateProfileCompletion, { vendor_id: vendorId })).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const generateVendorOTP = createAsyncThunk('vendorauth/generateOTP', async (vendorId, { rejectWithValue }) => {
    try {
        return (await axiosInstance.post(endpoints.VENDOR.generateOtp, { vendor_id: vendorId })).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const updateVendorProfile = createAsyncThunk('vendor/updateProfile', async ({ vendorId, profileData }, { rejectWithValue }) => {
    try {
        return (await axiosInstance.put(endpoints.VENDOR.edit.replace('{id}', vendorId), profileData)).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const updateVendorPassword = createAsyncThunk('vendor/updatePassword', async ({ vendorId, passwordData }, { rejectWithValue }) => {
    try {
        return (await axiosInstance.put(endpoints.VENDOR.updatePassword.replace('{id}', vendorId), passwordData)).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
