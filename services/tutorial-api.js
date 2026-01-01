import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

const headers = { 'Content-Type': 'multipart/form-data'}

export const createTutorial = createAsyncThunk('tutorial/create', async (request) =>{
    return (await axiosInstance.post(endpoints.TUTORIALS.create, request ,{headers} )).data;
})

export const tutorialEdit = createAsyncThunk('tutorial/edit', async ({id, formData}) => {
    try {
        const result = await axiosInstance.put(
          endpoints.TUTORIALS.edit.replace('{id}', id),
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
})

export const tutorialList = createAsyncThunk('tutorial/list', async () => {
    return (await axiosInstance.get(endpoints.TUTORIALS.list)).data
})

export const tutorialById = createAsyncThunk('tutorial/tutorialById', async (id) => {
    return (await axiosInstance.get(endpoints.TUTORIALS.findById.replace("{id}", id))).data
})

export const tutorialDelete = createAsyncThunk('tutorial/tutorialDelete', async (id) => {
    const result = (await axiosInstance.delete(endpoints.TUTORIALS.delete.replace("{id}", id))).data;
    result.id = id;
    return result;
})
