"use client";
import React, { useEffect, useState } from 'react'
import AdPageLayout from '../../../../components/common/Layouts/AdPageLayout'
import Table from '../../../../components/common/Table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { serviceDelete, serviceList } from '@/services/service-api'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const tableHeader: string[] = ['S.No', 'Service Name', 'Category', 'Type', 'Portfolio', 'Image', 'Actions'];

const AdServices = () => {
    const router = useRouter()
    const [headerData, setHeaderData] = useState<string[]>([]);
    const [bodyData, setBodyData] = useState<any[]>([]);
    const isview = false;
    const isedit = true;
    const isdelete = true;

    const dispatch = useDispatch();
    useEffect(() => {
        (dispatch as any)(serviceList());
    }, [dispatch]); 
      
    const { Services, loading, error } = useSelector((state: any) => state.service);

    useEffect(() => {
        setHeaderData(tableHeader);

        if (!loading && Services && Services.length > 0) {
            setBodyData(Services);
        } else {
            setBodyData([]);
        }
        
    }, [Services, loading]);

    const handleView = (id: string) => {
        console.log('View item with id:', id);
    }
    const handleEdit = (id: string) => {
        router.push(`/admin/services/${id}`)
    }
    const handleDelete = (id: string) => {
        (dispatch as any)(serviceDelete(id as any)).then((result: any) => {
            console.log('delete result-->', result);
            if(result.payload && result.payload.status){
                toast.success(result.payload.message);
            }else{
                toast.error('Failed to delete service');
            }
        }).catch((error: any) => {
            console.error('Delete error:', error);
            toast.error('Error deleting service');
        });
    }

  return (
    <AdPageLayout 
        iscreate={true}
        title={'Services'} 
        linkHref={'/admin/services/create'}
        name={'Service'}
    >
        <Table 
            headerData={headerData}
            bodyData={bodyData}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isview={isview}
            isedit={isedit}
            isdelete={isdelete}
            loading={loading}
        />
    </AdPageLayout>
  )
}

export default AdServices
