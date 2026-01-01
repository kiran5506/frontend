"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createLeadPackage, leadpackageById, leadpackageEdit } from '@/services/leadpackage-api';
import { resetCurrentLeadPackage } from '@/redux/features/leadpackage-slice';

interface LeadPackageFormProps {
  id?: string;
}

const LeadPackageForm = ({ id }: LeadPackageFormProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentLeadPackage } = useSelector((state: any) => state.leadpackage);

    const [packageImg, setPackageImg] = useState("");

    const validationSchema = Yup.object().shape({
        packageName: Yup.string().required("Package name is required"),
        totalLeads: Yup.number().required("Total leads is required"),
        amount: Yup.number().required("Amount is required"),
        image: Yup.mixed()
        .test(
        'required',
        'Image is required',
        (value) => {
            if (id) return true; // Skip validation on edit
            if (!value) return false;
            if (!(value instanceof FileList)) return false;
            return value.length > 0;
        }),
        description: Yup.string().optional(),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if(id) {
            (dispatch as any)(leadpackageById(id as any)).catch((error: any) => {
                console.error('Error fetching lead package:', error);
                toast.error('Error loading lead package data');
            });
        }
    }, [id, dispatch])

    useEffect(() => {
        if(currentLeadPackage && id) {
            const data = currentLeadPackage.data || currentLeadPackage;
            setValue('packageName', data.packageName || '');
            setValue('totalLeads', data.totalLeads || '');
            setValue('amount', data.amount || '');
            setValue('description', data.description || '');
            setPackageImg(data.image);
        }
    }, [currentLeadPackage, setValue, id])

    const onSubmit =  async (data: any) => {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (data[key] !== undefined && data[key] !== '') {
                    if (data[key] instanceof FileList && data[key].length > 0) {
                        formData.append(key, data[key][0]);
                    } else if (!(data[key] instanceof FileList)) {
                        formData.append(key, data[key]);
                    }
                }
            });
            const action = id ? leadpackageEdit({ id, formData } as any) : createLeadPackage(formData as any);
            const response = await (dispatch as any)(action as any).unwrap();
            if (response?.status) {
                toast.success(`Lead Package ${ id ? 'Updated' : 'Created' } successfully!`);
                (dispatch as any)(resetCurrentLeadPackage());
                router.push('/admin/leadpackages');
            } else {
                toast.error('Failed to save lead package: ' + (response?.message || 'Unknown error'));
            }
        }catch(error: any){
            console.error('Error submitting form:', error);
            toast.error('Error: ' + (error?.message || 'An error occurred while saving the lead package'));
        }
    }

  return (
    <form
        className="row g-3"
        role="form"
        id="updateContent"
        name="updateContent"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)} 
    >
        <div className="col-12">
        <label htmlFor="packageName" className="form-label">
            Package Name
        </label>
        <input
            type="text"
            className="form-control"
            id="packageName"
            {...register('packageName')}
        />
        {errors.packageName && <p className="text-danger">{errors.packageName.message}</p>}
        </div>

        <div className="col-12">
        <label htmlFor="totalLeads" className="form-label">
            Total Leads
        </label>
        <input
            type="number"
            className="form-control"
            id="totalLeads"
            {...register('totalLeads')}
        />
        {errors.totalLeads && <p className="text-danger">{errors.totalLeads.message}</p>}
        </div>

        <div className="col-12">
        <label htmlFor="amount" className="form-label">
            Amount
        </label>
        <input
            type="number"
            className="form-control"
            id="amount"
            step="0.01"
            {...register('amount')}
        />
        {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
        </div>

        <div className="col-12">
        <label htmlFor="image" className="form-label">
            Package Image
        </label>
        <input
            type="file"
            className="form-control"
            id="image"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                setValue('image', files, { shouldValidate: true });
                }
            }}
        />
        {errors.image && <p className="text-danger">{errors.image.message}</p>}
        
        {packageImg && (
             <img
                src={packageImg ? `/api/image-proxy?url=${encodeURIComponent(packageImg)}` : "/assets/admin/img/logo.png"}
                style={{ border: "1px solid #ddd7d7", width: "120px", height: '80px', marginTop: '6px'}}
            />
        )}
        </div>

        <div className="col-12">
        <label htmlFor="description" className="form-label">
            Description
        </label>
        <textarea
            className="form-control"
            id="description"
            {...register('description')}
        ></textarea>
        {errors.description && <p className="text-danger">{errors.description.message}</p>}
        </div>
        
        <div className="col-12">
        <button className="btn btn-primary" type="submit">
            {id ? 'Update' : 'Create'} Lead Package
        </button>
        </div>
    </form>
  )
}

export default LeadPackageForm
