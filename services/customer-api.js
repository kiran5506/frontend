import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

// Customer Authentication APIs
export const customerRegister = createAsyncThunk('customerauth/register', async (customerData, { rejectWithValue }) => {
    try {
        return (await axiosInstance.post(endpoints.CUSTOMER_AUTH.register, customerData)).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
    }
});

export const customerLogin = createAsyncThunk('customerauth/login', async (credentials, { rejectWithValue }) => {
    try {
        return (await axiosInstance.post(endpoints.CUSTOMER_AUTH.login, credentials)).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
    }
});

export const verifyCustomerOtp = createAsyncThunk('customerauth/verifyOtp', async (otpData, { rejectWithValue }) => {
    try {
        return (await axiosInstance.post(endpoints.CUSTOMER_AUTH.verifyOtp, otpData)).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
    }
});

export const resendCustomerOtp = createAsyncThunk('customerauth/resendOtp', async (customerId, { rejectWithValue }) => {
    try {
        const payload = typeof customerId === 'object'
            ? {
                customer_id: customerId?.customer_id || customerId?.customerId,
                purpose: customerId?.purpose
            }
            : { customer_id: customerId };
        return (await axiosInstance.post(endpoints.CUSTOMER_AUTH.resendOtp, payload)).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
    }
});

export const forgotPassword = createAsyncThunk('customerauth/forgotPassword', async (email, { rejectWithValue }) => {
    try {
        return (await axiosInstance.post(endpoints.CUSTOMER_AUTH.forgotPassword, { email })).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
    }
});

export const verifyForgotPasswordOtp = createAsyncThunk('customerauth/verifyForgotPasswordOtp', async (otpData, { rejectWithValue }) => {
    try {
        return (await axiosInstance.post(endpoints.CUSTOMER_AUTH.verifyForgotPasswordOtp, otpData)).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
    }
});

export const resetPassword = createAsyncThunk('customerauth/resetPassword', async (resetData, { rejectWithValue }) => {
    try {
        return (await axiosInstance.post(endpoints.CUSTOMER_AUTH.resetPassword, resetData)).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
    }
});

export const changePassword = createAsyncThunk('customerauth/changePassword', async (changePasswordData, { rejectWithValue }) => {
    try {
        return (await axiosInstance.post(endpoints.CUSTOMER_AUTH.changePassword, changePasswordData)).data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
    }
});

// Create a new customer
export const createCustomer = createAsyncThunk('customer/create', async (customerData, { rejectWithValue }) => {
    try {
        return (await axiosInstance.post(endpoints.CUSTOMER.create, customerData)).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Fetch all customers
export const fetchAllCustomers = createAsyncThunk('customer/list', async (_, { rejectWithValue }) => {
    try {
        return (await axiosInstance.get(endpoints.CUSTOMER.list)).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// View customer by ID
export const viewCustomerById = createAsyncThunk('customer/viewById', async (id, { rejectWithValue }) => {
    try {
        return (await axiosInstance.get(endpoints.CUSTOMER.findById.replace('{id}', id))).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Update customer
export const updateCustomer = createAsyncThunk('customer/update', async ({ id, customerData }, { rejectWithValue }) => {
    try {
        return (await axiosInstance.put(endpoints.CUSTOMER.edit.replace('{id}', id), customerData)).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Delete customer
export const deleteCustomer = createAsyncThunk('customer/delete', async (id, { rejectWithValue }) => {
    try {
        const response = (await axiosInstance.delete(endpoints.CUSTOMER.delete.replace('{id}', id))).data;
        return { ...response, id };
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Toggle customer status
export const toggleCustomerStatus = createAsyncThunk('customer/toggleStatus', async (id, { rejectWithValue }) => {
    try {
        return (await axiosInstance.patch(endpoints.CUSTOMER.toggleStatus.replace('{id}', id))).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Fetch customers by type (direct or enquiry)
export const fetchCustomersByType = createAsyncThunk('customer/listByType', async (type, { rejectWithValue }) => {
    try {
        return (await axiosInstance.get(endpoints.CUSTOMER.listByType.replace('{type}', type))).data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Direct request helpers for typed TS pages
export const forgotPasswordRequest = async (email) => {
    return (await axiosInstance.post(endpoints.CUSTOMER_AUTH.forgotPassword, { email })).data;
};

export const verifyForgotPasswordOtpRequest = async (otpData) => {
    return (await axiosInstance.post(endpoints.CUSTOMER_AUTH.verifyForgotPasswordOtp, otpData)).data;
};

export const verifyCustomerOtpRequest = async (otpData) => {
    return (await axiosInstance.post(endpoints.CUSTOMER_AUTH.verifyOtp, otpData)).data;
};

export const resendCustomerOtpRequest = async (payload) => {
    return (await axiosInstance.post(endpoints.CUSTOMER_AUTH.resendOtp, payload)).data;
};

export const resetPasswordRequest = async (resetData) => {
    return (await axiosInstance.post(endpoints.CUSTOMER_AUTH.resetPassword, resetData)).data;
};
