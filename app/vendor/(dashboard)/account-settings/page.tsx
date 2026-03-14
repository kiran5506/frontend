'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateVendorProfile, updateVendorPassword, viewVendorById } from '@/services/vendor-api';

const AccountSettings = () => {
  const dispatch = useDispatch() as any;
  const { vendorAuth } = useSelector((state: any) => state);
  const vendorid = vendorAuth?.vendorid;
  console.log('Vendor ID from Redux:', vendorAuth);

  // Profile validation schema
  const profileValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),
    mobile_number: Yup.string()
      .required('Mobile number is required')
      .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
    door_number: Yup.string()
      .required('Door number is required'),
    area: Yup.string(),
    landmark: Yup.string(),
    city: Yup.string()
      .required('City is required'),
    state: Yup.string()
      .required('State is required'),
    pincode: Yup.string()
      .required('Pincode is required')
      .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
  });

  // Password validation schema
  const passwordValidationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required('Current password is required'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });

  // Profile form
  const {
    register: profileRegister,
    handleSubmit: handleProfileFormSubmit,
    formState: { errors: profileErrors, isSubmitting: profileSubmitting },
    setValue: setProfileValue,
    reset: profileReset,
  } = useForm({
    resolver: yupResolver(profileValidationSchema),
  });

  // Password form
  const {
    register: passwordRegister,
    handleSubmit: handlePasswordFormSubmit,
    formState: { errors: passwordErrors, isSubmitting: passwordSubmitting },
    reset: passwordReset,
  } = useForm({
    resolver: yupResolver(passwordValidationSchema),
  });

  const [vendorInfo, setVendorInfo] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string>('/assets/img/profile-img.jpg');
  const [dataFetched, setDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  // Fetch vendor data on component mount or when vendorid changes
  useEffect(() => {
    if (vendorid && !dataFetched) {
      setIsLoading(true);
      console.log('Fetching vendor data for ID:', vendorid);
      (dispatch as any)(viewVendorById(vendorid))
        .then((response: any) => {
          console.log('Vendor data response:', response);
          if (response?.payload?.status && response?.payload?.data) {
            const data = response.payload.data;
            setVendorInfo(data);
            setDataFetched(true);
            
            // Set profile image - backend already includes full URL
            if (data.profile_image) {
              setProfileImage(data.profile_image);
            }

            // Pre-fill profile form
            setProfileValue('name', data.name || '');
            setProfileValue('email', data.email || '');
            setProfileValue('mobile_number', data.mobile_number || '');

            // Parse and set address fields
            if (data.address) {
              try {
                const parsedAddress = typeof data.address === 'string' 
                  ? JSON.parse(data.address) 
                  : data.address;
                setProfileValue('door_number', parsedAddress.door_number || '');
                setProfileValue('area', parsedAddress.area || '');
                setProfileValue('landmark', parsedAddress.landmark || '');
                setProfileValue('city', parsedAddress.city || '');
                setProfileValue('state', parsedAddress.state || '');
                setProfileValue('pincode', parsedAddress.pincode || '');
              } catch (e) {
                console.error('Error parsing address:', e);
              }
            }
            setIsLoading(false);
          } else {
            console.log('No data in response:', response);
            setDataFetched(true);
            setIsLoading(false);
          }
        })
        .catch((error: any) => {
          console.error('Error fetching vendor details:', error);
          toast.error('Failed to load vendor details');
          setDataFetched(true);
          setIsLoading(false);
        });
    } else if (!vendorid) {
      setIsLoading(false);
    }
  }, [vendorid, dispatch, setProfileValue, dataFetched]);

  // Handle profile form submission
  const onProfileSubmit = async (data: any) => {
    try {
      const addressData = {
        door_number: data.door_number,
        area: data.area,
        landmark: data.landmark,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
      };

      const profilePayload = {
        name: data.name,
        email: data.email,
        mobile_number: data.mobile_number,
        address: JSON.stringify(addressData),
      };

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', profilePayload.name);
      formData.append('email', profilePayload.email);
      formData.append('mobile_number', profilePayload.mobile_number);
      formData.append('address', profilePayload.address);
      
      // Add profile image if file is selected
      if (profileImageFile) {
        formData.append('profile_image', profileImageFile);
      }

      // @ts-ignore
      const response = await (dispatch as any)(
        updateVendorProfile({
          vendorId: vendorid,
          profileData: formData,
        } as any)
      ).unwrap();

      if (response?.status) {
        toast.success('Profile updated successfully!');
        setProfileImageFile(null); // Clear file input
        
        // Update local state with returned data
        if (response?.data) {
          const updatedData = response.data;
          setVendorInfo(updatedData);
          
          // Update profile image - backend already includes full URL
          if (updatedData.profile_image) {
            setProfileImage(updatedData.profile_image);
          }
          
          // Re-populate form fields with updated data
          setProfileValue('name', updatedData.name || '');
          setProfileValue('email', updatedData.email || '');
          setProfileValue('mobile_number', updatedData.mobile_number || '');
          
          if (updatedData.address) {
            try {
              const parsedAddress = typeof updatedData.address === 'string' 
                ? JSON.parse(updatedData.address) 
                : updatedData.address;
              setProfileValue('door_number', parsedAddress.door_number || '');
              setProfileValue('area', parsedAddress.area || '');
              setProfileValue('landmark', parsedAddress.landmark || '');
              setProfileValue('city', parsedAddress.city || '');
              setProfileValue('state', parsedAddress.state || '');
              setProfileValue('pincode', parsedAddress.pincode || '');
            } catch (e) {
              console.error('Error parsing address:', e);
            }
          }
        }
      } else {
        toast.error('Failed to update profile: ' + (response?.message || 'Unknown error'));
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Error: ' + (error?.message || 'An error occurred while updating profile'));
    }
  };

  // Handle password form submission
  const onPasswordSubmit = async (data: any) => {
    try {
      // @ts-ignore
      const response = await (dispatch as any)(
        updateVendorPassword({
          vendorId: vendorid,
          passwordData: {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
          },
        } as any)
      ).unwrap();

      if (response?.status) {
        toast.success('Password updated successfully!');
        passwordReset();
      } else {
        toast.error('Failed to update password: ' + (response?.message || 'Unknown error'));
      }
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast.error('Error: ' + (error?.message || 'An error occurred while updating password'));
    }
  };

  return (
    <>
      <h2 className="page-title">Account Settings</h2>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="ms-3">Loading vendor details...</p>
        </div>
      ) : (
        <>
      {/* Profile Update Form */}
      <div className="row mb-5">
        <div className="col-md-8">
          <div className="form-sec">
            <div className="mb-4">
              <img
                src={profileImage}
                alt="Profile"
                width="150px"
                height="150px"
                className="rounded-circle object-fit-cover"
              />
            </div>

            <h4 className="mb-4">Personal Information</h4>

            <form
              className="row g-3"
              role="form"
              id="profileForm"
              name="profileForm"
              onSubmit={handleProfileFormSubmit(onProfileSubmit)}
            >
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Name*
                </label>
                <input
                  type="text"
                  className={`form-control py-2 px-4 rounded-5 ${
                    profileErrors.name ? 'is-invalid' : ''
                  }`}
                  id="name"
                  placeholder="Enter your name"
                  {...profileRegister('name')}
                />
                {profileErrors.name && (
                  <p className="text-danger mt-1">{profileErrors.name.message}</p>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email ID*
                </label>
                <input
                  type="email"
                  className={`form-control py-2 px-4 rounded-5 ${
                    profileErrors.email ? 'is-invalid' : ''
                  }`}
                  id="email"
                  placeholder="Enter your email"
                  {...profileRegister('email')}
                />
                {profileErrors.email && (
                  <p className="text-danger mt-1">{profileErrors.email.message}</p>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="mobile_number" className="form-label">
                  Mobile Number*
                </label>
                <input
                  type="text"
                  className={`form-control py-2 px-4 rounded-5 ${
                    profileErrors.mobile_number ? 'is-invalid' : ''
                  }`}
                  id="mobile_number"
                  placeholder="Enter 10-digit mobile number"
                  {...profileRegister('mobile_number')}
                />
                {profileErrors.mobile_number && (
                  <p className="text-danger mt-1">{profileErrors.mobile_number.message}</p>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="profile_image" className="form-label">
                  Upload Profile Picture
                </label>
                <input
                  type="file"
                  className="form-control py-2 px-4 rounded-5"
                  id="profile_image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Validate file size (5MB)
                      if (file.size > 5 * 1024 * 1024) {
                        toast.error('File size must be less than 5MB');
                        return;
                      }
                      
                      setProfileImageFile(file);
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setProfileImage(event.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <small className="text-muted d-block mt-1">Supported formats: JPG, PNG, GIF (Max 5MB)</small>
              </div>
              <div className="col-12 mt-4">
                <h5 className="mb-3">Address</h5>
              </div>

              <div className="col-md-6">
                <label htmlFor="door_number" className="form-label">
                  Door Number or Flat Number*
                </label>
                <input
                  type="text"
                  className={`form-control py-2 px-4 rounded-5 ${
                    profileErrors.door_number ? 'is-invalid' : ''
                  }`}
                  id="door_number"
                  placeholder="Enter door number"
                  {...profileRegister('door_number')}
                />
                {profileErrors.door_number && (
                  <p className="text-danger mt-1">{profileErrors.door_number.message}</p>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="area" className="form-label">
                  Area
                </label>
                <input
                  type="text"
                  className="form-control py-2 px-4 rounded-5"
                  id="area"
                  placeholder="Enter area"
                  {...profileRegister('area')}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="landmark" className="form-label">
                  Landmark
                </label>
                <input
                  type="text"
                  className="form-control py-2 px-4 rounded-5"
                  id="landmark"
                  placeholder="Enter landmark"
                  {...profileRegister('landmark')}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="city" className="form-label">
                  City*
                </label>
                <input
                  type="text"
                  className={`form-control py-2 px-4 rounded-5 ${
                    profileErrors.city ? 'is-invalid' : ''
                  }`}
                  id="city"
                  placeholder="Enter city"
                  {...profileRegister('city')}
                />
                {profileErrors.city && (
                  <p className="text-danger mt-1">{profileErrors.city.message}</p>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="state" className="form-label">
                  State*
                </label>
                <input
                  type="text"
                  className={`form-control py-2 px-4 rounded-5 ${
                    profileErrors.state ? 'is-invalid' : ''
                  }`}
                  id="state"
                  placeholder="Enter state"
                  {...profileRegister('state')}
                />
                {profileErrors.state && (
                  <p className="text-danger mt-1">{profileErrors.state.message}</p>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="pincode" className="form-label">
                  Pincode*
                </label>
                <input
                  type="text"
                  className={`form-control py-2 px-4 rounded-5 ${
                    profileErrors.pincode ? 'is-invalid' : ''
                  }`}
                  id="pincode"
                  placeholder="Enter 6-digit pincode"
                  {...profileRegister('pincode')}
                />
                {profileErrors.pincode && (
                  <p className="text-danger mt-1">{profileErrors.pincode.message}</p>
                )}
              </div>

              <div className="col-12 text-left">
                <button
                  type="submit"
                  className="btn orange-btn rounded-5 px-4"
                  disabled={profileSubmitting}
                >
                  {profileSubmitting ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Password Change Form */}
      <div className="row">
        <div className="col-md-8">
          <div className="form-sec">
            <h4 className="mb-4">Change Password</h4>

            <form
              className="row g-3"
              role="form"
              id="passwordForm"
              name="passwordForm"
              onSubmit={handlePasswordFormSubmit(onPasswordSubmit)}
            >
              <div className="col-md-6">
                <label htmlFor="oldPassword" className="form-label">
                  Current Password*
                </label>
                <input
                  type="password"
                  className={`form-control py-2 px-4 rounded-5 ${
                    passwordErrors.oldPassword ? 'is-invalid' : ''
                  }`}
                  id="oldPassword"
                  placeholder="Enter current password"
                  {...passwordRegister('oldPassword')}
                />
                {passwordErrors.oldPassword && (
                  <p className="text-danger mt-1">{passwordErrors.oldPassword.message}</p>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="newPassword" className="form-label">
                  New Password*
                </label>
                <input
                  type="password"
                  className={`form-control py-2 px-4 rounded-5 ${
                    passwordErrors.newPassword ? 'is-invalid' : ''
                  }`}
                  id="newPassword"
                  placeholder="Enter new password"
                  {...passwordRegister('newPassword')}
                />
                {passwordErrors.newPassword && (
                  <p className="text-danger mt-1">{passwordErrors.newPassword.message}</p>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password*
                </label>
                <input
                  type="password"
                  className={`form-control py-2 px-4 rounded-5 ${
                    passwordErrors.confirmPassword ? 'is-invalid' : ''
                  }`}
                  id="confirmPassword"
                  placeholder="Re-enter new password"
                  {...passwordRegister('confirmPassword')}
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-danger mt-1">{passwordErrors.confirmPassword.message}</p>
                )}
              </div>

              <div className="col-12 text-left">
                <button
                  type="submit"
                  className="btn orange-btn rounded-5 px-4"
                  disabled={passwordSubmitting}
                >
                  {passwordSubmitting ? 'Updating...' : 'Change Password'}
                </button>
                <button
                  type="reset"
                  className="btn btn-secondary rounded-5 px-4 ms-2"
                  disabled={passwordSubmitting}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
        </>
      )}
    </>
  );
};

export default AccountSettings;