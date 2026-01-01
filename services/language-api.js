import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

export const createLanguage = createAsyncThunk('language/create', async (request) =>{
    return (await axiosInstance.post(endpoints.LANGUAGES.create, request)).data;
})

export const languageEdit = createAsyncThunk('language/edit', async ({id, formData}) => {
    try {
        const result = await axiosInstance.put(
          endpoints.LANGUAGES.edit.replace('{id}', id),
          formData
        );
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
})

export const languageList = createAsyncThunk('language/list', async () => {
    return (await axiosInstance.get(endpoints.LANGUAGES.list)).data
})

export const languageById = createAsyncThunk('language/languageById', async (id) => {
    return (await axiosInstance.get(endpoints.LANGUAGES.findById.replace("{id}", id))).data
})

export const languageDelete = createAsyncThunk('language/languageDelete', async (id) => {
    const result = (await axiosInstance.delete(endpoints.LANGUAGES.delete.replace("{id}", id))).data;
    result.id = id;
    return result;
})
