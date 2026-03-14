import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

/**
 * Create a new feedback request
 */
export const createFeedback = createAsyncThunk('feedback/create', async (request, { rejectWithValue }) => {
    try {
        return (await axiosInstance.post(endpoints.FEEDBACK.create, request)).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

/**
 * Get all feedback requests with pagination
 */
export const listFeedback = createAsyncThunk('feedback/list', async (params = {}, { rejectWithValue }) => {
    try {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoints.FEEDBACK.list}?${queryString}` : endpoints.FEEDBACK.list;
        return (await axiosInstance.get(url)).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

/**
 * Get feedback by ID
 */
export const getFeedbackById = createAsyncThunk('feedback/getFeedbackById', async (id, { rejectWithValue }) => {
    try {
        return (await axiosInstance.get(endpoints.FEEDBACK.findById.replace("{id}", id))).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

/**
 * Update feedback
 */
export const updateFeedback = createAsyncThunk('feedback/updateFeedback', async ({ id, feedbackData }, { rejectWithValue }) => {
    try {
        const result = await axiosInstance.put(
            endpoints.FEEDBACK.edit.replace('{id}', id),
            feedbackData
        );
        return result.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

/**
 * Delete feedback
 */
export const deleteFeedback = createAsyncThunk('feedback/deleteFeedback', async (id, { rejectWithValue }) => {
    try {
        const result = (await axiosInstance.delete(endpoints.FEEDBACK.delete.replace("{id}", id))).data;
        result.id = id;
        return result;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

/**
 * Get feedback by vendor ID
 */
export const getFeedbackByVendorId = createAsyncThunk('feedback/getFeedbackByVendorId', async ({ vendorId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
        const params = { page, limit };
        const queryString = new URLSearchParams(params).toString();
        const url = `${endpoints.FEEDBACK.findByVendorId.replace('{vendorId}', vendorId)}?${queryString}`;
        return (await axiosInstance.get(url)).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

/**
 * Get feedback by user ID
 */
export const getFeedbackByUserId = createAsyncThunk('feedback/getFeedbackByUserId', async ({ userId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
        const params = { page, limit };
        const queryString = new URLSearchParams(params).toString();
        const url = `${endpoints.FEEDBACK.findByUserId.replace('{userId}', userId)}?${queryString}`;
        return (await axiosInstance.get(url)).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
