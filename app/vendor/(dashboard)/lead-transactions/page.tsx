"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { getTransactions } from "@/services/payment-api";
import { toast } from "react-toastify";
import jsPDF from "jspdf";

interface Transaction {
  _id: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  leadPackageId?: {
    _id: string;
    packageName: string;
    totalLeads: number;
    amount: number;
  };
}

interface VendorInfo {
  name?: string;
  email?: string;
  mobile_number?: string;
}

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

const downloadReceipt = (txn: Transaction, vendor: VendorInfo) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // ── Header ──
  doc.setFillColor(247, 112, 29);
  doc.rect(0, 0, pageWidth, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("BSFYE", pageWidth / 2, 18, { align: "center" });
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Payment Receipt", pageWidth / 2, 30, { align: "center" });

  // ── Receipt details ──
  let y = 55;
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(11);

  const addRow = (label: string, value: string) => {
    doc.setFont("helvetica", "bold");
    doc.text(label, 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, 80, y);
    y += 10;
  };

  addRow("Date:", formatDate(txn.createdAt));
  addRow("Vendor:", vendor?.name || "—");
  addRow("Email:", vendor?.email || "—");
  addRow("Mobile:", vendor?.mobile_number || "—");

  y += 4;
  doc.setDrawColor(220, 220, 220);
  doc.line(20, y, pageWidth - 20, y);
  y += 10;

  addRow("Package:", txn.leadPackageId?.packageName || "—");
  addRow("Leads:", String(txn.leadPackageId?.totalLeads ?? "—"));
  addRow("Amount:", `₹${txn.amount}`);
  addRow("Currency:", txn.currency || "INR");
  addRow("Transaction ID:", txn.razorpayPaymentId || txn.razorpayOrderId);
  addRow("Order ID:", txn.razorpayOrderId);

  y += 4;
  doc.line(20, y, pageWidth - 20, y);
  y += 10;

  // ── Status badge ──
  const isPaid = txn.status === "paid";
  doc.setFont("helvetica", "bold");
  doc.text("Status:", 20, y);
  doc.setTextColor(isPaid ? 34 : 220, isPaid ? 139 : 53, isPaid ? 34 : 69);
  doc.text(txn.status.toUpperCase(), 80, y);
  y += 20;

  // ── Footer ──
  doc.setTextColor(160, 160, 160);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("This is a computer‑generated receipt and does not require a signature.", pageWidth / 2, y, {
    align: "center",
  });

  doc.save(`receipt_${txn.razorpayPaymentId || txn.razorpayOrderId}.pdf`);
};

const LeadTransactions = () => {
  const vendorId = useSelector((state: any) => state?.vendorAuth?.vendorid);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [vendor, setVendor] = useState<VendorInfo>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const fetchTransactions = useCallback(async () => {
    if (!vendorId) return;
    try {
      setLoading(true);
      const res = await getTransactions(vendorId);
      if (res?.status) {
        setTransactions(res.data?.transactions || []);
        setVendor(res.data?.vendor || {});
      } else {
        toast.error(res?.message || "Unable to fetch transactions.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [vendorId]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return transactions.filter((txn) => {
      const transactionId = (txn.razorpayPaymentId || txn.razorpayOrderId || "").toLowerCase();
      const packageName = (txn.leadPackageId?.packageName || "").toLowerCase();
      const status = txn.status?.toLowerCase?.() || "";
      const dateMatch = filterDate
        ? new Date(txn.createdAt).toISOString().slice(0, 10) === filterDate
        : true;
      const searchMatch = query
        ? transactionId.includes(query) || packageName.includes(query) || status.includes(query)
        : true;
      return dateMatch && searchMatch;
    });
  }, [transactions, search, filterDate]);

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / perPage));
  const startIndex = (currentPage - 1) * perPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + perPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterDate]);

  return (
    <>
      <div className="row align-items-center d-flex mb-4">
        <div className="col-md-4">
          <h2 className="page-title">Lead Transactions</h2>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by package / transaction / status"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="date"
            className="form-control mt-3 mt-md-0"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive" style={{ overflowX: "auto" }}>
        <table
          className="responsive-table-new table table-bordered text-start wallet-table w-100"
          style={{ minWidth: "900px" }}
        >
          <thead>
            <tr>
              <th className="minn">S.No</th>
              <th className="midd">DATE</th>
              <th className="midd">PACKAGE</th>
              <th className="largee">TRANSACTION ID</th>
              <th className="midd">AMOUNT</th>
              <th className="midd">STATUS</th>
              <th className="midd">RECEIPT</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-4">Loading...</td>
              </tr>
            ) : paginatedTransactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">No transactions found.</td>
              </tr>
            ) : (
              paginatedTransactions.map((txn, idx) => (
                <tr key={txn._id}>
                  <td className="minn">{startIndex + idx + 1}</td>
                  <td className="midd">{formatDate(txn.createdAt)}</td>
                  <td className="midd">{txn.leadPackageId?.packageName || "—"}</td>
                  <td className="largee" style={{ fontSize: "13px", wordBreak: "break-all" }}>
                    {txn.razorpayPaymentId || txn.razorpayOrderId}
                  </td>
                  <td className="midd">₹{txn.amount}</td>
                  <td className="midd">
                    <span
                      className={`badge ${txn.status === "paid" ? "bg-success" : "bg-danger"}`}
                    >
                      {txn.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="midd">
                    {txn.status === "paid" && (
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => downloadReceipt(txn, vendor)}
                        title="Download Receipt"
                      >
                        <i className="bi bi-download me-1"></i> Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredTransactions.length > perPage && (
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
          <div className="text-muted">
            Showing {startIndex + 1} - {Math.min(startIndex + perPage, filteredTransactions.length)} of {filteredTransactions.length}
          </div>
          <div className="btn-group">
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LeadTransactions;
