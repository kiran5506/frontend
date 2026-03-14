import { createSlice } from "@reduxjs/toolkit";
import {
    createReview,
    reviewEdit,
    reviewDelete,
    reviewList,
    reviewById,
    reviewByVendorId,
    reviewByCustomerId
} from "@/services/review-api";

const initialState = {
    reviews: [],
    vendorReviews: [],
    currentReview: null,
    loading: false,
    error: null,
    success: false,
    pagination: {
        total: 0,
        page: 1,
        limit: 10,
        pages: 0
    }
};

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        resetCurrentReview: (state) => {
            state.currentReview = null;
        },
        resetError: (state) => {
            state.error = null;
        },
        resetSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        // Create Review
        builder.addCase(createReview.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(createReview.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            if (action.payload.status) {
                state.reviews.push(action.payload.data);
                state.currentReview = action.payload.data;
            }
        });
        builder.addCase(createReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.success = false;
        });

        // Review Edit
        builder.addCase(reviewEdit.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(reviewEdit.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            if (action.payload.status) {
                const index = state.reviews.findIndex(
                    (item) => item._id === action.payload.data._id
                );
                if (index !== -1) {
                    state.reviews[index] = action.payload.data;
                }
                const vendorIndex = state.vendorReviews.findIndex(
                    (item) => item._id === action.payload.data._id
                );
                if (vendorIndex !== -1) {
                    state.vendorReviews[vendorIndex] = action.payload.data;
                }
                state.currentReview = action.payload.data;
            }
        });
        builder.addCase(reviewEdit.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.success = false;
        });

        // Review Delete
        builder.addCase(reviewDelete.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(reviewDelete.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status) {
                state.reviews = state.reviews.filter(
                    (item) => item._id !== action.payload.id
                );
                state.vendorReviews = state.vendorReviews.filter(
                    (item) => item._id !== action.payload.id
                );
            }
        });
        builder.addCase(reviewDelete.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Review List
        builder.addCase(reviewList.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(reviewList.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status) {
                state.reviews = action.payload.data;
                if (action.payload.pagination) {
                    state.pagination = action.payload.pagination;
                }
            }
        });
        builder.addCase(reviewList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Review By ID
        builder.addCase(reviewById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(reviewById.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status) {
                state.currentReview = action.payload.data;
            }
        });
        builder.addCase(reviewById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Review By Vendor ID
        builder.addCase(reviewByVendorId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(reviewByVendorId.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status) {
                state.vendorReviews = action.payload.data;
                if (action.payload.pagination) {
                    state.pagination = action.payload.pagination;
                }
            }
        });
        builder.addCase(reviewByVendorId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Review By Customer ID
        builder.addCase(reviewByCustomerId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(reviewByCustomerId.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status) {
                state.reviews = action.payload.data;
                if (action.payload.pagination) {
                    state.pagination = action.payload.pagination;
                }
            }
        });
        builder.addCase(reviewByCustomerId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const { resetCurrentReview, resetError, resetSuccess } = reviewSlice.actions;
export default reviewSlice.reducer;
