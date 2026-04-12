"use client";
import VendorViewPage from '@/components/admin/viewpages/vendor';
import ViewPageLayout from '@/components/common/Layouts/ViewPageLayout'
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react'

const VendorRequestView = () => {
    const params = useParams<{ id: string }>();
    const title = "Vendor Request Details";
    const linkHref = "/admin/vendor-requests";
    const id = useMemo(() => {
        if (!params || !params.id) return undefined;
        if (typeof params.id === 'string') {
            return params.id;
        }
        return Array.isArray(params.id) ? params.id[0] : undefined;
    }, [params?.id]);

    return (
        <ViewPageLayout title={title} linkHref={linkHref}>
            <VendorViewPage id={id} showApprovalActions />
        </ViewPageLayout>
    )
}

export default VendorRequestView
