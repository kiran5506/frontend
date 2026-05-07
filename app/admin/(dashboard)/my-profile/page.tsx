"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {
  changeAdminPassword,
  getAdminProfile,
  updateAdminProfile,
} from '@/services/admin-api';
import { updateAdminDetails } from '@/redux/features/admin-auth-slice';

type ProfileFormData = {
  first_name: string;
  last_name?: string;
  mobile_number: string;
  email: string;
  profile_image?: string;
};

type PasswordFormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ApiResponse<T> = {
  status?: boolean;
  message?: string;
  data?: T;
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) return error.message;
  return fallback;
};

const profileSchema = Yup.object().shape({
  first_name: Yup.string().trim().required('First name is required'),
  last_name: Yup.string().trim().optional(),
  mobile_number: Yup.string().trim().required('Mobile number is required'),
  email: Yup.string().trim().email('Invalid email').required('Email is required'),
});

const passwordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Confirm password must match new password')
    .required('Confirm password is required'),
});

const MyProfilePage = () => {
  const dispatch = useDispatch();
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState('');

  const {
    register: registerProfile,
    handleSubmit: submitProfile,
    formState: { errors: profileErrors },
    setValue,
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: submitPassword,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const fetchAdminProfile = useCallback(async () => {
    try {
      setLoadingProfile(true);
      const action = await dispatch(getAdminProfile() as never);
      const response = (action as { payload?: ApiResponse<ProfileFormData> }).payload;

      if (response?.status && response?.data) {
        setValue('first_name', response.data.first_name || '');
        setValue('last_name', response.data.last_name || '');
        setValue('mobile_number', response.data.mobile_number || '');
        setValue('email', response.data.email || '');
        setProfileImagePreview(response.data.profile_image || '');
        setProfileImageFile(null);
      } else {
        toast.error(response?.message || 'Failed to fetch profile details');
      }
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, 'Error while fetching profile details'));
    } finally {
      setLoadingProfile(false);
    }
  }, [dispatch, setValue]);

  useEffect(() => {
    fetchAdminProfile();
  }, [fetchAdminProfile]);

  const onUpdateProfile = async (data: ProfileFormData) => {
    try {
      setSavingProfile(true);

      const formData = new FormData();
      formData.append('first_name', data.first_name);
  formData.append('last_name', data.last_name || '');
      formData.append('mobile_number', data.mobile_number);
      formData.append('email', data.email);
      if (profileImageFile) {
        formData.append('profile_image', profileImageFile);
      }

      const updateProfileThunk = updateAdminProfile as unknown as (payload: ProfileFormData) => unknown;
      const action = await dispatch(updateProfileThunk(formData as unknown as ProfileFormData) as never);
      const response = (action as { payload?: ApiResponse<ProfileFormData> }).payload;
      if (response?.status) {
        toast.success(response?.message || 'Profile updated successfully');
        if (response?.data) {
          dispatch(updateAdminDetails(response.data));
        }
        fetchAdminProfile();
      } else {
        toast.error(response?.message || 'Failed to update profile');
      }
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, 'Error while updating profile'));
    } finally {
      setSavingProfile(false);
    }
  };

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setProfileImageFile(file);

    if (file) {
      setProfileImagePreview(URL.createObjectURL(file));
      return;
    }
    setProfileImagePreview('');
  };

  const resolvedProfileImage = profileImagePreview
    ? (profileImagePreview.startsWith('blob:') || profileImagePreview.startsWith('http')
      ? profileImagePreview
      : `/api/image-proxy?url=${encodeURIComponent(profileImagePreview)}`)
    : '/assets/admin/img/profile-img.jpg';

  const onChangePassword = async (data: PasswordFormData) => {
    try {
      setSavingPassword(true);
      const changePasswordThunk = changeAdminPassword as unknown as (payload: PasswordFormData) => unknown;
      const action = await dispatch(changePasswordThunk(data) as never);
      const response = (action as { payload?: ApiResponse<null> }).payload;
      if (response?.status) {
        toast.success(response?.message || 'Password changed successfully');
        resetPasswordForm();
      } else {
        toast.error(response?.message || 'Failed to change password');
      }
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, 'Error while changing password'));
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <section className="section">
      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Update Profile</h5>
              <form className="row g-3" onSubmit={submitProfile(onUpdateProfile)}>
                <div className="col-12 d-flex align-items-center gap-3">
                  <img
                    src={resolvedProfileImage}
                    alt="Admin Profile"
                    className="rounded-circle"
                    style={{ width: 72, height: 72, objectFit: 'cover', border: '1px solid #ddd' }}
                  />
                  <div style={{ flex: 1 }}>
                    <label htmlFor="profile_image" className="form-label">Profile Image</label>
                    <input
                      type="file"
                      id="profile_image"
                      className="form-control"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      disabled={loadingProfile || savingProfile}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="first_name" className="form-label">First Name</label>
                  <input
                    type="text"
                    id="first_name"
                    className="form-control"
                    {...registerProfile('first_name')}
                    disabled={loadingProfile || savingProfile}
                  />
                  {profileErrors.first_name && <p className="text-danger mt-1">{profileErrors.first_name.message as string}</p>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="last_name" className="form-label">Last Name</label>
                  <input
                    type="text"
                    id="last_name"
                    className="form-control"
                    {...registerProfile('last_name')}
                    disabled={loadingProfile || savingProfile}
                  />
                  {profileErrors.last_name && <p className="text-danger mt-1">{profileErrors.last_name.message as string}</p>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="mobile_number" className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    id="mobile_number"
                    className="form-control"
                    {...registerProfile('mobile_number')}
                    disabled={loadingProfile || savingProfile}
                    maxLength={10}
                  />
                  {profileErrors.mobile_number && <p className="text-danger mt-1">{profileErrors.mobile_number.message as string}</p>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    {...registerProfile('email')}
                    disabled={loadingProfile || savingProfile}
                    readOnly
                  />
                  {profileErrors.email && <p className="text-danger mt-1">{profileErrors.email.message as string}</p>}
                </div>

                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-primary" disabled={loadingProfile || savingProfile}>
                    {savingProfile ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Change Password</h5>
              <form className="row g-3" onSubmit={submitPassword(onChangePassword)}>
                <div className="col-12">
                  <label htmlFor="oldPassword" className="form-label">Current Password</label>
                  <input
                    type="password"
                    id="oldPassword"
                    className="form-control"
                    {...registerPassword('oldPassword')}
                    disabled={savingPassword}
                  />
                  {passwordErrors.oldPassword && <p className="text-danger mt-1">{passwordErrors.oldPassword.message as string}</p>}
                </div>

                <div className="col-12">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    className="form-control"
                    {...registerPassword('newPassword')}
                    disabled={savingPassword}
                  />
                  {passwordErrors.newPassword && <p className="text-danger mt-1">{passwordErrors.newPassword.message as string}</p>}
                </div>

                <div className="col-12">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    {...registerPassword('confirmPassword')}
                    disabled={savingPassword}
                  />
                  {passwordErrors.confirmPassword && <p className="text-danger mt-1">{passwordErrors.confirmPassword.message as string}</p>}
                </div>

                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-warning" disabled={savingPassword}>
                    {savingPassword ? 'Changing...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfilePage;
