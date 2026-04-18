import axiosInstance from "@/utils/axios";
import endpoints from "./endpoints";

export const fetchVendorLeadAssignments = async (vendorId, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = query
    ? `${endpoints.LEAD_ASSIGNMENTS.listByVendor.replace('{vendorId}', vendorId)}?${query}`
    : endpoints.LEAD_ASSIGNMENTS.listByVendor.replace('{vendorId}', vendorId);
  return (await axiosInstance.get(url)).data;
};

export const markLeadViewed = async (payload) => {
  return (await axiosInstance.post(endpoints.LEAD_ASSIGNMENTS.markViewed, payload)).data;
};

export const updateLeadStatus = async ({ id, vendor_id, status }) => {
  return (
    await axiosInstance.patch(
      endpoints.LEAD_ASSIGNMENTS.updateStatus.replace('{id}', id),
      { vendor_id, status }
    )
  ).data;
};

export const requestLeadReplacement = async ({ assignment_id, vendor_id, reason }) => {
  return (
    await axiosInstance.post(endpoints.LEAD_ASSIGNMENTS.requestReplacement, {
      assignment_id,
      vendor_id,
      reason
    })
  ).data;
};

export const reviewLeadReplacement = async ({ id, status, admin_id }) => {
  return (
    await axiosInstance.patch(
      endpoints.LEAD_ASSIGNMENTS.reviewReplacement.replace('{id}', id),
      { status, admin_id }
    )
  ).data;
};

export const fetchAdminLeads = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = query
    ? `${endpoints.LEAD_ASSIGNMENTS.adminList}?${query}`
    : endpoints.LEAD_ASSIGNMENTS.adminList;
  return (await axiosInstance.get(url)).data;
};

export const fetchAdminLeadDetails = async (inquiryId) => {
  const url = endpoints.LEAD_ASSIGNMENTS.adminDetails.replace('{inquiryId}', inquiryId);
  return (await axiosInstance.get(url)).data;
};

export const fetchReplacementRequests = async () => {
  return (await axiosInstance.get(endpoints.LEAD_ASSIGNMENTS.replacementRequests)).data;
};

export const fetchReplacementRequestDetails = async (id) => {
  const url = endpoints.LEAD_ASSIGNMENTS.replacementDetails.replace('{id}', id);
  return (await axiosInstance.get(url)).data;
};
