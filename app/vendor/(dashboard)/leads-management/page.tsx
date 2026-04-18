"use client";
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getTransactions } from '@/services/payment-api'
import { fetchVendorLeadAssignments, requestLeadReplacement } from '@/services/lead-assignment-api'
import { toast } from 'react-toastify'
import { BsFillHandThumbsDownFill } from 'react-icons/bs';

const LeadsManagement = () => {
  const vendorId = useSelector((state: any) => state?.vendorAuth?.vendorid);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [availableCredits, setAvailableCredits] = useState<number>(0);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loadingAssignments, setLoadingAssignments] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [submittingReject, setSubmittingReject] = useState(false);

  useEffect(() => {
    const loadTransactions = async () => {
      if (!vendorId) return;
      try {
        const res = await getTransactions(vendorId);
        if (res?.status) {
          setTransactions(res.data?.transactions || []);
          setAvailableCredits(Number(res.data?.vendor?.credits || 0));
        } else {
          toast.error(res?.message || 'Unable to load lead usage.');
        }
      } catch (err: any) {
        toast.error(err?.message || 'Unable to load lead usage.');
      }
    };

    loadTransactions();
  }, [vendorId]);

  useEffect(() => {
    const loadAssignments = async () => {
      if (!vendorId) return;
      setLoadingAssignments(true);
      try {
        const res = await fetchVendorLeadAssignments(vendorId);
        if (res?.status) {
          setAssignments(res.data?.assignments || []);
        } else {
          toast.error(res?.message || 'Unable to load leads.');
        }
      } catch (err: any) {
        toast.error(err?.message || 'Unable to load leads.');
      } finally {
        setLoadingAssignments(false);
      }
    };

    loadAssignments();
  }, [vendorId]);

  const handleOpenRejectModal = (assignment: any) => {
    setSelectedAssignment(assignment);
    setRejectReason('');
    setShowRejectModal(true);
  };

  const handleSubmitReject = async () => {
    if (!vendorId || !selectedAssignment) return;
    if (!rejectReason.trim()) {
      toast.error('Please enter a rejection reason.');
      return;
    }
    setSubmittingReject(true);
    try {
      const res = await requestLeadReplacement({
        assignment_id: selectedAssignment._id,
        vendor_id: vendorId,
        reason: rejectReason.trim()
      });
      if (res?.status) {
        setAssignments((prev) =>
          prev.map((assignment) =>
            assignment._id === selectedAssignment._id
              ? { ...assignment, status: 'replace_requested' }
              : assignment
          )
        );
        toast.success(res?.message || 'Replacement request submitted.');
        setShowRejectModal(false);
        setSelectedAssignment(null);
      } else {
        toast.error(res?.message || 'Unable to submit replacement request.');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Unable to submit replacement request.');
    } finally {
      setSubmittingReject(false);
    }
  };

  const totalLeadsPurchased = useMemo(() => {
    return transactions.reduce((sum, txn) => {
      if (txn?.status !== 'paid') return sum;
      const leads = Number(txn?.leadPackageId?.totalLeads || 0);
      return sum + leads;
    }, 0);
  }, [transactions]);

  const leadsUsed = assignments.length;
  const progress = totalLeadsPurchased
    ? Math.min(100, Math.round((leadsUsed / totalLeadsPurchased) * 100))
    : 0;
  return (
    <>
      <div className="row align-items-center d-flex mb-4">
        <div className="col-md-4">
          <h2 className="page-title">Leads Management</h2>
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Search" />
        </div>
        <div className="col-md-4">
          <div className="d-block d-md-flex align-items-center justify-content-end">
            <input
              type="date"
              className="form-control mt-3 mt-md-0"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="row align-items-center">
          {/* Leads Section */}
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <i className="bi bi-person-lines-fill fs-3 text-primary" />
              </div>
              <div>
                <div className="text-muted small">Leads Used</div>
                <div className="h5 mb-0">{leadsUsed} / {totalLeadsPurchased}</div>
                <div className="progress mt-1" style={{ height: 6 }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Replace Credits Section */}
          <div className="col-md-4">
            <div className="bg-light rounded p-2 d-inline-block myll">
              <i className="bi bi-arrow-repeat text-warning me-1" />
              <strong className="text-dark">10</strong>
              <span className="text-muted small">Replace Credits</span>
            </div>
          </div>
          <div className="col-12 col-md-5 text-end two-btns">
            <Link
              href={'/vendor/lead-packages'}
              className="btn orange-btn btn-xs float-right"
            >
              Recharge
            </Link>
            <Link
              href="/vendor/lead-transactions"
              className="btn orange-btn btn-xs float-right"
            >
              Transactions
            </Link>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="responsive-table-new table table-bordered text-start wallet-table">
          <thead>
            <tr>
              <th className="minn">S.No</th>
              <th className="midd">DATE</th>
              <th className="midd">MOBILE</th>
              <th className="largee">LEAD ABOUT</th>
              <th className="midd">LOCATION</th>
              <th className="midd">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {loadingAssignments ? (
              <tr>
                <td colSpan={6} className="text-center">Loading leads...</td>
              </tr>
            ) : assignments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted">No leads assigned yet.</td>
              </tr>
            ) : (
              assignments.map((assignment, index) => {
                const customer = assignment.customer_id;
                const inquiry = assignment.inquiry_id;
                const serviceName = assignment.service_id?.serviceName || 'Service';
                const cityName = inquiry?.city_name || assignment.city_name || '--';
                const createdAt = assignment.assigned_at ? new Date(assignment.assigned_at) : null;
                const dateLabel = createdAt ? createdAt.toLocaleDateString('en-GB') : '--';
                const mobile = customer?.mobile_number || 'N/A';
                return (
                  <tr key={assignment._id}>
                    <td className="minn">{index + 1}</td>
                    <td className="midd">{dateLabel}</td>
                    <td className="midd">
                      <Link
                        href={`https://api.whatsapp.com/send/?phone=91${mobile}&text=Hi`}
                        target="_blank"
                        style={{ color: "#000" }}
                      >
                        <img src="assets/img/whatsapp.png" alt="" width={25} /> {mobile}
                      </Link>
                    </td>
                    <td className="largee">Enquiry for {serviceName}</td>
                    <td className="midd">{cityName}</td>
                    <td className="midd">
                      {/* <button
                        type="button"
                        className={`btn btn-${assignment.status === 'accepted' ? 'success' : 'outline-success'} me-2`}
                        onClick={() => handleUpdateStatus(assignment._id, 'accepted')}
                        disabled={assignment.status === 'accepted'}
                      >
                        <i className="bi bi-hand-thumbs-up" />
                      </button> */}
                      <button
                        type="button"
                        className={`btn btn-${assignment.status === 'replace_requested' ? 'secondary' : 'outline-danger'}`}
                        onClick={() => handleOpenRejectModal(assignment)}
                        disabled={assignment.status === 'replace_requested'}
                      >
                        <BsFillHandThumbsDownFill />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {showRejectModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Request Lead Replacement</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowRejectModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Reason</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Enter rejection reason"
                  disabled={submittingReject}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowRejectModal(false)}
                  disabled={submittingReject}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleSubmitReject}
                  disabled={submittingReject}
                >
                  {submittingReject ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LeadsManagement