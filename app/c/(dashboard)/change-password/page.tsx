'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { changePassword } from '@/services/customer-api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Image from 'next/image';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, details } = useSelector((state: any) => state.customerAuth);
  
  // Parse customer details
  const customerDetails = details ? JSON.parse(details) : null;

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to access this page');
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Validation schema
  const changePasswordSchema = Yup.object().shape({
    old_password: Yup.string()
      .required('Old password is required')
      .min(6, 'Password must be at least 6 characters'),
    new_password: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters')
      .notOneOf([Yup.ref('old_password')], 'New password must be different from old password'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('new_password')], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_password: '',
    }
  });

  // Submit handler
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // @ts-ignore - Redux thunk type issue
      const result = await dispatch(changePassword({ 
        customer_id: customerDetails._id,
        ...data
      })).unwrap();
      
      if (result.status) {
        toast.success('Password changed successfully!');
        reset(); // Clear the form
      } else {
        toast.error(result?.message || 'Failed to change password');
      }
    } catch (error: any) {
      console.error('Change password error:', error);
      toast.error(error?.message || 'Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset form handler
  const handleReset = () => {
    reset();
  };

  if (!customerDetails) {
    return <div className="content"><div className="pad">Loading...</div></div>;
  }

  return (
    <div className="content">
        <div className="pad">
            <div className="row align-items-center d-flex mb-2">
            <div className="col-md-12">
                <h3 className="text-start text-theme mb-3">Change Password</h3>
            </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="row">
                <div className="mb-3 col-md-6">
                <div className="mb-3">
                    <label className="form-label">Old Password*</label>
                    <input
                      type="password"
                      className="form-control py-2 px-4 rounded-5"
                      placeholder="Enter Old Password"
                      {...register('old_password')}
                      disabled={loading}
                    />
                    {errors.old_password && (
                      <span className="error text-danger">{errors.old_password.message as string}</span>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">New Password*</label>
                    <input
                      type="password"
                      className="form-control py-2 px-4 rounded-5"
                      placeholder="Enter New Password"
                      {...register('new_password')}
                      disabled={loading}
                    />
                    {errors.new_password && (
                      <span className="error text-danger">{errors.new_password.message as string}</span>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password*</label>
                    <input
                      type="password"
                      className="form-control py-2 px-4 rounded-5"
                      placeholder="Confirm New Password"
                      {...register('confirm_password')}
                      disabled={loading}
                    />
                    {errors.confirm_password && (
                      <span className="error text-danger">{errors.confirm_password.message as string}</span>
                    )}
                </div>
                </div>
            </div>
            <div className="row ">
                <div className="mb-3 col-md-6">
                <button 
                  type="submit" 
                  className="btn btn-secondary py-2 px-4 me-2"
                  disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update'}{" "}
                    <Image src="/images/icons/btn-arrow.png" alt="" width={10} height={10} />
                </button>
                <button 
                  type="button"
                  className="btn btn-outline-secondary py-2 px-4"
                  onClick={handleReset}
                  disabled={loading}
                >
                    Reset
                </button>
                </div>
            </div>
            </form>
        </div>
    </div>

  )
}

export default ChangePassword
