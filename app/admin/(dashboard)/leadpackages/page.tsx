"use client";
import React, { useEffect, useState } from 'react'
import AdPageLayout from '../../../../components/common/Layouts/AdPageLayout'
import Table from '../../../../components/common/Table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { leadpackageDelete, leadpackageList } from '@/services/leadpackage-api'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const tableHeader: string[] = ['S.No', 'Package Name', 'Total Leads', 'Amount', 'Image', 'Actions'];

const AdLeadPackages = () => {
    const router = useRouter()
    const [headerData, setHeaderData] = useState<string[]>([]);
    const [bodyData, setBodyData] = useState<any[]>([]);
    const isview = false;
    const isedit = true;
    const isdelete = true;


    const dispatch = useDispatch();
    useEffect(() => {
        (dispatch as any)(leadpackageList());
    }, [dispatch]); 
      
    const { LeadPackages, loading, error } = useSelector((state: any) => state.leadpackage);

    useEffect(() => {
        setHeaderData(tableHeader);

        if (!loading && LeadPackages && LeadPackages.length > 0) {
            setBodyData(LeadPackages);
        } else {
            setBodyData([]);
        }
        
    }, [LeadPackages, loading]);

    const handleView = (id: string) => {
        console.log('View item with id:', id);
    }
    const handleEdit = (id: string) => {
        router.push(`/admin/leadpackages/${id}`)
    }
    const handleDelete = (id: string) => {
        (dispatch as any)(leadpackageDelete(id as any)).then((result: any) => {
            console.log('delete result-->', result);
            if(result.payload && result.payload.status){
                toast.success(result.payload.message);
            }else{
                toast.error(result.payload.message)
            }
        })
    }   
  return (
    <AdPageLayout 
        iscreate={true}
        title="Lead Packages"
        linkHref="/admin/leadpackages/create"
        name="Lead Package"
    >
      { loading ? <p>Loading...</p> : <Table  headerData={headerData} bodyData={bodyData} onView={handleView} onEdit={handleEdit}  onDelete={handleDelete} isview={isview} isedit={isedit} isdelete={isdelete}/> }
    </AdPageLayout>
  )
}

export default AdLeadPackages
