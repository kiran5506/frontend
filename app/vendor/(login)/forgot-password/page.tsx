"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { forgotVendorPassword } from '@/services/vendor-api';
import { useDispatch } from 'react-redux';

type ForgotPasswordFormValues = {
  email: string;
};

type ForgotPasswordResponse = {
    status?: boolean;
    message?: string;
    data?: {
        vendor_id?: string;
        mobile_number?: string;
    };
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const forgotPasswordSchema = Yup.object().shape({
      email: Yup.string()
          .required('Email is required')
          .email('Email is invalid')
  });

  const {
      register,
      handleSubmit,
      formState: { errors }
  } = useForm<ForgotPasswordFormValues>({
      resolver: yupResolver(forgotPasswordSchema),
      defaultValues: {
          email: ''
      }
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
      setLoading(true);
      try {
          const forgotVendorPasswordThunk = forgotVendorPassword as unknown as (payload: string) => unknown;
          const dispatchAction = dispatch as unknown as (action: unknown) => Promise<{ payload?: ForgotPasswordResponse }>;
          const action = await dispatchAction(forgotVendorPasswordThunk(data.email));
          const result = action?.payload;
          if (result?.status) {
              toast.success('OTP sent successfully. Please verify OTP.');
              const vendorId = result?.data?.vendor_id;
              const mobile = result?.data?.mobile_number || '';
              const email = data?.email || '';
              localStorage.setItem('vendorData', JSON.stringify({
                  _id: vendorId,
                  mobile_number: mobile,
                  email,
              }));
              router.push(`/vendor/otp-verification?vendorId=${vendorId}&mobile=${mobile}&email=${encodeURIComponent(email)}&type=forgot`);
          } else {
              toast.error(result?.message || 'Unable to process forgot password request');
          }
      } catch (error: unknown) {
          toast.error(error instanceof Error ? error.message : 'Unable to process forgot password request');
      } finally {
          setLoading(false);
      }
  };

  return (
    <section className="register-section py-5  d-flex align-items-center">
        <div className="container">
            <div className="row d-flex justify-content-center">
            <div className="col-md-5">
                <div className="form-sec">
                <div className="row">
                    <div className="col-md-12">
                    <div className="content">
                        <center>
                        <Image
                            src="/assets/vendor/images/common/logo.png"
                            alt="logo"
                            width={160}
                            height={56}
                            className="logo pb-4"
                            style={{ height: 'auto' }}
                        />
                        </center>
                        <h3 className="secondary-color text-center">Forgot Password</h3>
                        <p className="text-center">You can reset your password here.</p>
                        <form className="mt-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-3">
                            <label className="form-label">
                            Email Address*
                            </label>
                            <input
                            type="email"
                            className="form-control py-2 px-4 rounded-5"
                            placeholder="Enter Valid Email Id"
                            {...register("email")}
                            disabled={loading}
                            />
                            {errors.email && (
                                <span className="error text-danger">{errors.email.message}</span>
                            )}
                        </div>
                        <div className="row d-flex align-items-center">
                            <div className="col-md-12">
                            <button
                                type="submit"
                                className="btn btn-secondary rounded-5 px-4"
                                disabled={loading}
                            >
                                {loading ? 'Sending OTP...' : 'Reset Password'}
                            </button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
                <p className="text-center py-3 text-white">
                Copyrights 2024 Bsfye. All Rights Reserved.
                </p>
            </div>
            </div>
        </div>
    </section>
  )
}

export default ForgotPassword
