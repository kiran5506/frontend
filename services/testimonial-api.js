import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

export const createTestimonial = createAsyncThunk('testimonial/create', async (request) =>{
    return (await axiosInstance.post(endpoints.TESTIMONIALS.create, request, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })).data;
})

export const testimonialEdit = createAsyncThunk('testimonial/edit', async ({id, formData}) => {
    try {
        const result = await axiosInstance.put(
          endpoints.TESTIMONIALS.edit.replace('{id}', id),
          formData,
          {
              headers: {
                  'Content-Type': 'multipart/form-data',
              }
          }
        );
        return result.data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
})

export const testimonialList = createAsyncThunk('testimonial/list', async () => {
    return (await axiosInstance.get(endpoints.TESTIMONIALS.list)).data
})

export const testimonialById = createAsyncThunk('testimonial/testimonialById', async (id) => {
    return (await axiosInstance.get(endpoints.TESTIMONIALS.findById.replace("{id}", id))).data
})

export const testimonialDelete = createAsyncThunk('testimonial/testimonialDelete', async (id) => {
    const result = (await axiosInstance.delete(endpoints.TESTIMONIALS.delete.replace("{id}", id))).data;
    result.id = id;
    return result;
})
