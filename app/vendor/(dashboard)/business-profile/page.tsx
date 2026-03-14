"use client";
import { serviceList } from '@/services/service-api';
import { skillList } from '@/services/skill-api';
import { languageList } from '@/services/language-api';
import { createBusinessProfile, businessProfileByVendorId } from '@/services/business-profile-api';
import { updateProfileCompletionStatus, viewVendorById } from '@/services/vendor-api';
import { resetCurrentBusinessProfile } from '@/redux/features/business-profile-slice';
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const BusinessProfilePage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [isProfileCompleted, setIsProfileCompleted] = useState(false);
    const [isProfileVerified, setIsProfileVerified] = useState(false);

    const { vendorAuth } = useSelector((state: any) => state);
    console.log('vendorAuth in BusinessProfilePage -->', JSON.parse(vendorAuth.details));
    let vendorDetails = JSON.parse(vendorAuth.details);
    const vendorId = vendorAuth?.vendorid;

    useEffect(() => {
        setIsOtpVerified(vendorDetails.is_otp_verified);
        setIsProfileCompleted(vendorDetails.is_profile_completed);
        setIsProfileVerified(vendorDetails.is_profile_verified);
    }, [vendorAuth]);

    useEffect(() => {
        if (vendorId) {
            console.log('Fetching business profile for vendor ID:', vendorId);
            (dispatch as any)(viewVendorById(vendorId));
        }
    }, [dispatch, vendorId]);



    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    
    const { Services, loading, error } = useSelector((state: any) => state.service);
    const { Skills } = useSelector((state: any) => state.skill);
    const { Languages } = useSelector((state: any) => state.language);
    const { loading: profileLoading } = useSelector((state: any) => state.businessProfile);

    const validationSchema = Yup.object().shape({
        serviceName: Yup.string().required('Service category is required'),
        businessName: Yup.string().required('Business name is required'),
        doorNumber: Yup.string().required('Door number is required'),
        area: Yup.string().optional(),
        landmark: Yup.string().optional(),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        pincode: Yup.string().required('Pincode is required'),
        profilePicture: Yup.mixed().optional(),
        aadharFront: Yup.mixed().required('Aadhar front is required'),
        aadharBack: Yup.mixed().required('Aadhar back is required'),
        registrationCopy: Yup.mixed().optional(),
        gst: Yup.mixed().optional(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
    
    useEffect(() => {
        (dispatch as any)(serviceList());
        (dispatch as any)(skillList());
        (dispatch as any)(languageList());
    }, [dispatch]); 

    useEffect(() => {
        if (isOtpVerified && isProfileCompleted && isProfileVerified) {
            alert('Your business profile is already completed and verified. Redirecting to dashboard...');
            router.push('/vendor/dashboard');
        }
    }, [isOtpVerified, isProfileCompleted, isProfileVerified]);

    const onSubmit = async (data: any) => {
        try {
            if (!vendorId) {
                toast.error('Vendor ID not found. Please login again.');
                return;
            }

            if (selectedSkills.length === 0) {
                toast.error('Please select at least one skill');
                return;
            }

            if (selectedLanguages.length === 0) {
                toast.error('Please select at least one language');
                return;
            }

            const formData = new FormData();
            formData.append('vendor_id', vendorId);
            formData.append('serviceName', data.serviceName);
            formData.append('businessName', data.businessName);
            formData.append('doorNumber', data.doorNumber);
            formData.append('area', data.area || '');
            formData.append('landmark', data.landmark || '');
            formData.append('city', data.city);
            formData.append('state', data.state);
            formData.append('pincode', data.pincode);
            
            // Add skills and languages as comma-separated strings
            formData.append('skills', selectedSkills.join(', '));
            formData.append('languages', selectedLanguages.join(', '));

            // Add file uploads
            if (data.profilePicture && data.profilePicture[0]) {
                formData.append('profilePicture', data.profilePicture[0]);
            }
            if (data.aadharFront && data.aadharFront[0]) {
                formData.append('aadharFront', data.aadharFront[0]);
            }
            if (data.aadharBack && data.aadharBack[0]) {
                formData.append('aadharBack', data.aadharBack[0]);
            }
            if (data.registrationCopy && data.registrationCopy[0]) {
                formData.append('registrationCopy', data.registrationCopy[0]);
            }
            if (data.gst && data.gst[0]) {
                formData.append('gst', data.gst[0]);
            }

            const response = await (dispatch as any)(createBusinessProfile(formData as any)).unwrap();
            
            if (response?.status) {
                toast.success('Business profile created successfully!');
                (dispatch as any)(resetCurrentBusinessProfile());
                try {
                    await (dispatch as any)(updateProfileCompletionStatus(vendorId)).unwrap();
                    console.log('Profile completion status updated');
                } catch (updateError) {
                    console.error('Error updating profile completion status:', updateError);
                }
            } else {
                toast.error('Failed to create business profile: ' + (response?.message || 'Unknown error'));
            }
        } catch (error: any) {
            console.error('Error submitting form:', error);
            toast.error('Error: ' + (error?.message || 'An error occurred while creating the profile'));
        }
    };
  return (
    <>
        {'isOtpVerified' + isOtpVerified}
        {'isProfileCompleted' + isProfileCompleted}
        {'isProfileVerified' + isProfileVerified}
        {isOtpVerified && !isProfileCompleted && (
            <>
                <h2 className="page-title">Add New Business Profile</h2>
                <div className="col-12 col-lg-9">
                    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="form-section-title">1. Profile Info</h3>
                    <div className="col-12 col-md-6">
                        <label className="form-label">Select Service Category*</label>
                        <select className="form-select" aria-label="Default select example" {...register('serviceName')}>
                            <option value="">Choose Service</option>
                            {Services.map((service: any) => (
                                <option key={service._id} value={service.serviceName}>
                                    {service.serviceName} - {service.serviceType}
                                </option>
                            ))}
                        </select>
                        {errors.serviceName && <p className="text-danger">{errors.serviceName.message}</p>}
                    </div>
                    <div className="col-12 col-md-6" />
                    <div className="col-md-6">
                        <label htmlFor="business-name" className="form-label">
                        Business Name*
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        id="business-name"
                        placeholder="Enter Your Business Name"
                        {...register('businessName')}
                        />
                        {errors.businessName && <p className="text-danger">{errors.businessName.message}</p>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="profile-picture" className="form-label">
                        Profile Picture
                        </label>
                        <input
                        className="form-control"
                        type="file"
                        id="profile-picture"
                        accept="image/*"
                        {...register('profilePicture')}
                        />
                        {errors.profilePicture && <p className="text-danger">{errors.profilePicture.message}</p>}
                    </div>
                    <div className="col-md-12 mt-5 mb-0 pb-0">
                        <h5>Registered Address (Same as registered document)</h5>
                    </div>
                    <div className="mb-3  col-md-6">
                        <label className="form-label">Door Number or Flat Number*</label>
                        <input type="text" className="form-control py-2 px-4 rounded-5" {...register('doorNumber')} />
                        {errors.doorNumber && <p className="text-danger">{errors.doorNumber.message}</p>}
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className="form-label">Area</label>
                        <input type="text" className="form-control py-2 px-4 rounded-5" {...register('area')} />
                        {errors.area && <p className="text-danger">{errors.area.message}</p>}
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className="form-label">Landmark</label>
                        <input type="text" className="form-control py-2 px-4 rounded-5" {...register('landmark')} />
                        {errors.landmark && <p className="text-danger">{errors.landmark.message}</p>}
                    </div>
                    <div className="mb-3  col-md-6">
                        <label className="form-label">City*</label>
                        <input type="text" className="form-control py-2 px-4 rounded-5" {...register('city')} />
                        {errors.city && <p className="text-danger">{errors.city.message}</p>}
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className="form-label">State*</label>
                        <input type="text" className="form-control py-2 px-4 rounded-5" {...register('state')} />
                        {errors.state && <p className="text-danger">{errors.state.message}</p>}
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className="form-label">Pincode*</label>
                        <input type="text" className="form-control py-2 px-4 rounded-5" {...register('pincode')} />
                        {errors.pincode && <p className="text-danger">{errors.pincode.message}</p>}
                    </div>
                    <div className="col-12">
                        <label htmlFor="business-skills" className="form-label">
                        Business Skills*
                        </label>
                        {Skills && Skills.length > 0 ? (
                            <div>
                                {Skills.map((skill: any) => (
                                    <div key={skill._id} className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`skill_${skill._id}`}
                                            checked={selectedSkills.includes(skill.skillName)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedSkills([...selectedSkills, skill.skillName]);
                                                } else {
                                                    setSelectedSkills(selectedSkills.filter(s => s !== skill.skillName));
                                                }
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor={`skill_${skill._id}`}>
                                            {skill.skillName}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No skills available</p>
                        )}
                    </div>
                    <div className="col-12">
                        <label htmlFor="languages-known" className="form-label">
                        Languages Known*
                        </label>
                        {Languages && Languages.length > 0 ? (
                            <div>
                                {Languages.map((language: any) => (
                                    <div key={language._id} className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`language_${language._id}`}
                                            checked={selectedLanguages.includes(language.languageName)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedLanguages([...selectedLanguages, language.languageName]);
                                                } else {
                                                    setSelectedLanguages(selectedLanguages.filter(l => l !== language.languageName));
                                                }
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor={`language_${language._id}`}>
                                            {language.languageName}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No languages available</p>
                        )}
                    </div>
                    <h3 className="form-section-title">2. Documents</h3>
                    <div className="col-md-6">
                        <label htmlFor="upload-aadhar" className="form-label">
                        Aadhar Front*
                        </label>
                        <input
                        className="form-control"
                        type="file"
                        id="aadhar-front"
                        accept="image/*"
                        {...register('aadharFront')}
                        />
                        {errors.aadharFront && <p className="text-danger">{errors.aadharFront.message}</p>}
                        <br />
                        <label htmlFor="aadhar-back" className="form-label">
                        Aadhar Back*
                        </label>
                        <input
                        className="form-control"
                        type="file"
                        id="aadhar-back"
                        accept="image/*"
                        {...register('aadharBack')}
                        />
                        {errors.aadharBack && <p className="text-danger">{errors.aadharBack.message}</p>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="registration-copy" className="form-label">
                        Registration Copy (Optional)
                        </label>
                        <input
                        className="form-control"
                        type="file"
                        id="registration-copy"
                        accept="image/*,application/pdf"
                        {...register('registrationCopy')}
                        />
                        {errors.registrationCopy && <p className="text-danger">{errors.registrationCopy.message}</p>}
                        <br />
                        <label htmlFor="gst" className="form-label">
                        GST (Optional)
                        </label>
                        <input
                        className="form-control"
                        type="file"
                        id="gst"
                        accept="image/*,application/pdf"
                        {...register('gst')}
                        />
                        {errors.gst && <p className="text-danger">{errors.gst.message}</p>}
                    </div>
                    <div className="text-left mt-20">
                        <button
                        type="submit"
                        className="btn orange-btn"
                        disabled={profileLoading}
                        >
                        {profileLoading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                    </form>
                </div>
            </>
        )}

        {/* Business Profile Completed */}
        {isProfileCompleted && (
        <div className="row d-flex align-items-center justify-content-center py-5">
            <div className="col-12 col-lg-6 text-center">
                <img src="/assets/vendor/img/order-status_01.png" alt="" />
                {isProfileCompleted ? (
                <div className="section-one">
                    <h3>Congratulations</h3>
                    <p>Your Account has been created successfully.</p>
                    <p>Our team will call and confirm official verification.</p>
                    <p>It will takes upto 3 working days.</p>
                    <button type="button"
                    className="btn btn-dark rounded-5 py-2 px-4 my-4"
                    >Please wait for approval</button>
                    <p>Once Verification done above button will be activated<br /> Kindly re-check</p>
                </div>
                ): isProfileVerified ? (
                <div className="section-two">
                    <h3 className="mt-4">Your Business is Verified!</h3>
                    <button onClick={() => router.push('/dashboard')} type="button" className="btn orange-btn rounded-5 py-2 px-4 my-4">Access Dashboard</button>
                </div>
                ): null}
            </div>
        </div>
        )}
    </>
  )
}

export default BusinessProfilePage;
