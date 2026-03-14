import { createSlice } from "@reduxjs/toolkit";
import { testimonialById, testimonialDelete, testimonialList } from "@/services/testimonial-api";


const initialState = {
    Testimonials: [],
    currentTestimonial: null,
    loading: false,
    error: null
}

export const testimonial = createSlice({
    name: 'testimonial',
    initialState,
    reducers:{
        resetCurrentTestimonial: (state) => {
            state.currentTestimonial = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(testimonialList.pending, (state) => {
            state.loading = true;
        })
        .addCase(testimonialList.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.Testimonials = action.payload.data;
            }
        })
        .addCase(testimonialList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(testimonialById.fulfilled, (state, action) => {
            if(action.payload.status){
                state.currentTestimonial = action.payload.data;
            }
        })
        .addCase(testimonialDelete.fulfilled, (state, action) => {
            state.currentTestimonial = null;
            // Remove the deleted testimonial from the Testimonials array
            if(action.payload.id){
                state.Testimonials = state.Testimonials.filter(testimonial => testimonial._id !== action.payload.id);
            }
        })
    }
})

export const { resetCurrentTestimonial } = testimonial.actions;
export default testimonial.reducer;
