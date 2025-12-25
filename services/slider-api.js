import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

const headers = { 'Content-Type': 'multipart/form-data'}

export const createSlider = createAsyncThunk('slider/create', async (request) =>{
    return (await axiosInstance.post(endpoints.SLIDERS.create, request ,{headers} )).data;
})

export const sliderEdit = createAsyncThunk('slider/edit', async ({id, formData}) => {
    try {
        const result = await axiosInstance.put(
          endpoints.SLIDERS.edit.replace('{id}', id),
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
})

export const sliderList = createAsyncThunk('slider/list', async () => {
    return (await axiosInstance.get(endpoints.SLIDERS.list)).data
})

export const sliderById = createAsyncThunk('slider/sliderById', async (id) => {
    return (await axiosInstance.get(endpoints.SLIDERS.findById.replace("{id}", id))).data
})

export const sliderDelete = createAsyncThunk('slider/sliderDelete', async (id) => {
    const result = (await axiosInstance.delete(endpoints.SLIDERS.delete.replace("{id}", id))).data;
    result.id = id;
    return result;
})