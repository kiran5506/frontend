import axiosInstance from "@/utils/axios";
import endpoints from "./endpoints";

export const toggleWishlist = async (businessProfileId, customerId) => {
    return (
        await axiosInstance.post(endpoints.WISHLIST.toggle, {
            businessProfileId,
            customerId,
        })
    ).data;
};

export const fetchWishlistIds = async (customerId) => {
    return (
        await axiosInstance.get(endpoints.WISHLIST.ids, {
            params: customerId ? { customer_id: customerId } : undefined,
        })
    ).data;
};

export const fetchWishlistItems = async (customerId) => {
    return (
        await axiosInstance.get(endpoints.WISHLIST.list, {
            params: customerId ? { customer_id: customerId } : undefined,
        })
    ).data;
};
