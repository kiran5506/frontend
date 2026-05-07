import { createSlice } from "@reduxjs/toolkit";
import { 
  createFeedback, 
  listFeedback, 
  getFeedbackById, 
  updateFeedback, 
  deleteFeedback,
  getFeedbackByVendorId,
  getFeedbackByCustomerId
} from "@/services/feedback-api";

const initialState = {
  feedbacks: [],
  currentFeedback: null,
  loading: false,
  error: null,
  message: null
}

export const feedback = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    resetCurrentFeedback: (state) => {
      state.currentFeedback = null;
    },
    clearMessage: (state) => {
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create feedback
      .addCase(createFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.status){
          state.message = action.payload.message;
          state.feedbacks.push(action.payload.data);
        }
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // List feedbacks
      .addCase(listFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(listFeedback.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.status){
          state.feedbacks = action.payload.data;
        } else {
          state.feedbacks = [];
        }
      })
      .addCase(listFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.feedbacks = [];
      })
      
      // Get feedback by ID
      .addCase(getFeedbackById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeedbackById.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.status){
          state.currentFeedback = action.payload.data;
        }
      })
      .addCase(getFeedbackById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Update feedback
      .addCase(updateFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFeedback.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.status){
          state.message = action.payload.message;
          const index = state.feedbacks.findIndex(f => f._id === action.payload.data._id);
          if(index !== -1){
            state.feedbacks[index] = action.payload.data;
          }
          state.currentFeedback = action.payload.data;
        }
      })
      .addCase(updateFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Delete feedback
      .addCase(deleteFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.status){
          state.message = action.payload.message;
          state.feedbacks = state.feedbacks.filter(f => f._id !== action.payload.id);
          state.currentFeedback = null;
        }
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Get feedback by vendor ID
      .addCase(getFeedbackByVendorId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeedbackByVendorId.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.status){
          state.feedbacks = action.payload.data;
        }
      })
      .addCase(getFeedbackByVendorId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Get feedback by customer ID
      .addCase(getFeedbackByCustomerId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeedbackByCustomerId.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.status){
          state.feedbacks = action.payload.data;
        }
      })
      .addCase(getFeedbackByCustomerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
})

export const { resetCurrentFeedback, clearMessage } = feedback.actions;
export default feedback.reducer;
