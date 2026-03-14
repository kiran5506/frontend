import { createSlice } from "@reduxjs/toolkit";
import { 
    createCustomer, 
    deleteCustomer, 
    fetchAllCustomers, 
    fetchCustomersByType, 
    toggleCustomerStatus, 
    updateCustomer, 
    viewCustomerById 
} from "@/services/customer-api";

const initialState = {
    customersData: [],
    currentCustomer: null,
    loading: false,
    error: null,
    createLoading: false,
    createError: null,
    updateLoading: false,
    updateError: null,
    deleteLoading: false,
    deleteError: null
};

const customerSlice = createSlice({
    name: 'customer',
    initialState: initialState,
    reducers: {
        resetCurrentCustomer: (state) => {
            state.currentCustomer = null;
        },
        clearErrors: (state) => {
            state.error = null;
            state.createError = null;
            state.updateError = null;
            state.deleteError = null;
        },
        setCurrentCustomer: (state, action) => {
            state.currentCustomer = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all customers
            .addCase(fetchAllCustomers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCustomers.fulfilled, (state, action) => {
                if(action.payload.status){
                    state.customersData = action.payload.data;
                    state.loading = false;
                }
            })
            .addCase(fetchAllCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.error.message;
            })
            
            // Create customer
            .addCase(createCustomer.pending, (state) => {
                state.createLoading = true;
                state.createError = null;
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.createLoading = false;
                if(action.payload.status && action.payload.data){
                    // Add the new customer to the list
                    state.customersData.unshift(action.payload.data);
                }
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.createLoading = false;
                state.createError = action.payload?.message || action.error.message;
            })
            
            // View customer by ID
            .addCase(viewCustomerById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(viewCustomerById.fulfilled, (state, action) => {
                state.loading = false;
                if(action.payload.status){
                    state.currentCustomer = action.payload.data;
                }
            })
            .addCase(viewCustomerById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.error.message;
            })
            
            // Update customer
            .addCase(updateCustomer.pending, (state) => {
                state.updateLoading = true;
                state.updateError = null;
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.updateLoading = false;
                if(action.payload.status && action.payload.data){
                    // Update the customer in the list
                    const index = state.customersData.findIndex(
                        customer => customer._id === action.payload.data._id
                    );
                    if(index !== -1){
                        state.customersData[index] = action.payload.data;
                    }
                    // Update current customer if it's the same one
                    if(state.currentCustomer?._id === action.payload.data._id){
                        state.currentCustomer = action.payload.data;
                    }
                }
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.updateLoading = false;
                state.updateError = action.payload?.message || action.error.message;
            })
            
            // Delete customer
            .addCase(deleteCustomer.pending, (state) => {
                state.deleteLoading = true;
                state.deleteError = null;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.currentCustomer = null;
                // Remove the deleted customer from the customersData array
                if(action.payload.id){
                    state.customersData = state.customersData.filter(
                        customer => customer._id !== action.payload.id
                    );
                }
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.deleteLoading = false;
                state.deleteError = action.payload?.message || action.error.message;
            })
            
            // Toggle customer status
            .addCase(toggleCustomerStatus.fulfilled, (state, action) => {
                if(action.payload.status && action.payload.data){
                    // Update the customer status in the list
                    const index = state.customersData.findIndex(
                        customer => customer._id === action.payload.data._id
                    );
                    if(index !== -1){
                        state.customersData[index] = action.payload.data;
                    }
                    // Update current customer if it's the same one
                    if(state.currentCustomer?._id === action.payload.data._id){
                        state.currentCustomer = action.payload.data;
                    }
                }
            })
            .addCase(toggleCustomerStatus.rejected, (state, action) => {
                state.error = action.payload?.message || action.error.message;
            })
            
            // Fetch customers by type
            .addCase(fetchCustomersByType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomersByType.fulfilled, (state, action) => {
                state.loading = false;
                if(action.payload.status){
                    state.customersData = action.payload.data;
                }
            })
            .addCase(fetchCustomersByType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.error.message;
            });
    }
});

export const { 
    resetCurrentCustomer, 
    clearErrors, 
    setCurrentCustomer 
} = customerSlice.actions;

export default customerSlice.reducer;
