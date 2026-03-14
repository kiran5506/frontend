import { createSlice } from "@reduxjs/toolkit";
import { customerLogin, customerRegister, verifyCustomerOtp, resendCustomerOtp } from "@/services/customer-api";

const initialState = {
    token: undefined,
    isAuthenticated: false,
    details: null,
    loading: false,
    error: null
}

export const customerAuth = createSlice({
    name: 'customerauth',
    initialState,
    reducers: {
        setCustomerAuthState: (state, action) => {
            console.log('setCustomerAuthState ==> ', action.payload)
            const { isAuthenticated, token, details } = action.payload;
            state.isAuthenticated = isAuthenticated;
            state.token = token;
            state.details = JSON.stringify(details);
            if (typeof window !== 'undefined') {
                localStorage.setItem('cToken', token);
                localStorage.setItem('customerDetails', JSON.stringify(details));
            }
        },
        customerLogout: (state) => {
            console.log('Customer Logout called ==> ', state)
            state.isAuthenticated = false;
            state.token = null;
            state.role = null;
            state.customerid = null;
            state.details = null;
            state.registeredCustomer = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('cToken');
                localStorage.removeItem('customerDetails');
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Customer Register
            .addCase(customerRegister.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(customerRegister.fulfilled, (state, action) => {
                state.loading = false;
                if(action.payload.status && action.payload.data){
                    state.registeredCustomer = action.payload.data.customer;
                }
            })
            .addCase(customerRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.error.message;
            })
            
            // Customer Login
            .addCase(customerLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(customerLogin.fulfilled, (state, action) => {
                console.log('customerLogin.fulfilled ==> ', action.payload)
                state.loading = false;
                if(action.payload.status){
                    const { customerData, token } = action.payload.data;
                    state.token = token;
                    state.isAuthenticated = true;
                    state.details = JSON.stringify(customerData);
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('cToken', token);
                        localStorage.setItem('customerDetails', JSON.stringify(customerData));
                    }
                }
            })
            .addCase(customerLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.error.message;
            })
    },
});

export const { 
    setCustomerAuthState, 
    customerLogout,
} = customerAuth.actions;

export default customerAuth.reducer;
