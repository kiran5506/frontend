import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

const headers = { 'Content-Type': 'multipart/form-data'}

export const createEvent = createAsyncThunk('event/create', async (request) =>{
    return (await axiosInstance.post(endpoints.EVENTS.create, request ,{headers} )).data;
})

export const eventEdit = createAsyncThunk('event/edit', async ({id, formData}) => {
    try {
        const result = await axiosInstance.put(
          endpoints.EVENTS.edit.replace('{id}', id),
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
})

export const eventList = createAsyncThunk('event/list', async () => {
    return (await axiosInstance.get(endpoints.EVENTS.list)).data
})

export const eventById = createAsyncThunk('event/eventById', async (id) => {
    return (await axiosInstance.get(endpoints.EVENTS.findById.replace("{id}", id))).data
})

export const eventDelete = createAsyncThunk('event/eventDelete', async (id) => {
    const result = (await axiosInstance.delete(endpoints.EVENTS.delete.replace("{id}", id))).data;
    result.id = id;
    return result;
})
