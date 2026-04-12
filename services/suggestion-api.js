import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

export const createSuggestion = createAsyncThunk(
  "suggestions/create",
  async (payload, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post(endpoints.SUGGESTIONS.create, payload)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const listSuggestions = createAsyncThunk(
  "suggestions/list",
  async (_, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get(endpoints.SUGGESTIONS.list)).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const suggestionById = createAsyncThunk(
  "suggestions/findById",
  async (id, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.get(
          endpoints.SUGGESTIONS.findById.replace("{id}", id)
        )
      ).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const suggestionEdit = createAsyncThunk(
  "suggestions/edit",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.put(
          endpoints.SUGGESTIONS.edit.replace("{id}", id),
          payload
        )
      ).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const suggestionDelete = createAsyncThunk(
  "suggestions/delete",
  async (id, { rejectWithValue }) => {
    try {
      return (
        await axiosInstance.delete(
          endpoints.SUGGESTIONS.delete.replace("{id}", id)
        )
      ).data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
