import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

const headers = { 'Content-Type': 'multipart/form-data'}

export const createSkill = createAsyncThunk('skill/create', async (request) =>{
    return (await axiosInstance.post(endpoints.SKILLS.create, request)).data;
})

export const skillEdit = createAsyncThunk('skill/edit', async ({id, formData}) => {
    try {
        const result = await axiosInstance.put(
          endpoints.SKILLS.edit.replace('{id}', id),
          formData
        );
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
})

export const skillList = createAsyncThunk('skill/list', async () => {
    return (await axiosInstance.get(endpoints.SKILLS.list)).data
})

export const skillById = createAsyncThunk('skill/skillById', async (id) => {
    return (await axiosInstance.get(endpoints.SKILLS.findById.replace("{id}", id))).data
})

export const skillDelete = createAsyncThunk('skill/skillDelete', async (id) => {
    const result = (await axiosInstance.delete(endpoints.SKILLS.delete.replace("{id}", id))).data;
    result.id = id;
    return result;
})
