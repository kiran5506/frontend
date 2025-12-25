import { createSlice } from "@reduxjs/toolkit";
import { vendorLogin } from "@/services/vendor-api";

const initialState = {
    vendor: null,
    isloggedIn: false,
    loading: false,
    error: null
};

const vendorSlice = createSlice({
    name: 'vendor',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.vendor = null;
            state.isloggedIn = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(vendorLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(vendorLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.vendor = action.payload.data;
                state.isloggedIn = true;
            })
            .addCase(vendorLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { loginRequest, loginSuccess, loginFailure, logout } = vendorSlice.actions;
export default vendorSlice.reducer;
