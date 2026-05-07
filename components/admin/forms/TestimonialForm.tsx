"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createTestimonial, testimonialById, testimonialEdit } from '@/services/testimonial-api';
import { resetCurrentTestimonial } from '@/redux/features/testimonial-slice';

interface TestimonialFormProps {
  id?: string;
}

const TestimonialForm = ({ id }: TestimonialFormProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentTestimonial } = useSelector((state: any) => state.testimonial);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [hasImage, setHasImage] = useState(false);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        rating: Yup.number()
            .required("Rating is required")
            .min(1, "Rating must be at least 1")
            .max(5, "Rating must be at most 5")
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
            (dispatch as any)(testimonialById(id as any)).catch((error: any) => {
                console.error('Error fetching testimonial:', error);
                toast.error('Error loading testimonial data');
            });
        }
    }, [id, dispatch])

    useEffect(() => {
        if(currentTestimonial && id) {
            const data = currentTestimonial.data || currentTestimonial;
            setValue('title', data.title || '');
            setValue('description', data.description || '');
            setValue('rating', data.rating || 1);
            if(data.image) {
                setImagePreview(data.image);
                setHasImage(true);
            }
        }
    }, [currentTestimonial, setValue, id])

    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setHasImage(true);
            const file = files[0];

            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }

            const objectUrl = URL.createObjectURL(file);
            setImagePreview(objectUrl);
        }
    }

    const getPreviewSrc = (preview: string | null) => {
        if (!preview) return '/assets/admin/img/logo.png';
        if (preview.startsWith('blob:') || preview.startsWith('data:')) {
            return preview;
        }
        return `/api/image-proxy?url=${encodeURIComponent(preview)}`;
    };

    const onSubmit = async (data: any) => {
        try {
            // Validate image for create mode
            if (!id && !hasImage) {
                toast.error('Image is required for creating testimonial');
                return;
            }

            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('rating', data.rating);
            
            // Handle image file - get from file input directly
            const fileInput = document.getElementById('image') as HTMLInputElement;
            if (fileInput && fileInput.files && fileInput.files.length > 0) {
                formData.append('image', fileInput.files[0]);
            } else if (id) {
                // Edit mode - image not required
            }

            const action = id ? testimonialEdit({ id, formData } as any) : createTestimonial(formData as any);
            const response = await (dispatch as any)(action as any).unwrap();
            
            if (response?.status) {
                toast.success(`Testimonial ${ id ? 'Updated' : 'Created' } successfully!`);
                (dispatch as any)(resetCurrentTestimonial());
                router.push('/admin/testimonials');
            } else {
                toast.error('Failed to save testimonial: ' + (response?.message || 'Unknown error'));
            }
        }catch(error: any){
            console.error('Error submitting form:', error);
            toast.error('Error: ' + (error?.message || 'An error occurred while saving the testimonial'));
        }
    }

  return (
    <form
        className="row g-3"
        role="form"
        id="updateTestimonial"
        name="updateTestimonial"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)} 
    >
        <div className="col-12">
            <label htmlFor="title" className="form-label">
                Name
            </label>
            <input
                type="text"
                className="form-control"
                id="title"
                placeholder='Enter the name'
                {...register('title')}
            />
            {errors.title && <p className="text-danger">{errors.title.message}</p>}
        </div>

        <div className="col-12">
            <label htmlFor="description" className="form-label">
                Testimonial
            </label>
            <textarea
                className="form-control"
                id="description"
                rows={4}
                placeholder='Write the testimonial here...'
                {...register('description')}
            />
            {errors.description && <p className="text-danger">{errors.description.message}</p>}
        </div>

        <div className="col-12">
            <label htmlFor="rating" className="form-label">
                Rating (1-5)
            </label>
            <input
                type="number"
                className="form-control"
                id="rating"
                min="0.5"
                max="5"
                step="0.5"
                placeholder='Enter rating between 1 and 5'
                {...register('rating')}
            />
            {errors.rating && <p className="text-danger">{errors.rating.message}</p>}
        </div>

        <div className="col-12">
            <label htmlFor="image" className="form-label">
                Image
            </label>
            <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
            />
            {!id && !hasImage && <p className="text-danger">Image is required</p>}
            {imagePreview && (
                <div className="mt-3">
                    <img 
                        src={getPreviewSrc(imagePreview)}
                        alt="Preview" 
                        style={{ border: "1px solid #ddd7d7", width: "150px", height: '120px', marginTop: '6px', objectFit: 'cover' }}
                    />
                </div>
            )}
        </div>
        
        <div className="col-12">
            <button className="btn btn-primary" type="submit">
                {id ? 'Update' : 'Create'} Testimonial
            </button>
        </div>
    </form>
  )
}

export default TestimonialForm
