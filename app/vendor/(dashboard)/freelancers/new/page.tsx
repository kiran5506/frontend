"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MultiSelectWithPills from '@/components/MultiSelectWithPills';
import { serviceList } from '@/services/service-api';
import { skillList } from '@/services/skill-api';
import { languageList } from '@/services/language-api';
import { cityList } from '@/services/city-api';
import axiosInstance from '@/utils/axios';
import endpoints from '@/services/endpoints';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';


const NewFreelancer = () => {
    const dispatch = useDispatch();
    const [images, setImages] = useState<File[]>([]);
    const [videos, setVideos] = useState<File[]>([]);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [selectedServices, setSelectedServices] = useState<any[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<any[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<any[]>([]);
    const [selectedCity, setSelectedCity] = useState<any[]>([]);

    const { Services, loading: servicesLoading, error: servicesError } = useSelector((state: any) => state.service);
    const { Skills } = useSelector((state: any) => state.skill);
    const { Languages } = useSelector((state: any) => state.language);
    const { Cities } = useSelector((state: any) => state.city);

    // Map to OptionType[]
    const serviceOptions = (Services || []).map((item: any) => ({ value:  item._id, label: item.serviceName }));
    const skillOptions = (Skills || []).map((item: any) => ({ value: item._id, label: item.skillName }));
    const languageOptions = (Languages || []).map((item: any) => ({ value: item._id, label: item.languageName }));
    const cityOptions = (Cities || []).map((item: any) => ({ value: item._id, label: item.cityName }));

    useEffect(() => {
        (dispatch as any)(serviceList());
        (dispatch as any)(skillList());
        (dispatch as any)(languageList());
        (dispatch as any)(cityList());
    }, [dispatch]); 

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).filter(file =>
                file.type.startsWith('image/')
            );
            setImages(prev => [...prev, ...files]);
        }
    };

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).filter(file =>
                file.type.startsWith('video/')
            );
            setVideos(prev => [...prev, ...files]);
        }
    };

    const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type.startsWith('image/')) {
                setProfileImage(file);
            }
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeVideo = (index: number) => {
        setVideos(prev => prev.filter((_, i) => i !== index));
    };

    // Validation schema
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        mobile: Yup.string().required('Mobile is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        services: Yup.array().min(1, 'Select at least one service'),
        city: Yup.array().min(1, 'Select at least one city'),
        skills: Yup.array().min(1, 'Select at least one skill'),
        languages: Yup.array().min(1, 'Select at least one language'),
        profile: Yup.mixed().required('Profile image is required'),
        images: Yup.array().min(1, 'At least one image is required'),
        videos: Yup.array().optional(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // Sync selected options with react-hook-form
    useEffect(() => {
        setValue('services', selectedServices);
    }, [selectedServices, setValue]);
    useEffect(() => {
        setValue('skills', selectedSkills);
    }, [selectedSkills, setValue]);
    useEffect(() => {
        setValue('languages', selectedLanguages);
    }, [selectedLanguages, setValue]);
    useEffect(() => {
        setValue('city', selectedCity);
    }, [selectedCity, setValue]);
    useEffect(() => {
        setValue('images', images);
    }, [images, setValue]);
    useEffect(() => {
        setValue('videos', videos);
    }, [videos, setValue]);
    useEffect(() => {
        setValue('profile', (profileImage || '') as any);
    }, [profileImage, setValue]);

    // Submit handler
    const onSubmit = async (data: any) => {
        try {
            // Prepare FormData
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('mobile', data.mobile);
            formData.append('email', data.email);
            if (profileImage) {
                formData.append('profile', profileImage);
            }
            formData.append('city', selectedCity.map((c: any) => c.value).join(','));
            formData.append('services', selectedServices.map((s: any) => s.value).join(','));
            formData.append('skills', selectedSkills.map((s: any) => s.value).join(','));
            formData.append('languages', selectedLanguages.map((l: any) => l.value).join(','));
            images.forEach((img) => {
                formData.append('images', img);
            });
            videos.forEach((vid) => {
                formData.append('videos', vid);
            });

            // Call backend API
            const response = await axiosInstance.post(
                endpoints.FREELANCERS.create,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            if (!response?.data?.status) {
                throw new Error(response?.data?.message || 'Failed to submit profile');
            }

            toast.success('Freelancer profile submitted!');
            reset();
            setImages([]);
            setVideos([]);
            setSelectedServices([]);
            setSelectedSkills([]);
            setSelectedLanguages([]);
            setSelectedCity([]);
            setProfileImage(null);
        } catch (error: any) {
            toast.error('Error: ' + (error?.message || 'An error occurred while submitting the profile'));
        }
    };

    return (
        <>
            <h2 className="page-title">Join as a Freelancer</h2>
            <div className="col-12 col-lg-9">
                <div className="row">
                    <form className="row" onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-md-12">
                            <img
                                src={profileImage ? URL.createObjectURL(profileImage) : "assets/img/profile-img.jpg"}
                                alt="Profile preview"
                                width={200}
                                style={{ borderRadius: 12, objectFit: 'cover' }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="freelancer-name" className="form-label">
                                Name*
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="freelancer-name"
                                placeholder="Enter your Name"
                                {...register('name')}
                            />
                            {errors.name && <p className="text-danger">{errors.name.message}</p>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="freelancer-mobile" className="form-label">
                                Mobile*
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="freelancer-mobile"
                                placeholder="Enter Mobile Number"
                                {...register('mobile')}
                            />
                            {errors.mobile && <p className="text-danger">{errors.mobile.message}</p>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="freelancer-email" className="form-label">
                                Email*
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="freelancer-email"
                                placeholder="Enter your Email"
                                {...register('email')}
                            />
                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="freelancer-profile" className="form-label">
                                Profile Image*
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="freelancer-profile"
                                accept="image/*"
                                onChange={handleProfileUpload}
                            />
                            {errors.profile && <p className="text-danger">{errors.profile.message as string}</p>}
                        </div>
                        <div className="col-md-6">
                            <MultiSelectWithPills
                                id="freelancer-services"
                                label="Services*"
                                options={serviceOptions}
                                placeholder="Select services"
                                value={selectedServices}
                                onChange={(value) => setSelectedServices((value as any[]) || [])}
                            />
                            {errors.services && <p className="text-danger">{errors.services.message}</p>}
                        </div>
                        <div className="col-md-6">
                            <MultiSelectWithPills
                                id="city"
                                label="City*"
                                options={cityOptions}
                                placeholder="Select city"
                                value={selectedCity}
                                onChange={(value) => setSelectedCity((value as any[]) || [])}
                            />
                            {errors.city && <p className="text-danger">{errors.city.message}</p>}
                        </div>
                        <div className="col-md-6">
                            <MultiSelectWithPills
                                id="freelancer-skills"
                                label="Skills*"
                                options={skillOptions}
                                placeholder="Select skills"
                                value={selectedSkills}
                                onChange={(value) => setSelectedSkills((value as any[]) || [])}
                            />
                            {errors.skills && <p className="text-danger">{errors.skills.message}</p>}
                        </div>
                        <div className="col-md-6">
                            <MultiSelectWithPills
                                id="freelancer-languages"
                                label="Languages*"
                                options={languageOptions}
                                placeholder="Select languages"
                                value={selectedLanguages}
                                onChange={(value) => setSelectedLanguages((value as any[]) || [])}
                            />
                            {errors.languages && <p className="text-danger">{errors.languages.message}</p>}
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Portfolio*</label>
                            <span style={{ margin: 3 }}>
                                <label className="btn orange-btn btn-xs" style={{ cursor: 'pointer' }}>
                                    + Add Videos
                                    <input
                                        type="file"
                                        accept="video/*"
                                        multiple
                                        style={{ display: 'none' }}
                                        onChange={handleVideoUpload}
                                    />
                                </label>
                            </span>
                            <span style={{ margin: 3 }}>
                                <label className="btn orange-btn btn-xs" style={{ cursor: 'pointer' }}>
                                    + Add Photos
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            </span>
                            {errors.images && <p className="text-danger">{errors.images.message}</p>}
                        </div>
                        <div className='col-md-12'>
                            {images.length > 0 && (
                                <div className="col-md-12" style={{ marginTop: 10 }}>
                                    <h5>Uploaded Images</h5>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                        {images.map((img, idx) => (
                                            <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
                                                <img
                                                    src={URL.createObjectURL(img)}
                                                    alt={`uploaded-img-${idx}`}
                                                    style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(idx)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: 2,
                                                        right: 2,
                                                        background: '#ff4444',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '50%',
                                                        width: 24,
                                                        height: 24,
                                                        cursor: 'pointer',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Display uploaded videos */}
                            {videos.length > 0 && (
                                <div className="col-md-12" style={{ marginTop: 10 }}>
                                    <h5>Uploaded Videos</h5>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                        {videos.map((vid, idx) => (
                                            <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
                                                <video
                                                    src={URL.createObjectURL(vid)}
                                                    controls
                                                    style={{ width: 160, height: 100, borderRadius: 8, background: '#000' }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeVideo(idx)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: 2,
                                                        right: 2,
                                                        background: '#ff4444',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '50%',
                                                        width: 24,
                                                        height: 24,
                                                        cursor: 'pointer',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-md-12" style={{ marginTop: 20 }}>
                            <button type="submit" className="btn orange-btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewFreelancer
