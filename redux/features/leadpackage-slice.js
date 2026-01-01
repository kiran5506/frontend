import { createSlice } from "@reduxjs/toolkit";
import { leadpackageById, leadpackageDelete, leadpackageList } from "@/services/leadpackage-api";


const initialState = {
    LeadPackages: [],
    currentLeadPackage: null,
    loading: false,
    error: null
}

export const leadpackage = createSlice({
    name: 'leadpackage',
    initialState,
    reducers:{
        resetCurrentLeadPackage: (state) => {
            state.currentLeadPackage = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(leadpackageList.pending, (state) => {
            state.loading = true;
        })
        .addCase(leadpackageList.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.LeadPackages = action.payload.data;
            }
        })
        .addCase(leadpackageList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(leadpackageById.fulfilled, (state, action) => {
            if(action.payload.status){
                state.currentLeadPackage = action.payload.data;
            }
        })
        .addCase(leadpackageDelete.fulfilled, (state, action) => {
            state.currentLeadPackage = null;
            // Remove the deleted leadpackage from the LeadPackages array
            if(action.payload.id){
                state.LeadPackages = state.LeadPackages.filter(leadpackage => leadpackage._id !== action.payload.id);
            }
        })
    }
})

export const { resetCurrentLeadPackage } = leadpackage.actions;
export default leadpackage.reducer;
