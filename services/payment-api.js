import axiosInstance from "@/utils/axios";
import endpoints from "./endpoints";

export const createPaymentOrder = async (payload) => {
    return (await axiosInstance.post(endpoints.PAYMENT.createOrder, payload)).data;
};

export const verifyPayment = async (payload) => {
    return (await axiosInstance.post(endpoints.PAYMENT.verify, payload)).data;
};

export const getTransactions = async (vendorId) => {
    const url = endpoints.PAYMENT.transactions.replace('{vendorId}', vendorId);
    return (await axiosInstance.get(url)).data;
};
