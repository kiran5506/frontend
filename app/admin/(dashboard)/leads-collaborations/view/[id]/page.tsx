"use client";
import React, { useEffect, useState } from 'react';
import { fetchAdminLeadDetails } from '@/services/lead-assignment-api';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import './leadview.css'

const CollaborationView = () => {
  const params = useParams();
  const router = useRouter();
  const inquiryId = Array.isArray(params?.id) ? params?.id?.[0] : params?.id;
  const [leadDetails, setLeadDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!inquiryId) return;
    const loadDetails = async () => {
      setLoading(true);
      try {
        const res = await fetchAdminLeadDetails(inquiryId);
        if (res?.status) {
          setLeadDetails(res.data);
        } else {
          toast.error(res?.message || 'Unable to load lead details.');
        }
      } catch (err: any) {
        toast.error(err?.message || 'Unable to load lead details.');
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [inquiryId]);

  const enquiryDate = leadDetails?.inquiry?.enquiry_date
    ? new Date(leadDetails.inquiry.enquiry_date).toLocaleDateString('en-GB')
    : '--';
  const customerName = leadDetails?.customer?.name || '-';
  const customerMobile = leadDetails?.customer?.mobile_number || '-';
  const city = leadDetails?.inquiry?.city_id?.cityName || '-';
  const serviceName = leadDetails?.inquiry?.service_id?.serviceName || '-';

  return (
    <section className="section  dashboard ">
        <div className="row">
            <div className="col-lg-8">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Lead Details</h5>
                    
                        {loading ? (
                        <p>Loading...</p>
                        ) : (
                        <div className="lead-details">
                            <div className="detail-row">
                                <span className="label">Date</span>
                                <span className="value">{enquiryDate}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Customer Name</span>
                                <span className="value">{customerName}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Customer Mobile</span>
                                <span className="value">{customerMobile}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">City</span>
                                <span className="value">{city}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Enquiry for</span>
                                <span className="value">{serviceName}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Vendors</span>
                                <div className="vendors-list">
                                {leadDetails?.assignments?.length ? (
                                    leadDetails.assignments.map((assignment: any) => (
                                        <div
                                        key={assignment._id}
                                        className={`btn btn-sm w-100 mb-2 ${
                                            assignment.status === 'accepted'
                                            ? 'btn-primary'
                                            : assignment.status === 'rejected'
                                            ? 'btn-warning'
                                            : 'btn-primary'
                                        }`}
                                        >
                                        {assignment.business_profile_id?.businessName || 'Vendor'} ({assignment.status})
                                        </div>
                                    ))
                                ) : (
                                <p className="text-muted">No vendors assigned.</p>
                                )}
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default CollaborationView;
