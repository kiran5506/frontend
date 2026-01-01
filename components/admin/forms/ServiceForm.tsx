"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createService, serviceById, serviceEdit } from '@/services/service-api';
import { resetCurrentService } from '@/redux/features/service-slice';
import { categoryList } from '@/services/category-api';

interface ServiceFormProps {
  id?: string; // optional because create & edit
}

const ServiceForm = ({ id }: ServiceFormProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentService } = useSelector((state: any) => state.service);
    const { Categories, loading: categoriesLoading } = useSelector((state: any) => state.category);

    const [serviceImg, setServiceImg] = useState("");

    const validationSchema = Yup.object().shape({
        serviceName: Yup.string().required("Service Name is required"),
        serviceCategory: Yup.string().required("Category is required"),
        serviceType: Yup.string().required("Service Type is required"),
        portfolioType: Yup.string().required("Portfolio is required"),
        image: Yup.mixed().optional(),
        skills: Yup.string().optional(),
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
            (dispatch as any)(serviceById(id as any)).catch((error: any) => {
                console.error('Error fetching service:', error);
                toast.error('Error loading service data');
            });
        }
    }, [id, dispatch])

    // Fetch categories on component mount
    useEffect(() => {
        (dispatch as any)(categoryList()).catch((error: any) => {
            console.error('Error fetching categories:', error);
            toast.error('Error loading categories');
        });
    }, [dispatch])

    // Populate form when currentService changes
    useEffect(() => {
        if(currentService && id) {
            const data = currentService.data || currentService;
            setValue('serviceName', data.serviceName || '');
            setValue('serviceCategory', data.serviceCategory || '');
            setValue('serviceType', data.serviceType || '');
            setValue('portfolioType', data.portfolioType || '');
            setValue('skills', data.skills || '');
            setValue('description', data.description || '');
            setServiceImg(data.image);
        }
    }, [currentService, setValue, id])

    const onSubmit = async (data: any) => {
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
            const action = id ? serviceEdit({ id, formData } as any) : createService(formData as any);
            const response = await (dispatch as any)(action as any).unwrap();
            if (response?.status) {
                toast.success(`Service ${id ? 'Updated' : 'Created'} successfully!`);
                (dispatch as any)(resetCurrentService());
                router.push('/admin/services');
            } else {
                toast.error('Failed to save service: ' + (response?.message || 'Unknown error'));
            }
        } catch(error: any) {
            console.error('Error submitting form:', error);
            toast.error('Error: ' + (error?.message || 'An error occurred while saving the service'));
        }
    }

    return (
        <form
            className="row g-3"
            role="form"
            id="serviceForm"
            name="serviceForm"
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)} 
        >
            {/* Service Name */}
            <div className="col-12">
                <label htmlFor="serviceName" className="form-label">
                    Service Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="serviceName"
                    placeholder="Enter service name"
                    {...register('serviceName')}
                />
                {errors.serviceName && <p className="text-danger">{errors.serviceName.message}</p>}
            </div>

            {/* Service Category */}
            <div className="col-12">
                <label htmlFor="serviceCategory" className="form-label">
                    Service Category
                </label>
                <select
                    className="form-select"
                    id="serviceCategory"
                    {...register('serviceCategory')}
                    disabled={categoriesLoading}
                >
                    <option value="">
                        {categoriesLoading ? 'Loading categories...' : 'Choose Category'}
                    </option>
                    {Categories && Categories.length > 0 ? (
                        Categories.map((cat: any) => (
                            <option key={cat._id} value={cat.categoryName}>
                                {cat.categoryName}
                            </option>
                        ))
                    ) : (
                        <option disabled>No categories available</option>
                    )}
                </select>
                {errors.serviceCategory && <p className="text-danger">{errors.serviceCategory.message}</p>}
            </div>

            {/* Service Type */}
            <div className="col-12">
                <label htmlFor="serviceType" className="form-label">
                    Service Type
                </label>
                <select
                    className="form-select"
                    id="serviceType"
                    {...register('serviceType')}
                >
                    <option value="">Choose Type</option>
                    <option value="Primary">Primary Services</option>
                    <option value="Secondary">Secondary Services</option>
                </select>
                {errors.serviceType && <p className="text-danger">{errors.serviceType.message}</p>}
            </div>

            {/* Portfolio */}
            <div className="col-12">
                <label htmlFor="portfolioType" className="form-label">
                    Portfolio
                </label>
                <select
                    className="form-select"
                    id="portfolioType"
                    {...register('portfolioType')}
                >
                    <option value="">Choose Portfolio Type</option>
                    <option value="Multiple">Multiple</option>
                    <option value="Single">Single</option>
                </select>
                {errors.portfolioType && <p className="text-danger">{errors.portfolioType.message}</p>}
            </div>

            {/* Image */}
            <div className="col-12">
                <label htmlFor="image" className="form-label">
                    Service Image
                </label>
                <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                    placeholder="Choose image"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                            setValue('image', files, { shouldValidate: true });
                        }
                    }}
                />
                {errors.image && <p className="text-danger">{errors.image.message}</p>}

                {serviceImg && (
                    <img
                        src={serviceImg ? `/api/image-proxy?url=${encodeURIComponent(serviceImg)}` : "/assets/admin/img/logo.png"}
                        style={{ border: "1px solid #ddd7d7", width: "120px", height: '80px', marginTop: '6px'}}
                        alt="Service preview"
                    />
                )}
            </div>

            {/* Skills */}
            <div className="col-12">
                <label htmlFor="skills" className="form-label">
                    Skills
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="skills"
                    placeholder="Enter skills (comma-separated)"
                    {...register('skills')}
                />
                {errors.skills && <p className="text-danger">{errors.skills.message}</p>}
            </div>

            {/* Description */}
            <div className="col-12">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    className="form-control"
                    id="description"
                    placeholder="Enter service description"
                    rows={4}
                    {...register('description')}
                />
                {errors.description && <p className="text-danger">{errors.description.message}</p>}
            </div>

            {/* Buttons */}
            <div className="text-center">
                <button type="submit" className="btn btn-primary right-mrg">
                    {id ? 'Update' : 'Create'}
                </button>
                <button type="reset" className="btn btn-secondary">
                    Reset
                </button>
            </div>
        </form>
    )
}

export default ServiceForm
