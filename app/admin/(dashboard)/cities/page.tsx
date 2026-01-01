"use client";
import React, { useEffect, useState } from 'react'
import AdPageLayout from '../../../../components/common/Layouts/AdPageLayout'
import Table from '../../../../components/common/Table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { cityDelete, cityList } from '@/services/city-api'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const tableHeader: string[] = ['S.No', 'City Name', 'Actions'];

const AdCities = () => {
    const router = useRouter()
    const [headerData, setHeaderData] = useState<string[]>([]);
    const [bodyData, setBodyData] = useState<any[]>([]);
    const isview = false;
    const isedit = true;
    const isdelete = true;


    const dispatch = useDispatch();
    useEffect(() => {
        (dispatch as any)(cityList());
    }, [dispatch]); 
      
    const { Cities, loading, error } = useSelector((state: any) => state.city);

    useEffect(() => {
        setHeaderData(tableHeader);

        if (!loading && Cities && Cities.length > 0) {
            setBodyData(Cities);
        } else {
            setBodyData([]);
        }
        
    }, [Cities, loading]);

    const handleView = (id: string) => {
        console.log('View item with id:', id);
    }
    const handleEdit = (id: string) => {
        router.push(`/admin/cities/${id}`)
    }
    const handleDelete = (id: string) => {
        (dispatch as any)(cityDelete(id as any)).then((result: any) => {
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
        title="Cities"
        linkHref="/admin/cities/create"
        name="City"
    >
      { loading ? <p>Loading...</p> : <Table  headerData={headerData} bodyData={bodyData} onView={handleView} onEdit={handleEdit}  onDelete={handleDelete} isview={isview} isedit={isedit} isdelete={isdelete}/> }
    </AdPageLayout>
  )
}

export default AdCities
