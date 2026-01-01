"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createCity, cityById, cityEdit } from '@/services/city-api';
import { resetCurrentCity } from '@/redux/features/city-slice';

interface CityFormProps {
  id?: string;
}

const CityForm = ({ id }: CityFormProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentCity } = useSelector((state: any) => state.city);

    const validationSchema = Yup.object().shape({
        cityName: Yup.string().required("City name is required"),
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
            (dispatch as any)(cityById(id as any)).catch((error: any) => {
                console.error('Error fetching city:', error);
                toast.error('Error loading city data');
            });
        }
    }, [id, dispatch])

    useEffect(() => {
        if(currentCity && id) {
            const data = currentCity.data || currentCity;
            setValue('cityName', data.cityName || '');
        }
    }, [currentCity, setValue, id])

    const onSubmit =  async (data: any) => {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (data[key]) {
                    formData.append(key, data[key]);
                }
            });
            const action = id ? cityEdit({ id, formData } as any) : createCity(formData as any);
            const response = await (dispatch as any)(action as any).unwrap();
            if (response?.status) {
                toast.success(`City ${ id ? 'Updated' : 'Created' } successfully!`);
                (dispatch as any)(resetCurrentCity());
                router.push('/admin/cities');
            } else {
                toast.error('Failed to save city: ' + (response?.message || 'Unknown error'));
            }
        }catch(error: any){
            console.error('Error submitting form:', error);
            toast.error('Error: ' + (error?.message || 'An error occurred while saving the city'));
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
        <label htmlFor="cityName" className="form-label">
            City Name
        </label>
        <input
            type="text"
            className="form-control"
            id="cityName"
            {...register('cityName')}
        />
        {errors.cityName && <p className="text-danger">{errors.cityName.message}</p>}
        </div>
        
        <div className="col-12">
        <button className="btn btn-primary" type="submit">
            {id ? 'Update' : 'Create'} City
        </button>
        </div>
    </form>
  )
}

export default CityForm
