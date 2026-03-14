import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";
import axiosInstance from "@/utils/axios";

export const login = createAsyncThunk("login/submit", async (request) => {
    console.log('login--->', endpoints.AUTH.authLogin)
    return (await axiosInstance.post(endpoints.AUTH.authLogin, request)).data;
})

export const fetchUserById = createAsyncThunk('user/fetchById', async(id) => {
    const response = await axiosInstance.get(endpoints.USERS.findById.replace("{id}", id));
    return response.data;
})

export const fetchAllUsers = createAsyncThunk('user/fetchAll', async () => {
    return (await axiosInstance.get(endpoints.USERS.list)).data;
})

export const updateAdProfile = createAsyncThunk('user/update', async (request) => {
    return (await axiosInstance.put(endpoints.USERS.edit.replace('{id}', request.id), request, {
        headers: { 'Content-Type': 'multipart/form-data'},
      })).data;
})

export const verifyOtp = createAsyncThunk('user/verifyOtp', async (userObject) => {
    return (await axiosInstance.post(endpoints.AUTH.verifyOtp, userObject)).data;
})

export const updatePassword = createAsyncThunk('user/updatePassword', async (userObject) => {
    return (await axiosInstance.post(endpoints.AUTH.updatePassword, userObject)).data;
})

export const deleteUser = createAsyncThunk('user/delete', async (id, { rejectWithValue }) => {
    try {
        return (await axiosInstance.delete(endpoints.USERS.delete.replace('{id}', id))).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


