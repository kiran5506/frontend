import { createSlice } from "@reduxjs/toolkit";
import { eventById, eventDelete, eventList } from "@/services/event-api";


const initialState = {
    Events: [],
    currentEvent: null,
    loading: false,
    error: null
}

export const event = createSlice({
    name: 'event',
    initialState,
    reducers:{
        resetCurrentEvent: (state) => {
            state.currentEvent = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(eventList.pending, (state) => {
            state.loading = true;
        })
        .addCase(eventList.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.Events = action.payload.data;
            }
        })
        .addCase(eventList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(eventById.fulfilled, (state, action) => {
            if(action.payload.status){
                state.currentEvent = action.payload.data;
            }
        })
        .addCase(eventDelete.fulfilled, (state, action) => {
            state.currentEvent = null;
            // Remove the deleted event from the Events array
            if(action.payload.id){
                state.Events = state.Events.filter(event => event._id !== action.payload.id);
            }
        })
    }
})

export const { resetCurrentEvent } = event.actions;
export default event.reducer;
