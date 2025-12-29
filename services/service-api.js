import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

const headers = { 'Content-Type': 'multipart/form-data'}

export const createService = createAsyncThunk('service/create', async (request) =>{
    return (await axiosInstance.post(endpoints.SERVICES.create, request ,{headers} )).data;
})

export const serviceEdit = createAsyncThunk('service/edit', async ({id, formData}) => {
    try {
        const result = await axiosInstance.put(
          endpoints.SERVICES.edit.replace('{id}', id),
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
})

export const serviceList = createAsyncThunk('service/list', async () => {
    return (await axiosInstance.get(endpoints.SERVICES.list)).data
})

export const serviceById = createAsyncThunk('service/serviceById', async (id) => {
    return (await axiosInstance.get(endpoints.SERVICES.findById.replace("{id}", id))).data
})

export const serviceDelete = createAsyncThunk('service/serviceDelete', async (id) => {
    const result = (await axiosInstance.delete(endpoints.SERVICES.delete.replace("{id}", id))).data;
    result.id = id;
    return result;
})
