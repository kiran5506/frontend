import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

export const createBusinessPackage = createAsyncThunk('businessPackage/create', async (request) => {
    return (await axiosInstance.post(endpoints.BUSINESS_PACKAGES.create, request)).data;
});

export const businessPackageEdit = createAsyncThunk('businessPackage/edit', async ({ id, formData }) => {
    try {
        const result = await axiosInstance.put(
            endpoints.BUSINESS_PACKAGES.edit.replace('{id}', id),
            formData
        );
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
});

export const businessPackageList = createAsyncThunk('businessPackage/list', async () => {
    return (await axiosInstance.get(endpoints.BUSINESS_PACKAGES.list)).data;
});

export const businessPackageListByVendor = createAsyncThunk('businessPackage/listByVendor', async (vendorId) => {
    return (await axiosInstance.get(endpoints.BUSINESS_PACKAGES.listByVendor.replace('{vendor_id}', vendorId))).data;
});

export const businessPackageById = createAsyncThunk('businessPackage/byId', async (id) => {
    return (await axiosInstance.get(endpoints.BUSINESS_PACKAGES.findById.replace('{id}', id))).data;
});

export const businessPackageDelete = createAsyncThunk('businessPackage/delete', async (id) => {
    const result = (await axiosInstance.delete(endpoints.BUSINESS_PACKAGES.delete.replace('{id}', id))).data;
    result.id = id;
    return result;
});
