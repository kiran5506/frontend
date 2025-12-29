"use client";
import React, { useEffect, useState } from 'react'
import AdPageLayout from '../../../../components/common/Layouts/AdPageLayout'
import Table from '../../../../components/common/Table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { sliderDelete, sliderList } from '@/services/slider-api'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const tableHeader: string[] = ['S.No', 'Title', 'Slider Name', 'Image', 'Actions'];

const AdSliders = () => {
    const router = useRouter()
    const [headerData, setHeaderData] = useState<string[]>([]);
    const [bodyData, setBodyData] = useState<any[]>([]);
    const isview = false;
    const isedit = true;
    const isdelete = true;


    const dispatch = useDispatch();
    useEffect(() => {
        (dispatch as any)(sliderList());
    }, [dispatch]); 
      
    const { Sliders, loading, error } = useSelector((state: any) => state.slider);

    useEffect(() => {
        setHeaderData(tableHeader);

        if (!loading && Sliders && Sliders.length > 0) {
            setBodyData(Sliders);
        } else {
            setBodyData([]);
        }
        
    }, [Sliders, loading]);

    const handleView = (id: string) => {
        console.log('View item with id:', id);
    }
    const handleEdit = (id: string) => {
        router.push(`/admin/sliders/${id}`)
    }
    const handleDelete = (id: string) => {
        (dispatch as any)(sliderDelete(id as any)).then((result: any) => {
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
        title="Sliders"
        linkHref="/admin/sliders/create"
        name="Slider"
    >
      { loading ? <p>Loading...</p> : <Table  headerData={headerData} bodyData={bodyData} onView={handleView} onEdit={handleEdit}  onDelete={handleDelete} isview={isview} isedit={isedit} isdelete={isdelete}/> }
    </AdPageLayout>
  )
}

export default AdSliders
