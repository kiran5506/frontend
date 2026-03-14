'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { updateCustomer } from '@/services/customer-api';
import { setCustomerAuthState } from '@/redux/features/customer-auth-slice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Image from 'next/image';

const CustomerProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, details } = useSelector((state: any) => state.customerAuth);
  
  // Parse customer details
  const customerDetails = details ? JSON.parse(details) : null;

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to access your profile');
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Validation schema
  const profileSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    mobile_number: Yup.string()
      .required('Mobile number is required')
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: customerDetails?.name || '',
      mobile_number: customerDetails?.mobile_number || '',
      email: customerDetails?.email || '',
    }
  });

  // Reset form to original values
  const handleReset = () => {
    reset({
      name: customerDetails?.name || '',
      mobile_number: customerDetails?.mobile_number || '',
      email: customerDetails?.email || '',
    });
  };

  // Submit handler
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // @ts-ignore - Redux thunk type issue
      const result = await dispatch(updateCustomer({ 
        id: customerDetails._id, 
        customerData: data 
      })).unwrap();
      
      if (result.status) {
        toast.success('Profile updated successfully!');
        
        // Update localStorage and Redux with new details
        const updatedCustomer = result.data; // Backend returns data directly, not data.customer
        
        if (typeof window !== 'undefined') {
          const currentToken = localStorage.getItem('cToken');
          localStorage.setItem('customerDetails', JSON.stringify(updatedCustomer));
          
          // Update Redux state using the action creator
          dispatch(setCustomerAuthState({
            isAuthenticated: true,
            token: currentToken,
            details: updatedCustomer
          }));
        }
        
        // Reset form with new values
        reset({
          name: updatedCustomer.name,
          mobile_number: updatedCustomer.mobile_number,
          email: updatedCustomer.email,
        });
      } else {
        toast.error(result?.message || 'Failed to update profile');
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast.error(error?.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!customerDetails) {
    return <div className="content"><div className="pad">Loading...</div></div>;
  }

  return (
    <div className="content">
      <div className="pad">
        <h3 className="text-start text-theme mb-3">My Profile</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="row">
            <div className="col-sm-6">
              <div className="mb-3">
                <label className="form-label">Name*</label>
                <input
                  type="text"
                  className="form-control py-2 px-4 rounded-5"
                  placeholder="Enter Your Name"
                  {...register('name')}
                  disabled={loading}
                />
                {errors.name && (
                  <span className="error text-danger">{errors.name.message as string}</span>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number*</label>
                <input
                  type="text"
                  className="form-control py-2 px-4 rounded-5"
                  placeholder="Enter Mobile Number"
                  {...register('mobile_number')}
                  disabled={loading}
                  maxLength={10}
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^0-9]/g, '');
                  }}
                />
                {errors.mobile_number && (
                  <span className="error text-danger">{errors.mobile_number.message as string}</span>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Email*</label>
                <input
                  type="email"
                  className="form-control py-2 px-4 rounded-5"
                  placeholder="Enter Your Email ID"
                  {...register('email')}
                  disabled={loading}
                />
                {errors.email && (
                  <span className="error text-danger">{errors.email.message as string}</span>
                )}
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="mb-3 col-md-6">
              <button 
                type="submit" 
                className="btn btn-secondary py-2 px-4 me-2"
                disabled={loading || !isDirty}
              >
                {loading ? 'Updating...' : 'Update'}{' '}
                <Image src="/images/icons/btn-arrow.png" alt="" width={10} height={10} />
              </button>
              <button 
                type="button" 
                className="btn btn-outline-secondary py-2 px-4"
                onClick={handleReset}
                disabled={loading || !isDirty}
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

export default CustomerProfile
