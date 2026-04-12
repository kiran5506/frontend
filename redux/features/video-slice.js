import { createSlice } from "@reduxjs/toolkit";
import { videoById, videoDelete, videoList } from "@/services/video-api";

const initialState = {
    Videos: [],
    currentVideo: null,
    loading: false,
    error: null
};

export const video = createSlice({
    name: 'video',
    initialState,
    reducers: {
        resetCurrentVideo: (state) => {
            state.currentVideo = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(videoList.pending, (state) => {
            state.loading = true;
        })
        .addCase(videoList.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status) {
                state.Videos = action.payload.data;
            } else {
                state.Videos = [];
            }
        })
        .addCase(videoList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.Videos = [];
        })
        .addCase(videoById.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.currentVideo = action.payload.data;
            }
        })
        .addCase(videoDelete.fulfilled, (state, action) => {
            state.currentVideo = null;
            if (action.payload.id) {
                state.Videos = state.Videos.filter(video => video._id !== action.payload.id);
            }
        })
    }
});

export const { resetCurrentVideo } = video.actions;
export default video.reducer;
