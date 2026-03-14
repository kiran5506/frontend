import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

/**
 * Create a new contact support request
 */
export const createContactSupport = createAsyncThunk('contactSupport/create', async (request) => {
    return (await axiosInstance.post(endpoints.CONTACT_SUPPORT.create, request)).data;
})

/**
 * Get all contact support requests with pagination
 */
export const contactSupportList = createAsyncThunk('contactSupport/list', async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoints.CONTACT_SUPPORT.list}?${queryString}` : endpoints.CONTACT_SUPPORT.list;
    return (await axiosInstance.get(url)).data;
})

/**
 * Get contact support request by ID
 */
export const contactSupportById = createAsyncThunk('contactSupport/contactSupportById', async (id) => {
    return (await axiosInstance.get(endpoints.CONTACT_SUPPORT.findById.replace("{id}", id))).data;
})

/**
 * Update contact support status
 */
export const updateContactSupportStatus = createAsyncThunk('contactSupport/updateStatus', async ({ id, status }) => {
    try {
        const result = await axiosInstance.put(
            endpoints.CONTACT_SUPPORT.updateStatus.replace('{id}', id),
            { status }
        );
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
})

/**
 * Delete contact support request
 */
export const deleteContactSupport = createAsyncThunk('contactSupport/deleteContactSupport', async (id) => {
    const result = (await axiosInstance.delete(endpoints.CONTACT_SUPPORT.delete.replace("{id}", id))).data;
    result.id = id;
    return result;
})
