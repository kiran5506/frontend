import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

export const createBusinessProfile = createAsyncThunk(
    'businessProfile/create',
    async (data) => {
        try {
            const response = await axiosInstance.post(
                endpoints.BUSINESS_PROFILE.create, 
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const businessProfileEdit = createAsyncThunk(
    'businessProfile/edit',
    async ({ id, formData }) => {
        try {
            const result = await axiosInstance.put(
                endpoints.BUSINESS_PROFILE.edit.replace('{id}', id),
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return result.data;
        } catch (error) {
            throw new Error(error.message || 'Something went wrong');
        }
    }
);

export const businessProfileDelete = createAsyncThunk(
    'businessProfile/delete',
    async ({ id, vendor_id }) => {
        const result = (await axiosInstance.delete(
            endpoints.BUSINESS_PROFILE.delete.replace('{id}', id),
            {
                data: { vendor_id }
            }
        )).data;
        result.id = id;
        return result;
    }
);

export const businessProfileList = createAsyncThunk(
    'businessProfile/list',
    async () => {
        return (await axiosInstance.get(endpoints.BUSINESS_PROFILE.list)).data;
    }
);

export const businessProfileById = createAsyncThunk(
    'businessProfile/businessProfileById',
    async (id) => {
        return (await axiosInstance.get(
            endpoints.BUSINESS_PROFILE.findById.replace('{id}', id)
        )).data;
    }
);

export const businessProfileByVendorId = createAsyncThunk(
    'businessProfile/businessProfileByVendorId',
    async (vendor_id) => {
        return (await axiosInstance.get(
            endpoints.BUSINESS_PROFILE.findByVendorId.replace('{vendor_id}', vendor_id)
        )).data;
    }
);
