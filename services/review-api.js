import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

export const createReview = createAsyncThunk(
    'review/create',
    async (data) => {
        try {
            const response = await axiosInstance.post(
                endpoints.REVIEW.create, 
                data
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const reviewEdit = createAsyncThunk(
    'review/edit',
    async ({ id, data }) => {
        try {
            const result = await axiosInstance.put(
                endpoints.REVIEW.edit.replace('{id}', id),
                data
            );
            return result.data;
        } catch (error) {
            throw new Error(error.message || 'Something went wrong');
        }
    }
);

export const reviewDelete = createAsyncThunk(
    'review/delete',
    async ({ id }) => {
        const result = await axiosInstance.delete(
            endpoints.REVIEW.delete.replace('{id}', id)
        );
        return { ...result.data, id };
    }
);

export const reviewList = createAsyncThunk(
    'review/list',
    async (params) => {
        try {
            const response = await axiosInstance.get(
                endpoints.REVIEW.list,
                { params }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const reviewById = createAsyncThunk(
    'review/findById',
    async (id) => {
        try {
            const response = await axiosInstance.get(
                endpoints.REVIEW.findById.replace('{id}', id)
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const reviewByVendorId = createAsyncThunk(
    'review/findByVendorId',
    async (params) => {
        try {
            const vendor_id = params.vendor_id;
            const response = await axiosInstance.get(
                endpoints.REVIEW.findByVendorId.replace('{vendor_id}', vendor_id),
                { params: { page: params.page, limit: params.limit, status: params.status } }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const reviewByCustomerId = createAsyncThunk(
    'review/findByCustomerId',
    async (params) => {
        try {
            const customer_id = params.customer_id;
            const response = await axiosInstance.get(
                endpoints.REVIEW.findByCustomerId.replace('{customer_id}', customer_id),
                { params: { page: params.page, limit: params.limit } }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
