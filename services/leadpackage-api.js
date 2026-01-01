import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

const headers = { 'Content-Type': 'multipart/form-data'}

export const createLeadPackage = createAsyncThunk('leadpackage/create', async (request) =>{
    return (await axiosInstance.post(endpoints.LEADPACKAGE.create, request ,{headers} )).data;
})

export const leadpackageEdit = createAsyncThunk('leadpackage/edit', async ({id, formData}) => {
    try {
        const result = await axiosInstance.put(
          endpoints.LEADPACKAGE.edit.replace('{id}', id),
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
})

export const leadpackageList = createAsyncThunk('leadpackage/list', async () => {
    return (await axiosInstance.get(endpoints.LEADPACKAGE.list)).data
})

export const leadpackageById = createAsyncThunk('leadpackage/leadpackageById', async (id) => {
    return (await axiosInstance.get(endpoints.LEADPACKAGE.findById.replace("{id}", id))).data
})

export const leadpackageDelete = createAsyncThunk('leadpackage/leadpackageDelete', async (id) => {
    const result = (await axiosInstance.delete(endpoints.LEADPACKAGE.delete.replace("{id}", id))).data;
    result.id = id;
    return result;
})
