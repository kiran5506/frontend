import { createSlice } from "@reduxjs/toolkit";
import { businessPackageById, businessPackageDelete, businessPackageList, businessPackageListByVendor, businessPackageToggleStatus } from "@/services/business-package-api";

const initialState = {
    BusinessPackages: [],
    currentBusinessPackage: null,
    loading: false,
    error: null
};

export const businessPackage = createSlice({
    name: 'businessPackage',
    initialState,
    reducers: {
        resetCurrentBusinessPackage: (state) => {
            state.currentBusinessPackage = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(businessPackageList.pending, (state) => {
            state.loading = true;
        })
        .addCase(businessPackageList.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status) {
                state.BusinessPackages = action.payload.data;
            }
        })
        .addCase(businessPackageList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(businessPackageListByVendor.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.BusinessPackages = action.payload.data;
            }
        })
        .addCase(businessPackageById.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.currentBusinessPackage = action.payload.data;
            }
        })
        .addCase(businessPackageDelete.fulfilled, (state, action) => {
            state.currentBusinessPackage = null;
            if (action.payload.id) {
                state.BusinessPackages = state.BusinessPackages.filter(pkg => pkg._id !== action.payload.id);
            }
        })
        .addCase(businessPackageToggleStatus.fulfilled, (state, action) => {
            if (action.payload?.data) {
                const { _id, isActive } = action.payload.data;
                state.BusinessPackages = state.BusinessPackages.map(pkg =>
                    pkg._id === _id ? { ...pkg, isActive } : pkg
                );
            }
        });
    }
});

export const { resetCurrentBusinessPackage } = businessPackage.actions;
export default businessPackage.reducer;
