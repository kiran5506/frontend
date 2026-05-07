"use client";
import React, { useEffect, useMemo, useState } from 'react';
import AdPageLayout from '../../../../components/common/Layouts/AdPageLayout';
import Table from '../../../../components/common/Table/Table';
import { fetchReplacementRequests } from '@/services/lead-assignment-api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const tableHeader: string[] = ['S.No', 'Date', 'Customer', 'Mobile', 'City', 'Vendor', 'Actions'];

const LeadsReport = () => {
  const [headerData, setHeaderData] = useState<string[]>(tableHeader);
  const [bodyData, setBodyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loadRequests = async () => {
    setLoading(true);
    try {
      const res = await fetchReplacementRequests();
      if (res?.status) {
        setBodyData(res.data || []);
      } else {
        setBodyData([]);
        toast.error(res?.message || 'Unable to load replacement requests.');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Unable to load replacement requests.');
      setBodyData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHeaderData(tableHeader);
    loadRequests();
  }, []);

  const mappedBodyData = useMemo(() => {
    return bodyData.map((request: any, index: number) => {
      const dateValue = request.date ? new Date(request.date) : null;
      return {
        _id: request.request_id,
        Date: dateValue ? dateValue.toLocaleDateString('en-GB') : '--',
        Customer: request.customer_name || 'N/A',
        Mobile: request.customer_mobile || 'N/A',
        City: request.city_name || 'N/A',
        Vendor: request.vendor_name || 'N/A'
      };
    });
  }, [bodyData]);

  const handleView = (id: string) => {
    router.push(`/admin/leads-report/view/${id}`);
  };

  return (
    <AdPageLayout iscreate={false} title="Lead Replacement Requests">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          headerData={headerData}
          bodyData={mappedBodyData}
          onView={handleView}
          isview
          isedit={false}
          isdelete={false}
          loading={loading}
        />
      )}
    </AdPageLayout>
  );
};

export default LeadsReport
