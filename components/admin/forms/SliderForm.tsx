"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createSlider, sliderById, sliderEdit } from '@/services/slider-api';
import { resetCurrentSlider } from '@/redux/features/slider-slice';

interface SliderFormProps {
  id?: string; // optional because create & edit
}

const SliderForm = ({ id }: SliderFormProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentSlider } = useSelector((state: any) => state.slider);

    const [sliderImg, setSliderImg] = useState("");

    const validationSchema = Yup.object().shape({
        bannerDesktop: Yup.mixed()
        .test(
        'required',
        'Banner is required',
        (value) => {
            if (!value) return false;
            if (!(value instanceof FileList)) return false;
            return value.length > 0;
        }),
        linkTitle: Yup.string().required("Title is required"),
        linkUrl: Yup.string().optional(),
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
            (dispatch as any)(sliderById(id as any)).catch((error: any) => {
                console.error('Error fetching slider:', error);
                toast.error('Error loading slider data');
            });
        }
    }, [id, dispatch])

    // Populate form when currentSlider changes
    useEffect(() => {
        if(currentSlider && id) {
            const data = currentSlider.data || currentSlider;
            setValue
            setValue('linkTitle', data.linkTitle || '');
            setValue('linkUrl', data.linkUrl || '');
            setValue('description', data.description || '');
            setSliderImg(data.bannerDesktop);
        }
    }, [currentSlider, setValue, id])

    const onSubmit =  async (data: any) => {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (data[key]) {
                    if (data[key] instanceof FileList && data[key].length > 0) {
                        formData.append(key, data[key][0]);
                    } else if (!(data[key] instanceof FileList)) {
                        formData.append(key, data[key]);
                    }
                }
            });
            console.log(id);
            const action = id ? sliderEdit({ id, formData } as any) : createSlider(formData as any);
            const response = await (dispatch as any)(action as any).unwrap();
            if (response?.status) {
                toast.success(`Slider ${ id ? 'Updated' : 'Created' } successfully!`);
                (dispatch as any)(resetCurrentSlider());
                router.push('/admin/sliders');
            } else {
                toast.error('Failed to update slider: ' + (response?.message || 'Unknown error'));
            }
        }catch(error: any){
            console.error('Error submitting form:', error);
            toast.error('Error: ' + (error?.message || 'An error occurred while saving the slider'));
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
        <label htmlFor="page_headding" className="form-label">
            Slider Image
        </label>
        <input
            type="file"
            className="form-control"
            id="page_headding"
            placeholder="Title"
            defaultValue=""
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                setValue('bannerDesktop', files, { shouldValidate: true });
                }
            }}
        />
        {errors.bannerDesktop && <p className="text-danger">{errors.bannerDesktop.message}</p>}
        
        {sliderImg && (
             <img
                src={sliderImg ? `/api/image-proxy?url=${encodeURIComponent(sliderImg)}` : "/assets/admin/img/logo.png"}
                style={{ border: "1px solid #ddd7d7", width: "120px", height: '80px', marginTop: '6px'}}
            />
        )}
       
        </div>
        <div className="col-12">
        <label htmlFor="page_headding" className="form-label">
            Slider Name
        </label>
        <input
            type="text"
            className="form-control"
            id="linkTitle"
            {...register('linkTitle')}
        />
        {errors.linkTitle && <p className="text-danger">{errors.linkTitle.message}</p>}
        </div>
        <div className="col-12">
        <label htmlFor="page_headding" className="form-label">
            Sider Url
        </label>
        <input
            type="text"
            className="form-control"
            id="linkUrl"
            {...register('linkUrl')}
        />
        {errors.linkUrl && <p className="text-danger">{errors.linkUrl.message}</p>}
        </div>
        <div className="col-12">
        <label htmlFor="page_headding" className="form-label">
            Short Description
        </label>
        <input
            type="text"
            className="form-control"
            id="description"
            {...register('description')}
        />
        {errors.description && <p className="text-danger">{errors.description.message}</p>}
        </div>
        <div className="text-center">
        <button type="submit" className="btn btn-primary right-mrg">
            {id ? 'Update': 'Create'}
        </button>
        <button type="reset" className="btn btn-secondary">
            Reset
        </button>
        </div>
    </form>
  )
}

export default SliderForm
