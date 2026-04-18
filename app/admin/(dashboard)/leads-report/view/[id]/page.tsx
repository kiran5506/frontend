"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AdPageLayout from '../../../../../../components/common/Layouts/AdPageLayout';
import { fetchReplacementRequestDetails, reviewLeadReplacement } from '@/services/lead-assignment-api';

const LeadReportView = () => {
  const params = useParams();
  const router = useRouter();
  const requestId = Array.isArray(params?.id) ? params?.id?.[0] : params?.id;
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!requestId) return;
    const loadDetails = async () => {
      setLoading(true);
      try {
        const res = await fetchReplacementRequestDetails(requestId);
        if (res?.status) {
          setDetails(res.data);
        } else {
          toast.error(res?.message || 'Unable to load replacement request.');
        }
      } catch (err: any) {
        toast.error(err?.message || 'Unable to load replacement request.');
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [requestId]);

  const handleReview = async (status: 'approved' | 'rejected') => {
    if (!requestId) return;
    setProcessing(true);
    try {
  const res = await reviewLeadReplacement({ id: requestId, status, admin_id: null });
      if (res?.status) {
        toast.success(res?.message || `Request ${status}`);
        router.back();
      } else {
        toast.error(res?.message || 'Unable to update request.');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Unable to update request.');
    } finally {
      setProcessing(false);
    }
  };

  const enquiryDate = details?.inquiry?.enquiry_date
    ? new Date(details.inquiry.enquiry_date).toLocaleDateString('en-GB')
    : '--';
  const customerName = details?.customer?.name || 'N/A';
  const customerMobile = details?.customer?.mobile_number || 'N/A';
  const city = details?.inquiry?.city_name || 'N/A';
  const serviceName = details?.inquiry?.service_id?.serviceName || 'Service';
  const vendorName = details?.vendor?.name || 'Vendor';
  const feedback = details?.request?.reason || 'N/A';

  return (
    <AdPageLayout iscreate={false} title="Lead Report View">
      <section className="section dashboard">
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
                      <span className="label">Vendor</span>
                      <div className="value vendors-list">
                        <span className="btn btn-primary btn-sm w-100">{vendorName}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <h5 className="card-title">Vendor Feedback Information</h5>
            <p>{feedback}</p>
            <div className="text-left mt-4">
              <button
                type="button"
                className="btn btn-success me-2"
                onClick={() => handleReview('approved')}
                disabled={processing}
              >
                Return Credit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleReview('rejected')}
                disabled={processing}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </section>
    </AdPageLayout>
  );
};

export default LeadReportView;
