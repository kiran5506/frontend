"use client";
import React, { useEffect, useState } from 'react'
import AdPageLayout from '../../../../components/common/Layouts/AdPageLayout'
import Table from '../../../../components/common/Table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { employeeDelete, employeeList } from '@/services/employee-api'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const tableHeader: string[] = ['S.No', 'Name', 'Role', 'Mobile Number', 'Photo', 'Actions'];

const AdEmployees = () => {
    const router = useRouter()
    const [headerData, setHeaderData] = useState<string[]>([]);
    const [bodyData, setBodyData] = useState<any[]>([]);
    const isview = false;
    const isedit = true;
    const isdelete = true;

    const dispatch = useDispatch();
    useEffect(() => {
        (dispatch as any)(employeeList());
    }, [dispatch]); 
      
    const { Employees, loading, error } = useSelector((state: any) => state.employee);

    useEffect(() => {
        setHeaderData(tableHeader);

        if (!loading && Employees && Employees.length > 0) {
            setBodyData(Employees);
        } else {
            setBodyData([]);
        }
        
    }, [Employees, loading]);

    const handleView = (id: string) => {
        console.log('View item with id:', id);
    }
    
    const handleEdit = (id: string) => {
        router.push(`/admin/employees/${id}`)
    }
    
    const handleDelete = (id: string) => {
        (dispatch as any)(employeeDelete(id as any)).then((result: any) => {
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
        title="Employees"
        linkHref="/admin/employees/create"
        name="Employee"
    >
      { loading ? <p>Loading...</p> : <Table  headerData={headerData} bodyData={bodyData} onView={handleView} onEdit={handleEdit}  onDelete={handleDelete} isview={isview} isedit={isedit} isdelete={isdelete}/> }
    </AdPageLayout>
  )
}

export default AdEmployees
