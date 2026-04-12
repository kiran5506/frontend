"use client";
import VendorViewPage from '@/components/admin/viewpages/vendor';
import ViewPageLayout from '@/components/common/Layouts/ViewPageLayout'
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react'

const ApprovedVendorView = () => {
    const params = useParams<{ id: string }>();
    const title = "Vendor Details";
    const linkHref = "/admin/vendor-approved";
    const id = useMemo(() => {
        if (!params || !params.id) return undefined;
        if (typeof params.id === 'string') {
            return params.id;
        }
        return Array.isArray(params.id) ? params.id[0] : undefined;
    }, [params?.id]);

    return (
        <ViewPageLayout title={title} linkHref={linkHref}>
            <VendorViewPage id={id} />
        </ViewPageLayout>
    )
}

export default ApprovedVendorView
