import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

export const createBlog = createAsyncThunk('blog/create', async (request) => {
    return (await axiosInstance.post(endpoints.BLOGS.create, request, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })).data;
});

export const blogEdit = createAsyncThunk('blog/edit', async ({ id, formData }) => {
    return (await axiosInstance.put(
        endpoints.BLOGS.edit.replace('{id}', id),
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    )).data;
});

export const blogList = createAsyncThunk('blog/list', async () => {
    return (await axiosInstance.get(endpoints.BLOGS.list)).data;
});

export const blogAdminList = createAsyncThunk('blog/adminList', async () => {
    return (await axiosInstance.get(endpoints.BLOGS.adminList)).data;
});

export const blogById = createAsyncThunk('blog/blogById', async (id) => {
    return (await axiosInstance.get(endpoints.BLOGS.findById.replace('{id}', id))).data;
});

export const blogDelete = createAsyncThunk('blog/blogDelete', async (id) => {
    const result = (await axiosInstance.delete(endpoints.BLOGS.delete.replace('{id}', id))).data;
    result.id = id;
    return result;
});
