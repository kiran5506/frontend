import { createSlice } from "@reduxjs/toolkit";
import { categoryById, categoryDelete, categoryList } from "@/services/category-api";


const initialState = {
    Categories: [],
    currentCategory: null,
    loading: false,
    error: null
}

export const category = createSlice({
    name: 'category',
    initialState,
    reducers:{
        resetCurrentCategory: (state) => {
            state.currentCategory = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(categoryList.pending, (state) => {
            state.loading = true;
        })
        .addCase(categoryList.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.Categories = action.payload.data;
            }
        })
        .addCase(categoryList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(categoryById.fulfilled, (state, action) => {
            if(action.payload.status){
                state.currentCategory = action.payload.data;
            }
        })
        .addCase(categoryDelete.fulfilled, (state, action) => {
            state.currentCategory = null;
            // Remove the deleted category from the Categories array
            if(action.payload.id){
                state.Categories = state.Categories.filter(category => category._id !== action.payload.id);
            }
        })
    }
})

export const { resetCurrentCategory } = category.actions;
export default category.reducer;
