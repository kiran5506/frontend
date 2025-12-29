import { createSlice } from "@reduxjs/toolkit";
import { serviceById, serviceDelete, serviceList } from "@/services/service-api";


const initialState = {
    Services: [],
    currentService: null,
    loading: false,
    error: null
}

export const service = createSlice({
    name: 'service',
    initialState,
    reducers:{
        resetCurrentService: (state) => {
            state.currentService = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(serviceList.pending, (state) => {
            state.loading = true;
        })
        .addCase(serviceList.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.Services = action.payload.data;
            }
        })
        .addCase(serviceList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(serviceById.fulfilled, (state, action) => {
            if(action.payload.status){
                state.currentService = action.payload.data;
            }
        })
        .addCase(serviceDelete.fulfilled, (state, action) => {
            state.currentService = null;
            // Remove the deleted service from the Services array
            if(action.payload.id){
                state.Services = state.Services.filter(service => service._id !== action.payload.id);
            }
        })
    }
})

export const { resetCurrentService } = service.actions;
export default  service.reducer;
