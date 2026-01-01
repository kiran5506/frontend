"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createLanguage, languageById, languageEdit } from '@/services/language-api';
import { resetCurrentLanguage } from '@/redux/features/language-slice';

interface LanguageFormProps {
  id?: string;
}

const LanguageForm = ({ id }: LanguageFormProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentLanguage } = useSelector((state: any) => state.language);

    const validationSchema = Yup.object().shape({
        languageName: Yup.string().required("Language name is required"),
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
            (dispatch as any)(languageById(id as any)).catch((error: any) => {
                console.error('Error fetching language:', error);
                toast.error('Error loading language data');
            });
        }
    }, [id, dispatch])

    useEffect(() => {
        if(currentLanguage && id) {
            const data = currentLanguage.data || currentLanguage;
            setValue('languageName', data.languageName || '');
        }
    }, [currentLanguage, setValue, id])

    const onSubmit =  async (data: any) => {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (data[key]) {
                    formData.append(key, data[key]);
                }
            });
            const action = id ? languageEdit({ id, formData } as any) : createLanguage(formData as any);
            const response = await (dispatch as any)(action as any).unwrap();
            if (response?.status) {
                toast.success(`Language ${ id ? 'Updated' : 'Created' } successfully!`);
                (dispatch as any)(resetCurrentLanguage());
                router.push('/admin/languages');
            } else {
                toast.error('Failed to save language: ' + (response?.message || 'Unknown error'));
            }
        }catch(error: any){
            console.error('Error submitting form:', error);
            toast.error('Error: ' + (error?.message || 'An error occurred while saving the language'));
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
        <label htmlFor="languageName" className="form-label">
            Language Name
        </label>
        <input
            type="text"
            className="form-control"
            id="languageName"
            {...register('languageName')}
        />
        {errors.languageName && <p className="text-danger">{errors.languageName.message}</p>}
        </div>
        
        <div className="col-12">
        <button className="btn btn-primary" type="submit">
            {id ? 'Update' : 'Create'} Language
        </button>
        </div>
    </form>
  )
}

export default LanguageForm
