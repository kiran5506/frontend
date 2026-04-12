import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "./endpoints";

export const createBusinessPortfolio = createAsyncThunk(
    'businessPortfolio/create',
    async (formData) => {
        try {
            const response = await axiosInstance.post(
                endpoints.BUSINESS_PORTFOLIO.create,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(error.message || 'Something went wrong');
        }
    }
);

export const businessPortfolioByVendorId = createAsyncThunk(
    'businessPortfolio/listByVendor',
    async (vendor_id) => {
        return (await axiosInstance.get(
            endpoints.BUSINESS_PORTFOLIO.listByVendor.replace('{vendor_id}', vendor_id)
        )).data;
    }
);

export const businessPortfolioDeleteMedia = createAsyncThunk(
    'businessPortfolio/deleteMedia',
    async ({ id, vendor_id, event_id, type, file }) => {
        try {
            const response = await axiosInstance.patch(
                endpoints.BUSINESS_PORTFOLIO.deleteMedia.replace('{id}', id),
                { vendor_id, event_id, type, file }
            );
            return response.data;
        } catch (error) {
            throw new Error(error.message || 'Something went wrong');
        }
    }
);
