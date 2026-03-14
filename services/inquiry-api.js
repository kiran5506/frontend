import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

/**
 * Create a new customer inquiry
 */
export const createInquiry = createAsyncThunk('inquiry/create', async (request) => {
    return (await axiosInstance.post(endpoints.INQUIRIES.create, request)).data;
})

/**
 * Get all customer inquiries with pagination
 */
export const inquiryList = createAsyncThunk('inquiry/list', async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoints.INQUIRIES.list}?${queryString}` : endpoints.INQUIRIES.list;
    return (await axiosInstance.get(url)).data;
})

/**
 * Get customer inquiry by ID
 */
export const inquiryById = createAsyncThunk('inquiry/inquiryById', async (id) => {
    return (await axiosInstance.get(endpoints.INQUIRIES.findById.replace("{id}", id))).data;
})

/**
 * Get inquiries by status with pagination
 */
export const inquiryByStatus = createAsyncThunk('inquiry/byStatus', async ({ status, params = {} }) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString 
        ? `${endpoints.INQUIRIES.byStatus.replace("{status}", status)}?${queryString}` 
        : endpoints.INQUIRIES.byStatus.replace("{status}", status);
    return (await axiosInstance.get(url)).data;
})

/**
 * Update entire customer inquiry
 */
export const updateInquiry = createAsyncThunk('inquiry/update', async ({ id, formData }) => {
    try {
        const result = await axiosInstance.put(
            endpoints.INQUIRIES.update.replace('{id}', id),
            formData
        );
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
})

/**
 * Update inquiry status, OTP, and verification
 */
export const updateInquiryStatus = createAsyncThunk('inquiry/updateStatus', async ({ id, formData }) => {
    try {
        const result = await axiosInstance.put(
            endpoints.INQUIRIES.updateStatus.replace('{id}', id),
            formData
        );
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
})

/**
 * Delete/Deactivate customer inquiry
 */
export const deleteInquiry = createAsyncThunk('inquiry/deleteInquiry', async (id) => {
    const result = (await axiosInstance.delete(endpoints.INQUIRIES.delete.replace("{id}", id))).data;
    result.id = id;
    return result;
})


export const verifyInquiryOtp = createAsyncThunk('inquiry/verifyOtp', async (formData) => {
    return (await axiosInstance.post(endpoints.INQUIRIES.verifyOtp, formData)).data;
});
