"use client";
import React, { useEffect, useState } from 'react'
import AdPageLayout from '../../../../components/common/Layouts/AdPageLayout'
import Table from '../../../../components/common/Table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { testimonialDelete, testimonialList } from '@/services/testimonial-api'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const tableHeader: string[] = ['S.No', 'Title', 'Description', 'Rating', 'Image', 'Actions'];

const AdTestimonials = () => {
    const router = useRouter()
    const [headerData, setHeaderData] = useState<string[]>([]);
    const [bodyData, setBodyData] = useState<any[]>([]);
    const isview = false;
    const isedit = true;
    const isdelete = true;


    const dispatch = useDispatch();
    useEffect(() => {
        (dispatch as any)(testimonialList());
    }, [dispatch]); 
      
    const { Testimonials, loading, error } = useSelector((state: any) => state.testimonial);

    useEffect(() => {
        setHeaderData(tableHeader);

        if (!loading && Testimonials && Testimonials.length > 0) {
            setBodyData(Testimonials);
        } else {
            setBodyData([]);
        }
        
    }, [Testimonials, loading]);

    const handleView = (id: string) => {
        console.log('View item with id:', id);
    }
    const handleEdit = (id: string) => {
        router.push(`/admin/testimonials/${id}`)
    }
    const handleDelete = (id: string) => {
        (dispatch as any)(testimonialDelete(id as any)).then((result: any) => {
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
        title="Testimonials"
        linkHref="/admin/testimonials/create"
        name="Testimonial"
    >
      { loading ? <p>Loading...</p> : <Table  headerData={headerData} bodyData={bodyData} onView={handleView} onEdit={handleEdit}  onDelete={handleDelete} isview={isview} isedit={isedit} isdelete={isdelete}/> }
    </AdPageLayout>
  )
}

export default AdTestimonials
