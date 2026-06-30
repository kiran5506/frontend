import { createSlice } from "@reduxjs/toolkit";
import { blogAdminList, blogById, blogDelete, blogList } from "@/services/blog-api";

const initialState = {
    Blogs: [],
    currentBlog: null,
    loading: false,
    error: null,
};

export const blog = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        resetCurrentBlog: (state) => {
            state.currentBlog = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(blogList.pending, (state) => { state.loading = true; })
            .addCase(blogList.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.status) state.Blogs = action.payload.data;
            })
            .addCase(blogList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(blogAdminList.pending, (state) => { state.loading = true; })
            .addCase(blogAdminList.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.status) state.Blogs = action.payload.data;
            })
            .addCase(blogAdminList.rejected, (state, action) => {
                state.loading = false;
                state.Blogs = [];
                state.error = action.error.message;
            })
            .addCase(blogById.fulfilled, (state, action) => {
                if (action.payload.status) state.currentBlog = action.payload.data;
            })
            .addCase(blogDelete.fulfilled, (state, action) => {
                state.currentBlog = null;
                if (action.payload.id) {
                    state.Blogs = state.Blogs.filter(b => b._id !== action.payload.id);
                }
            });
    }
});

export const { resetCurrentBlog } = blog.actions;
export default blog.reducer;
