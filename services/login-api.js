import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";
import axiosInstance from "@/utils/axios";

export const login = createAsyncThunk("login/submit", async (request) => {
    console.log('login--->', endpoints.AUTH.authLogin)
    return (await axiosInstance.post(endpoints.AUTH.authLogin, request)).data;
})

export const fetchUserById = createAsyncThunk('user/fetchById', async(id) => {
    const response = await axiosInstance.get(endpoints.AUTH.findByUserId.replace("{id}", id));
    return response.data;
})

export const fetchAllUsers = createAsyncThunk('user/fetchallUsers', async () => {
    return (await axiosInstance.get(endpoints.AUTH.fetchUsers)).data;
})

export const updateAdProfile = createAsyncThunk('user/udpateprofile', async (request) => {
    return (await axiosInstance.put(endpoints.AUTH.updateAdprofile, request, {
        headers: { 'Content-Type': 'multipart/form-data'},
      })).data;
})

export const updateAdPassword = createAsyncThunk('user/updatePassword', async (request) => {
    return (await axiosInstance.put(endpoints.AUTH.updateAdPassword, request)).data;
})

export const updateUsrProfile = createAsyncThunk('user/udpateUserProfile', async ({formData, userid}) => {
    return (await axiosInstance.put(endpoints.AUTH.updateUsrProfile.replace('{id}', userid), formData, {
        headers: { 'Content-Type': 'multipart/form-data'},
      })).data;
})

export const updateBankDetails = createAsyncThunk('user/updateBankDetails', async ({data, userid}) => {
    return (await axiosInstance.put(endpoints.AUTH.updateBankDetails.replace('{id}', userid), data )).data;
})

export const updateKyc = createAsyncThunk('user/updateKyc', async ({formData, userid}) => {
    return (await axiosInstance.put(endpoints.AUTH.updateKyc.replace('{id}', userid), formData, {
        headers: { 'Content-Type': 'multipart/form-data'},
      })).data;
})

export const fetchRefUsers = createAsyncThunk('user/fetchRefUsers', async (userid) => {
    return (await axiosInstance.get(`${endpoints.AUTH.fetchRefUsers}?userid=${userid}`)).data;
})

export const fetchRefarrals = createAsyncThunk('user/fetchRefarrals', async (requestObj) => {
    return (await axiosInstance.post(endpoints.AUTH.fetchRefarrals, requestObj)).data;
})

export const fetchEarnings = createAsyncThunk('user/fetchEarnings', async (userObject) => {
    return (await axiosInstance.post(endpoints.AUTH.fetchEarnings, userObject)).data;
})

export const sendmail = createAsyncThunk('user/sendmail', async (userObject) => {
    return (await axiosInstance.post(endpoints.AUTH.sendmail, userObject)).data;
})

export const getAllTopUsers = createAsyncThunk('user/getAllTopUsers', async () => {
    return (await axiosInstance.get(endpoints.AUTH.getAllTopUsers)).data;
})

export const verifyUserEmail = createAsyncThunk('user/verifyUserEmail', async (userObject) => {
    return (await axiosInstance.post(endpoints.AUTH.verifyUserEmail, userObject)).data;
})

export const verifyOtp = createAsyncThunk('user/verifyOtp', async (userObject) => {
    return (await axiosInstance.post(endpoints.AUTH.verifyOtp, userObject)).data;
})

export const updatePassword = createAsyncThunk('user/updatePassword', async (userObject) => {
    return (await axiosInstance.post(endpoints.AUTH.updatePassword, userObject)).data;
})

export const upgradePackge = createAsyncThunk('user/upgradePackge', async (userObject) => {
    return (await axiosInstance.post(endpoints.AUTH.upgradePackge, userObject)).data;
})

export const updateIsCash = createAsyncThunk('user/updateIsCash', async (userObject) => {
    return (await axiosInstance.post(endpoints.AUTH.updateIsCash, userObject)).data;
})


