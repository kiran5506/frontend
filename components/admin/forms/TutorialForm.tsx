"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createTutorial, tutorialById, tutorialEdit } from '@/services/tutorial-api';
import { resetCurrentTutorial } from '@/redux/features/tutorial-slice';
import { languageList } from '@/services/language-api';


interface TutorialFormProps {
  id?: string;
}

const TutorialForm = ({ id }: TutorialFormProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentTutorial } = useSelector((state: any) => state.tutorial);
    const { Languages, loading: languagesLoading } = useSelector((state: any) => state.language);

    const [tutorialImg, setTutorialImg] = useState("");

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        language: Yup.string().required("Language is required"),
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
            (dispatch as any)(tutorialById(id as any)).catch((error: any) => {
                console.error('Error fetching tutorial:', error);
                toast.error('Error loading tutorial data');
            });
        }
    }, [id, dispatch])

    // Fetch languages on component mount
    useEffect(() => {
        (dispatch as any)(languageList()).catch((error: any) => {
            console.error('Error fetching languages:', error);
            toast.error('Error loading languages');
        });
    }, [dispatch]);

    useEffect(() => {
        if(currentTutorial && id) {
            const data = currentTutorial.data || currentTutorial;
            setValue('title', data.title || '');
            setValue('language', data.language || '');
            setValue('description', data.description || '');
            setTutorialImg(data.image);
        }
    }, [currentTutorial, setValue, id])

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
            const action = id ? tutorialEdit({ id, formData } as any) : createTutorial(formData as any);
            const response = await (dispatch as any)(action as any).unwrap();
            if (response?.status) {
                toast.success(`Tutorial ${ id ? 'Updated' : 'Created' } successfully!`);
                (dispatch as any)(resetCurrentTutorial());
                router.push('/admin/tutorials');
            } else {
                toast.error('Failed to save tutorial: ' + (response?.message || 'Unknown error'));
            }
        }catch(error: any){
            console.error('Error submitting form:', error);
            toast.error('Error: ' + (error?.message || 'An error occurred while saving the tutorial'));
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
        <label htmlFor="title" className="form-label">
            Tutorial Title
        </label>
        <input
            type="text"
            className="form-control"
            id="title"
            {...register('title')}
            placeholder='Enter tutorial title'
        />
        {errors.title && <p className="text-danger">{errors.title.message}</p>}
        </div>

        

        <div className="col-12">
        <label htmlFor="image" className="form-label">
            Tutorial Image
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
        
        {tutorialImg && (
             <img
                src={tutorialImg ? `/api/image-proxy?url=${encodeURIComponent(tutorialImg)}` : "/assets/admin/img/logo.png"}
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
            rows={6}
            placeholder='Enter tutorial description'
        ></textarea>
        {errors.description && <p className="text-danger">{errors.description.message}</p>}
        </div>

        <div className="col-12">
        <label htmlFor="language" className="form-label">
            Language
        </label>
        <select
            className="form-select"
            id="language"
            {...register('language')}
            disabled={languagesLoading}
        >
            <option value="">
                {languagesLoading ? 'Loading languages...' : 'Choose Language'}
            </option>
            {Languages && Languages.length > 0 ? (
                Languages.map((lang: any) => (
                    <option key={lang._id} value={lang.languageName}>
                        {lang.languageName}
                    </option>
                ))
            ) : (
                <option disabled>No languages available</option>
            )}
        </select>
        {errors.language && <p className="text-danger">{errors.language.message}</p>}
        </div>
        
        <div className="col-12">
        <button className="btn btn-primary" type="submit">
            {id ? 'Update' : 'Create'} Tutorial
        </button>
        </div>
    </form>
  )
}

export default TutorialForm
