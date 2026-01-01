import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

export const createCity = createAsyncThunk('city/create', async (request) =>{
    return (await axiosInstance.post(endpoints.CITIES.create, request)).data;
})

export const cityEdit = createAsyncThunk('city/edit', async ({id, formData}) => {
    try {
        const result = await axiosInstance.put(
          endpoints.CITIES.edit.replace('{id}', id),
          formData
        );
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
})

export const cityList = createAsyncThunk('city/list', async () => {
    return (await axiosInstance.get(endpoints.CITIES.list)).data
})

export const cityById = createAsyncThunk('city/cityById', async (id) => {
    return (await axiosInstance.get(endpoints.CITIES.findById.replace("{id}", id))).data
})

export const cityDelete = createAsyncThunk('city/cityDelete', async (id) => {
    const result = (await axiosInstance.delete(endpoints.CITIES.delete.replace("{id}", id))).data;
    result.id = id;
    return result;
})
