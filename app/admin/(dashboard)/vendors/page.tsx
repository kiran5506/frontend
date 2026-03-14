"use client";
import React, { useEffect, useState } from 'react'
import AdPageLayout from '../../../../components/common/Layouts/AdPageLayout'
import Table from '../../../../components/common/Table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { deleteVendor, fetchAllVendors } from '@/services/vendor-api';

const tableHeader: string[] = ['S.No', 'Vendor Name', 'Phone', 'Email', 'Actions'];

const VendorsList = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const [headerData, setHeaderData] = useState<string[]>([]);
    const [bodyData, setBodyData] = useState<any[]>([]);
    const isview = true;
    const isedit = false;
    const isdelete = false;

    useEffect(() => {
        (dispatch as any)(fetchAllVendors());
    }, [dispatch]);
      
    const { vendorsData, loading, error } = useSelector((state: any) => state.vendor);

    useEffect(() => {
        setHeaderData(tableHeader);

        if (!loading && vendorsData && vendorsData.length > 0) {
            setBodyData(vendorsData);
        } else {
            setBodyData([]);
        } 
    }, [vendorsData, loading]);
    

    const handleView = (id: string) => {
        router.push(`/admin/vendors/view/${id}`)
    }
    const handleEdit = (id: string) => {
        router.push(`/admin/vendors/${id}`)
    }
    const handleDelete = (id: string) => {
        (dispatch as any)(deleteVendor(id as any)).then((result: any) => {
            console.log('delete result-->', result);
            if(result.payload && result.payload.status){
                toast.success(result.payload.message);
                (dispatch as any)(fetchAllVendors());
            }else{
                toast.error(result.payload.message);
            }
        })
    }
  return (
    <AdPageLayout 
        iscreate={false}
        title="Vendors"
        linkHref="/admin/vendors/create"
        name="Vendor"
    >
      { loading ? <p>Loading...</p> : <Table  headerData={headerData} bodyData={bodyData} onView={handleView} onEdit={handleEdit}  onDelete={handleDelete} isview={isview} isedit={isedit} isdelete={isdelete}/> }
    </AdPageLayout>
  )
}

export default VendorsList
