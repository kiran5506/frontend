import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

export const createVideo = createAsyncThunk('video/create', async (request) => {
    return (await axiosInstance.post(endpoints.VIDEOS.create, request)).data;
});

export const videoEdit = createAsyncThunk('video/edit', async ({ id, formData }) => {
    try {
        const result = await axiosInstance.put(
            endpoints.VIDEOS.edit.replace('{id}', id),
            formData
        );
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
});

export const videoList = createAsyncThunk('video/list', async () => {
    return (await axiosInstance.get(endpoints.VIDEOS.list)).data;
});

export const videoById = createAsyncThunk('video/findById', async (id) => {
    return (await axiosInstance.get(endpoints.VIDEOS.findById.replace("{id}", id))).data;
});

export const videoDelete = createAsyncThunk('video/delete', async (id) => {
    const result = (await axiosInstance.delete(endpoints.VIDEOS.delete.replace("{id}", id))).data;
    result.id = id;
    return result;
});
