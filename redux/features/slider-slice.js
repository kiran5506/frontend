import { createSlice } from "@reduxjs/toolkit";
import { sliderById, sliderDelete, sliderList } from "@/services/slider-api";


const initialState = {
    Sliders: [],
    currentSlider: null,
    loading: false,
    error: null
}

export const slider = createSlice({
    name: 'slider',
    initialState,
    reducers:{
        resetCurrentSlider: (state) => {
            state.currentSlider = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sliderList.pending, (state) => {
            state.loading = true;
        })
        .addCase(sliderList.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.Sliders = action.payload.data;
            }
        })
        .addCase(sliderList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(sliderById.fulfilled, (state, action) => {
            if(action.payload.status){
                state.currentSlider = action.payload.data;
            }
        })
        .addCase(sliderDelete.fulfilled, (state, action) => {
            state.currentSlider = null;
            // Remove the deleted slider from the Sliders array
            if(action.payload.id){
                state.Sliders = state.Sliders.filter(slider => slider._id !== action.payload.id);
            }
        })
    }
})

export const { resetCurrentSlider } = slider.actions;
export default  slider.reducer;