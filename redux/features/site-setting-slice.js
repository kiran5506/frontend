import { createSlice } from "@reduxjs/toolkit";
import { getSiteSettings, updateSiteSettings } from "@/services/admin-api";

const initialState = {
    siteSettings: null,
    loading: false,
    error: null,
    updateSuccess: false
}

export const siteSettingSlice = createSlice({
    name: 'siteSettings',
    initialState,
    reducers: {
        resetSiteSettingsState: (state) => {
            state.siteSettings = null;
            state.loading = false;
            state.error = null;
            state.updateSuccess = false;
        },
        clearUpdateFlag: (state) => {
            state.updateSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
        // getSiteSettings
        .addCase(getSiteSettings.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.updateSuccess = false;
        })
        .addCase(getSiteSettings.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload && action.payload.status){
                state.siteSettings = action.payload.data;
            } else {
                state.error = action.payload?.message || null;
            }
        })
        .addCase(getSiteSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
        })

        // updateSiteSettings
        .addCase(updateSiteSettings.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.updateSuccess = false;
        })
        .addCase(updateSiteSettings.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload && action.payload.status){
                // update the settings in state
                state.siteSettings = action.payload.data;
                state.updateSuccess = true;
            } else {
                state.error = action.payload?.message || null;
            }
        })
        .addCase(updateSiteSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
            state.updateSuccess = false;
        })
    }
});

export const { resetSiteSettingsState, clearUpdateFlag } = siteSettingSlice.actions;
export default siteSettingSlice.reducer;