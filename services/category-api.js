import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

export const createCategory = createAsyncThunk('category/create', async (request) =>{
    return (await axiosInstance.post(endpoints.CATEGORIES.create, request)).data;
})

export const categoryEdit = createAsyncThunk('category/edit', async ({id, formData}) => {
    try {
        const result = await axiosInstance.put(
          endpoints.CATEGORIES.edit.replace('{id}', id),
          formData
        );
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
})

export const categoryList = createAsyncThunk('category/list', async () => {
    return (await axiosInstance.get(endpoints.CATEGORIES.list)).data
})

export const categoryById = createAsyncThunk('category/categoryById', async (id) => {
    return (await axiosInstance.get(endpoints.CATEGORIES.findById.replace("{id}", id))).data
})

export const categoryDelete = createAsyncThunk('category/categoryDelete', async (id) => {
    const result = (await axiosInstance.delete(endpoints.CATEGORIES.delete.replace("{id}", id))).data;
    result.id = id;
    return result;
})
