"use client";
import React, { useEffect, useState } from 'react'
import AdPageLayout from '../../../../components/common/Layouts/AdPageLayout'
import Table from '../../../../components/common/Table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { tutorialDelete, tutorialList } from '@/services/tutorial-api'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const tableHeader: string[] = ['S.No', 'Title', 'Description', 'Language', 'Main Image', 'Actions'];

const AdTutorials = () => {
    const router = useRouter()
    const [headerData, setHeaderData] = useState<string[]>([]);
    const [bodyData, setBodyData] = useState<any[]>([]);
    const isview = false;
    const isedit = true;
    const isdelete = true;


    const dispatch = useDispatch();
    useEffect(() => {
        (dispatch as any)(tutorialList());
    }, [dispatch]); 
      
    const { Tutorials, loading, error } = useSelector((state: any) => state.tutorial);

    useEffect(() => {
        setHeaderData(tableHeader);

        if (!loading && Tutorials && Tutorials.length > 0) {
            setBodyData(Tutorials);
        } else {
            setBodyData([]);
        }
        
    }, [Tutorials, loading]);

    const handleView = (id: string) => {
        console.log('View item with id:', id);
    }
    const handleEdit = (id: string) => {
        router.push(`/admin/tutorials/${id}`)
    }
    const handleDelete = (id: string) => {
        (dispatch as any)(tutorialDelete(id as any)).then((result: any) => {
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
        title="Tutorials"
        linkHref="/admin/tutorials/create"
        name="Tutorial"
    >
      { loading ? <p>Loading...</p> : <Table  headerData={headerData} bodyData={bodyData} onView={handleView} onEdit={handleEdit}  onDelete={handleDelete} isview={isview} isedit={isedit} isdelete={isdelete}/> }
    </AdPageLayout>
  )
}

export default AdTutorials
