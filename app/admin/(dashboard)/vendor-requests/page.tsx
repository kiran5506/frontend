"use client";
import React, { useEffect, useState } from 'react'
import AdPageLayout from '../../../../components/common/Layouts/AdPageLayout'
import Table from '../../../../components/common/Table/Table'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { fetchVendorsByStatus } from '@/services/vendor-api'

const tableHeader: string[] = ['S.No', 'Vendor Name', 'Phone', 'Email', 'Created At', 'Actions'];

const VendorRequests = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [headerData, setHeaderData] = useState<string[]>([]);
    const [bodyData, setBodyData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const isview = true;
    const isedit = false;
    const isdelete = false;

    useEffect(() => {
        setHeaderData(tableHeader);
    }, []);

    useEffect(() => {
        setLoading(true);
    (dispatch as any)(fetchVendorsByStatus('pending' as any))
            .then((result: any) => {
                if (result?.payload?.status) {
                    const cleaned = (result.payload.data || []).map((vendor: any) => ({
                        _id: vendor?._id,
                        name: vendor?.name,
                        mobile_number: vendor?.mobile_number,
                        email: vendor?.email,
                        createdAt: vendor?.createdAt
                    }));
                    setBodyData(cleaned);
                } else {
                    setBodyData([]);
                }
            })
            .catch((error: any) => {
                console.error('Error fetching vendor requests:', error);
                toast.error('Failed to load vendor requests');
            })
            .finally(() => setLoading(false));
    }, [dispatch]);

    const handleView = (id: string) => {
        router.push(`/admin/vendor-requests/view/${id}`)
    }

    return (
        <AdPageLayout
            iscreate={false}
            title="Vendor Requests"
            linkHref="/admin/vendor-requests"
            name="Vendor"
        >
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table
                    headerData={headerData}
                    bodyData={bodyData}
                    onView={handleView}
                    isview={isview}
                    isedit={isedit}
                    isdelete={isdelete}
                    loading={loading}
                />
            )}
        </AdPageLayout>
    )
}

export default VendorRequests
