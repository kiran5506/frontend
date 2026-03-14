import { createSlice } from "@reduxjs/toolkit";
import {
    createBusinessProfile,
    businessProfileEdit,
    businessProfileDelete,
    businessProfileList,
    businessProfileById,
    businessProfileByVendorId
} from "@/services/business-profile-api";

const initialState = {
    businessProfiles: [],
    currentBusinessProfile: null,
    loading: false,
    error: null,
    success: false,
};

const businessProfileSlice = createSlice({
    name: "businessProfile",
    initialState,
    reducers: {
        resetCurrentBusinessProfile: (state) => {
            state.currentBusinessProfile = null;
        },
        resetError: (state) => {
            state.error = null;
        },
        resetSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        // Create Business Profile
        builder.addCase(createBusinessProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(createBusinessProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            if (action.payload.status) {
                state.businessProfiles.push(action.payload.data);
                state.currentBusinessProfile = action.payload.data;
            }
        });
        builder.addCase(createBusinessProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.success = false;
        });

        // Business Profile Edit
        builder.addCase(businessProfileEdit.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(businessProfileEdit.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            if (action.payload.status) {
                const index = state.businessProfiles.findIndex(
                    (item) => item._id === action.payload.data._id
                );
                if (index !== -1) {
                    state.businessProfiles[index] = action.payload.data;
                }
                state.currentBusinessProfile = action.payload.data;
            }
        });
        builder.addCase(businessProfileEdit.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.success = false;
        });

        // Business Profile Delete
        builder.addCase(businessProfileDelete.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(businessProfileDelete.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status) {
                state.businessProfiles = state.businessProfiles.filter(
                    (item) => item._id !== action.payload.id
                );
            }
        });
        builder.addCase(businessProfileDelete.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Business Profile List
        builder.addCase(businessProfileList.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(businessProfileList.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status) {
                state.businessProfiles = action.payload.data;
            }
        });
        builder.addCase(businessProfileList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Business Profile By ID
        builder.addCase(businessProfileById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(businessProfileById.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status) {
                state.currentBusinessProfile = action.payload.data;
            }
        });
        builder.addCase(businessProfileById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Business Profile By Vendor ID
        builder.addCase(businessProfileByVendorId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(businessProfileByVendorId.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status) {
                state.businessProfiles = action.payload.data;
            }
        });
        builder.addCase(businessProfileByVendorId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { resetCurrentBusinessProfile, resetError, resetSuccess } = businessProfileSlice.actions;
export default businessProfileSlice.reducer;
