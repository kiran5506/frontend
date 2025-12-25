import { createSlice } from "@reduxjs/toolkit";
import { sliderList } from "@/services/slider-api";


const initialState = {
    Sliders: [],
    loading: false,
    error: null
}

export const slider = createSlice({
    name: 'slider',
    initialState,
    reducers:{},
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
    }
})

export default  slider.reducer;