import { createSlice } from "@reduxjs/toolkit";
import { cityById, cityDelete, cityList } from "@/services/city-api";


const initialState = {
    Cities: [],
    currentCity: null,
    loading: false,
    error: null
}

export const city = createSlice({
    name: 'city',
    initialState,
    reducers:{
        resetCurrentCity: (state) => {
            state.currentCity = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(cityList.pending, (state) => {
            state.loading = true;
        })
        .addCase(cityList.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.Cities = action.payload.data;
            }
        })
        .addCase(cityList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(cityById.fulfilled, (state, action) => {
            if(action.payload.status){
                state.currentCity = action.payload.data;
            }
        })
        .addCase(cityDelete.fulfilled, (state, action) => {
            state.currentCity = null;
            // Remove the deleted city from the Cities array
            if(action.payload.id){
                state.Cities = state.Cities.filter(city => city._id !== action.payload.id);
            }
        })
    }
})

export const { resetCurrentCity } = city.actions;
export default city.reducer;
