import { createSlice } from "@reduxjs/toolkit";
import {
  createSuggestion,
  listSuggestions,
  suggestionById,
  suggestionEdit,
  suggestionDelete
} from "@/services/suggestion-api";

const initialState = {
  suggestions: [],
  currentSuggestion: null,
  loading: false,
  error: null
};

const suggestionSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {
    resetCurrentSuggestion: (state) => {
      state.currentSuggestion = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(listSuggestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(listSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.status) {
          state.suggestions = action.payload.data;
        } else {
          state.suggestions = [];
        }
      })
      .addCase(listSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.suggestions = [];
      })
      .addCase(suggestionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(suggestionById.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.status) {
          state.currentSuggestion = action.payload.data;
        }
      })
      .addCase(suggestionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.status) {
          state.suggestions.push(action.payload.data);
        }
      })
      .addCase(createSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(suggestionEdit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(suggestionEdit.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.status) {
          state.currentSuggestion = action.payload.data;
          const index = state.suggestions.findIndex(
            (item) => item._id === action.payload.data._id
          );
          if (index !== -1) {
            state.suggestions[index] = action.payload.data;
          }
        }
      })
      .addCase(suggestionEdit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(suggestionDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(suggestionDelete.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.status) {
          state.suggestions = state.suggestions.filter(
            (item) => item._id !== action.payload.data?._id
          );
        }
      })
      .addCase(suggestionDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { resetCurrentSuggestion } = suggestionSlice.actions;
export default suggestionSlice.reducer;
