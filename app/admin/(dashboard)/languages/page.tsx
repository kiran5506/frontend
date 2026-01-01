"use client";
import React, { useEffect, useState } from 'react'
import AdPageLayout from '../../../../components/common/Layouts/AdPageLayout'
import Table from '../../../../components/common/Table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { languageDelete, languageList } from '@/services/language-api'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const tableHeader: string[] = ['S.No', 'Language Name', 'Actions'];

const AdLanguages = () => {
    const router = useRouter()
    const [headerData, setHeaderData] = useState<string[]>([]);
    const [bodyData, setBodyData] = useState<any[]>([]);
    const isview = false;
    const isedit = true;
    const isdelete = true;


    const dispatch = useDispatch();
    useEffect(() => {
        (dispatch as any)(languageList());
    }, [dispatch]); 
      
    const { Languages, loading, error } = useSelector((state: any) => state.language);

    useEffect(() => {
        setHeaderData(tableHeader);

        if (!loading && Languages && Languages.length > 0) {
            setBodyData(Languages);
        } else {
            setBodyData([]);
        }
        
    }, [Languages, loading]);

    const handleView = (id: string) => {
        console.log('View item with id:', id);
    }
    const handleEdit = (id: string) => {
        router.push(`/admin/languages/${id}`)
    }
    const handleDelete = (id: string) => {
        (dispatch as any)(languageDelete(id as any)).then((result: any) => {
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
        title="Languages"
        linkHref="/admin/languages/create"
        name="Language"
    >
      { loading ? <p>Loading...</p> : <Table  headerData={headerData} bodyData={bodyData} onView={handleView} onEdit={handleEdit}  onDelete={handleDelete} isview={isview} isedit={isedit} isdelete={isdelete}/> }
    </AdPageLayout>
  )
}

export default AdLanguages
