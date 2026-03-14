import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

export const createEmployee = createAsyncThunk('employee/create', async (request) =>{
    try {
        const result = await axiosInstance.post(
            endpoints.EMPLOYEES.create, 
            request
        );
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
})

export const employeeEdit = createAsyncThunk('employee/edit', async ({id, formData}) => {
    try {
        const result = await axiosInstance.put(
          endpoints.EMPLOYEES.edit.replace('{id}', id),
          formData
        );
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
})

export const employeeList = createAsyncThunk('employee/list', async () => {
    return (await axiosInstance.get(endpoints.EMPLOYEES.list)).data
})

export const employeeById = createAsyncThunk('employee/employeeById', async (id) => {
    return (await axiosInstance.get(endpoints.EMPLOYEES.findById.replace("{id}", id))).data
})

export const employeeDelete = createAsyncThunk('employee/employeeDelete', async (id) => {
    const result = (await axiosInstance.delete(endpoints.EMPLOYEES.delete.replace("{id}", id))).data;
    result.id = id;
    return result;
})
