import { createSlice } from "@reduxjs/toolkit";
import { deleteVendor, fetchAllVendors, vendorLogin, viewVendorById } from "@/services/vendor-api";

const initialState = {
    vendorsData: [],
    currentVendor: null,
    loading: false,
    error: null
};

const vendorSlice = createSlice({
    name: 'vendor',
    initialState: initialState,
    reducers: {
        resetCurrentVendor: (state) => {
            state.currentVendor = null;
        }
    },
    extraReducers: (builder) => {
        builder
            builder.addCase(fetchAllVendors.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllVendors.fulfilled, (state, action) => {
                if(action.payload.status){
                    state.vendorsData = action.payload.data;
                    state.loading = false;
                }
            })
            .addCase(fetchAllVendors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteVendor.fulfilled, (state, action) => {
                state.currentVendor = null;
                // Remove the deleted vendor from the vendorsData array
                if(action.payload.id){
                    state.vendorsData = state.vendorsData.filter(vendor => vendor._id !== action.payload.id);
                }
            })
            .addCase(viewVendorById.fulfilled, (state, action) => {
                state.currentVendor = action.payload.data;
            });
    }
});

export const { resetCurrentVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
