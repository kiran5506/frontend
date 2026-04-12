import axiosInstance from "@/utils/axios";
import endpoints from "./endpoints";

export const fetchFreelancers = async (params = {}) => {
  const response = await axiosInstance.get(endpoints.FREELANCERS.list, {
    params,
  });
  return response.data;
};

export const fetchFreelancerById = async (id) => {
  const response = await axiosInstance.get(
    endpoints.FREELANCERS.findById.replace('{id}', id)
  );
  return response.data;
};