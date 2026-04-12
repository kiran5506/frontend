import axiosInstance from "@/utils/axios";
import endpoints from "./endpoints";

export const fetchStatsCounts = async () => {
    return (await axiosInstance.get(endpoints.STATS.counts)).data;
};
