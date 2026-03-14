"use client";
import React, { useEffect, useState } from 'react'
import AdPageLayout from '../../../../components/common/Layouts/AdPageLayout'
import Table from '../../../../components/common/Table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { deleteCustomer, fetchAllCustomers } from '@/services/customer-api';

const tableHeader: string[] = ['S.No', 'Customer Name', 'Phone', 'Email', 'Type', 'Status', 'Actions'];

const CustomersList = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const [headerData, setHeaderData] = useState<string[]>([]);
    const [bodyData, setBodyData] = useState<any[]>([]);
    const isview = true;
    const isedit = false;
    const isdelete = false;

    useEffect(() => {
        (dispatch as any)(fetchAllCustomers());
    }, [dispatch]);
      
    const { customersData, loading, error } = useSelector((state: any) => state.customer);

    useEffect(() => {
        setHeaderData(tableHeader);

        if (!loading && customersData && customersData.length > 0) {
            const formattedData = customersData.map((customer: any) => ({
                ...customer,
                name: customer.name,
                mobile_number: customer.mobile_number,
                email: customer.email,
                type: customer.type || 'direct',
                isActive: customer.isActive ? 'Active' : 'Inactive'
            }));
            setBodyData(formattedData);
        } else {
            setBodyData([]);
        } 
    }, [customersData, loading]);
    

    const handleView = (id: string) => {
        router.push(`/admin/customers/view/${id}`)
    }
    const handleEdit = (id: string) => {
        router.push(`/admin/customers/${id}`)
    }
    const handleDelete = (id: string) => {
        (dispatch as any)(deleteCustomer(id as any)).then((result: any) => {
            console.log('delete result-->', result);
            if(result.payload && result.payload.status){
                toast.success(result.payload.message);
                (dispatch as any)(fetchAllCustomers());
            }else{
                toast.error(result.payload.message);
            }
        })
    }
  return (
    <AdPageLayout 
        iscreate={false}
        title="Customers"
        linkHref="/admin/customers/create"
        name="Customer"
    >
      { loading ? <p>Loading...</p> : <Table  headerData={headerData} bodyData={bodyData} onView={handleView} onEdit={handleEdit}  onDelete={handleDelete} isview={isview} isedit={isedit} isdelete={isdelete}/> }
    </AdPageLayout>
  )
}

export default CustomersList
