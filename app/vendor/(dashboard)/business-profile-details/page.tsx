"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { businessProfileByVendorId, businessProfileEdit, businessProfileCoverImageDelete } from '@/services/business-profile-api'
import { serviceList } from '@/services/service-api'
import { skillList } from '@/services/skill-api'
import { languageList } from '@/services/language-api'
import { toast } from 'react-toastify'

const BusinessProfile = () => {
  const dispatch = useDispatch() as any;
  const { vendorAuth } = useSelector((state: any) => state);
  const vendorId = vendorAuth?.vendorid;
  const { Services } = useSelector((state: any) => state.service);
  const { Skills } = useSelector((state: any) => state.skill);
  const { Languages } = useSelector((state: any) => state.language);
  const { loading } = useSelector((state: any) => state.businessProfile);

  const [profile, setProfile] = useState<any>(null);
  const [formValues, setFormValues] = useState({
    serviceId: '',
    businessName: '',
    registeredAddress: '',
    skills: [] as string[],
    languages: [] as string[],
    mobileNumber: '',
    email: '',
    aboutUs: '',
    communicationAddress: ''
  });
  const [coverImages, setCoverImages] = useState<File[]>([]);
  const [coverPreviews, setCoverPreviews] = useState<string[]>([]);
  const [documentFiles, setDocumentFiles] = useState<{
    aadharFront?: File | null;
    aadharBack?: File | null;
    registrationCopy?: File | null;
    gst?: File | null;
  }>({});
  const [documentPreviews, setDocumentPreviews] = useState<{
    aadharFront?: string;
    aadharBack?: string;
    registrationCopy?: string;
    gst?: string;
  }>({});

  const getProxyUrl = (url?: string) => {
    if (!url) return '';
    const normalized = String(url).trim();
    if (!normalized) return '';

    if (normalized.startsWith('data:') || normalized.startsWith('blob:')) {
      return normalized;
    }

    if (normalized.startsWith('/assets') || normalized.startsWith('/images')) {
      return normalized;
    }

    if (normalized.startsWith('http')) {
      return `/api/image-proxy?url=${encodeURIComponent(normalized)}`;
    }

    return `/api/image-proxy?url=${encodeURIComponent(normalized)}`;
  };

  const formatAddress = (address: any) => {
    const parts = [
      address?.doorNumber,
      address?.area,
      address?.landmark,
      address?.city,
      address?.state,
      address?.pincode
    ].filter(Boolean);
    return parts.join(', ');
  };

  useEffect(() => {
    (dispatch as any)(serviceList());
    (dispatch as any)(skillList());
    (dispatch as any)(languageList());
  }, [dispatch]);

  useEffect(() => {
    if (!vendorId) {
      return;
    }

    (dispatch as any)(businessProfileByVendorId(vendorId))
      .then((response: any) => {
        console.log('Business profile response:', response);
        if (response?.payload?.status && response?.payload?.data?.length) {
          const profileData = response.payload.data[0];
          setProfile(profileData);
          setFormValues((prev) => ({
            ...prev,
            serviceId: profileData?.service_id?._id || profileData?.service_id || '',
            businessName: profileData?.businessName || '',
            registeredAddress: formatAddress(profileData?.address) || '',
            skills: profileData?.skills || [],
            languages: profileData?.languages || [],
            mobileNumber: profileData?.vendor_id?.mobile_number || '',
            email: profileData?.vendor_id?.email || '',
            aboutUs: profileData?.about_us || '',
            communicationAddress: profileData?.communication_address || ''
          }));
        } else {
          toast.info('No business profile found for this vendor.');
        }
      })
      .catch((error: any) => {
        console.error('Error fetching business profile:', error);
        toast.error('Failed to load business profile data.');
      });
  }, [dispatch, vendorId]);

  const handleValueChange = (field: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleSelection = (field: 'skills' | 'languages', value: string) => {
    setFormValues((prev) => {
      const currentList = prev[field] || [];
      return {
        ...prev,
        [field]: currentList.includes(value)
          ? currentList.filter((item) => item !== value)
          : [...currentList, value]
      };
    });
  };

  const handleCoverImages = (files: FileList | null) => {
    if (!files) {
      setCoverImages([]);
      setCoverPreviews([]);
      return;
    }
    const existingCount = profile?.cover_images?.length || 0;
    const remainingSlots = Math.max(0, 3 - existingCount);
    if (remainingSlots === 0) {
      toast.info('Maximum 3 cover images allowed. Please delete one to upload more.');
      setCoverImages([]);
      setCoverPreviews([]);
      return;
    }
    const nextFiles = Array.from(files).slice(0, remainingSlots);
    setCoverImages(nextFiles);
    setCoverPreviews(nextFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleDeleteCoverImage = async (image: string) => {
    if (!profile?._id || !vendorId) {
      toast.error('Business profile not found.');
      return;
    }

    try {
      const response = await (dispatch as any)(
        businessProfileCoverImageDelete({ id: profile._id, vendor_id: vendorId, image } as any)
      ).unwrap();
      if (response?.status && response?.data) {
        setProfile(response.data);
        toast.success('Cover image deleted.');
      } else {
        toast.error(response?.message || 'Failed to delete cover image.');
      }
    } catch (error: any) {
      console.error('Delete cover image error:', error);
      toast.error(error?.message || 'Failed to delete cover image.');
    }
  };

  const handleRemoveCoverPreview = (index: number) => {
    setCoverImages((prev) => prev.filter((_, idx) => idx !== index));
    setCoverPreviews((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleDocumentFileChange = (
    field: 'aadharFront' | 'aadharBack' | 'registrationCopy' | 'gst',
    file: File | null
  ) => {
    setDocumentFiles((prev) => ({
      ...prev,
      [field]: file,
    }));

    setDocumentPreviews((prev) => ({
      ...prev,
      [field]: file ? URL.createObjectURL(file) : '',
    }));
  };

  const getDocumentImage = (field: 'aadharFront' | 'aadharBack' | 'registrationCopy' | 'gst') => {
    return documentPreviews[field] || profile?.documents?.[field] || '';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profile?._id || !vendorId) {
      toast.error('Business profile not found.');
      return;
    }

    const formData = new FormData();
    formData.append('vendor_id', vendorId);
  formData.append('service_id', formValues.serviceId);
    formData.append('businessName', formValues.businessName);

    const address = profile?.address || {};
    formData.append('doorNumber', address.doorNumber || '');
    formData.append('area', address.area || '');
    formData.append('landmark', address.landmark || '');
    formData.append('city', address.city || '');
    formData.append('state', address.state || '');
    formData.append('pincode', address.pincode || '');

    formData.append('skills', formValues.skills.join(', '));
    formData.append('languages', formValues.languages.join(', '));
    formData.append('about_us', formValues.aboutUs || '');
    formData.append('communication_address', formValues.communicationAddress || '');

    coverImages.forEach((file) => formData.append('coverImages', file));
  if (documentFiles.aadharFront) formData.append('aadharFront', documentFiles.aadharFront);
  if (documentFiles.aadharBack) formData.append('aadharBack', documentFiles.aadharBack);
  if (documentFiles.registrationCopy) formData.append('registrationCopy', documentFiles.registrationCopy);
  if (documentFiles.gst) formData.append('gst', documentFiles.gst);

    try {
      const response = await (dispatch as any)(
        businessProfileEdit({ id: profile._id, formData } as any)
      ).unwrap();
      if (response?.status) {
        toast.success('Business profile updated successfully.');
      } else {
        toast.error(response?.message || 'Failed to update business profile.');
      }
    } catch (error: any) {
      console.error('Update business profile error:', error);
      toast.error(error?.message || 'Failed to update business profile.');
    }
  };

  return (
   <>
  <h2 className="page-title">View/Edit Business</h2>
  <div className="col-12 col-lg-12">
  <form className="row g-3" onSubmit={handleSubmit}>
      <div className="accordion" id="accordionProfile">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <span className="p-3"> 1. Business Info</span>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionProfile"
          >
            <div className="accordion-body">
              <div className="row ">
                <div className="col-12 col-md-8 ">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">
                        Select Service Category*
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={formValues.serviceId}
                        onChange={(e) => handleValueChange('serviceId', e.target.value)}
                      >
                        <option value="">Choose</option>
                        {Services?.map((service: any) => (
                          <option key={service._id} value={service._id}>
                            {service.serviceName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label htmlFor="business-name" className="form-label">
                        Business Name*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="business-name"
                        id="business-name"
                        placeholder="Enter your business name"
                        value={formValues.businessName}
                        onChange={(e) => handleValueChange('businessName', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4 text-end">
                  <img
                    src={getProxyUrl(profile?.profilePicture) || "/assets/img/business_pic.png"}
                    alt=""
                    style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%' }}
                    onError={(event) => {
                      const target = event.currentTarget;
                      if (target.src.includes('/assets/img/business_pic.png')) return;
                      target.src = '/assets/img/business_pic.png';
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-8">
                  <label htmlFor="registered-Address" className="form-label">
                    Registered Address* (Same as registered document)
                  </label>
                  <textarea
                    name="registered-Address"
                    className="form-control rounded-4"
                    placeholder="Enter registered address"
                    style={{ height: 100 }}
                    value={formValues.registeredAddress}
                    onChange={(e) => handleValueChange('registeredAddress', e.target.value)}
                  />
                </div>
                <div className="col-12 col-md-8">
                  <label htmlFor="business-skills" className="form-label">
                    Business Skills*
                  </label>
                  {Skills?.map((skill: any) => (
                    <div className="form-check form-check-inline" key={skill._id}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`skill_${skill._id}`}
                        checked={formValues.skills.includes(skill.skillName)}
                        onChange={() => toggleSelection('skills', skill.skillName)}
                      />
                      <label className="form-check-label" htmlFor={`skill_${skill._id}`}>
                        {skill.skillName}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="col-12 col-md-8">
                  <label htmlFor="languages-known" className="form-label">
                    Languages Known*
                  </label>
                  {Languages?.map((language: any) => (
                    <div className="form-check form-check-inline" key={language._id}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`language_${language._id}`}
                        checked={formValues.languages.includes(language.languageName)}
                        onChange={() => toggleSelection('languages', language.languageName)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`language_${language._id}`}
                      >
                        {language.languageName}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="col-md-8 mt-0">
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="account-number" className="form-label">
                        Mobile Number*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="account-number"
                        id="account-number"
                        placeholder="Enter mobile number"
                        value={formValues.mobileNumber}
                        onChange={(e) => handleValueChange('mobileNumber', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="account-name" className="form-label">
                        Email ID*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="account-name"
                        id="account-name"
                        placeholder="Enter email address"
                        value={formValues.email}
                        onChange={(e) => handleValueChange('email', e.target.value)}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="ifsc-code" className="form-label">
                        About Us
                      </label>
                      <textarea
                        className="form-control rounded-4"
                        rows={5}
                        placeholder="Tell us about your business"
                        value={formValues.aboutUs}
                        onChange={(e) => handleValueChange('aboutUs', e.target.value)}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="ifsc-code" className="form-label">
                        Communication Address
                      </label>
                      <textarea
                        className="form-control rounded-4"
                        rows={4}
                        placeholder="Enter communication address"
                        value={formValues.communicationAddress}
                        onChange={(e) => handleValueChange('communicationAddress', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="account-nickname" className="form-label">
                        Cover Images* (Upto 3 Images)
                      </label>
                      {(profile?.cover_images?.length || 0) + coverImages.length < 3 && (
                        <input
                          type="file"
                          className="form-control"
                          name="account-nickname"
                          id="account-nickname"
                          placeholder="Enter Nickname"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleCoverImages(e.target.files)}
                        />
                      )}
                      {(profile?.cover_images?.length || 0) + coverImages.length >= 3 && (
                        <p className="text-muted mt-2">Maximum 3 cover images uploaded.</p>
                      )}
                      
                      
                    </div>
                    <div className="col-md-12">

                      {coverPreviews.length > 0 && (
                        <div className="row mt-3">
                          {coverPreviews.map((image, index) => (
                            <div className="col-6 col-lg-4" key={`cover-preview-${index}`}>
                              <div className="position-relative">
                                <img
                                  src={image}
                                  alt={`Cover preview ${index + 1}`}
                                  className="zoom w-100"
                                  style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                                  style={{ borderRadius: '50%', width: 28, height: 28, padding: 0 }}
                                  onClick={() => handleRemoveCoverPreview(index)}
                                  aria-label="Remove cover preview"
                                >
                                  &times;
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {profile?.cover_images?.length > 0 && (
                        <div className="row mt-3">
                          {profile.cover_images.map((image: string, index: number) => (
                            <div className="col-6 col-lg-4" key={`cover-${index}`}>
                              <img
                                src={getProxyUrl(image)}
                                alt={`Cover ${index + 1}`}
                                className="zoom w-100"
                                style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }}
                              />
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger mt-2"
                                onClick={() => handleDeleteCoverImage(image)}
                              >
                                Delete
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 d-none d-md-block">&nbsp;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <span className="p-3">2. Documents</span>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionProfile"
          >
            <div className="accordion-body pb-5 pt-0">
              <div className="row mt-0">
                <div className="col-md-4">
                  <label htmlFor="upload-aadhar" className="form-label">
                    Aadhar Front*
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="aadhar-front"
                    id="formFile"
                    accept="image/*"
                    onChange={(e) => handleDocumentFileChange('aadharFront', e.target.files?.[0] || null)}
                  />
                  {getDocumentImage('aadharFront') && (
                    <div className="mt-3">
                      <Link
                        href={getProxyUrl(getDocumentImage('aadharFront'))}
                        data-fancybox="gallery"
                      >
                        <img
                          src={getProxyUrl(getDocumentImage('aadharFront'))}
                          alt="Aadhar Front"
                          className="zoom w-100"
                          style={{ height: 180, objectFit: 'cover', borderRadius: 8 }}
                        />
                      </Link>
                    </div>
                  )}
                  <br />
                  <label htmlFor="upload-aadhar" className="form-label">
                    Aadhar Back*
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="aadhar-back"
                    id="formFile"
                    accept="image/*"
                    onChange={(e) => handleDocumentFileChange('aadharBack', e.target.files?.[0] || null)}
                  />
                  {getDocumentImage('aadharBack') && (
                    <div className="mt-3">
                      <Link
                        href={getProxyUrl(getDocumentImage('aadharBack'))}
                        data-fancybox="gallery"
                      >
                        <img
                          src={getProxyUrl(getDocumentImage('aadharBack'))}
                          alt="Aadhar Back"
                          className="zoom w-100"
                          style={{ height: 180, objectFit: 'cover', borderRadius: 8 }}
                        />
                      </Link>
                    </div>
                  )}
                </div>
                <div className="col-md-4">
                  <label htmlFor="registration-copy" className="form-label">
                    Registration Copy (Optional)
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="registration-front"
                    id="formFile"
                    accept="image/*"
                    onChange={(e) => handleDocumentFileChange('registrationCopy', e.target.files?.[0] || null)}
                  />
                  {getDocumentImage('registrationCopy') && (
                    <div className="mt-3">
                      <Link
                        href={getProxyUrl(getDocumentImage('registrationCopy'))}
                        data-fancybox="gallery"
                      >
                        <img
                          src={getProxyUrl(getDocumentImage('registrationCopy'))}
                          alt="Registration Copy"
                          className="zoom w-100"
                          style={{ height: 180, objectFit: 'cover', borderRadius: 8 }}
                        />
                      </Link>
                    </div>
                  )}
                  <br />
                  <label htmlFor="registration-copy" className="form-label">
                    GST (Optional)
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="registration-back"
                    id="formFile"
                    accept="image/*"
                    onChange={(e) => handleDocumentFileChange('gst', e.target.files?.[0] || null)}
                  />
                  {getDocumentImage('gst') && (
                    <div className="mt-3">
                      <Link
                        href={getProxyUrl(getDocumentImage('gst'))}
                        data-fancybox="gallery"
                      >
                        <img
                          src={getProxyUrl(getDocumentImage('gst'))}
                          alt="GST Document"
                          className="zoom w-100"
                          style={{ height: 180, objectFit: 'cover', borderRadius: 8 }}
                        />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-12">
          {loading && (
            <p className="text-muted">Loading business profile data...</p>
          )}
          <p className="mt-3 mb-3">
            By clicking Update, your profile will be reviewed. Until approval,
            your old profile stays visible
          </p>
          <button type="submit" className="btn orange-btn">
            Update
          </button>
        </div>
      </div>
    </form>
  </div>
</>

  )
}

export default BusinessProfile