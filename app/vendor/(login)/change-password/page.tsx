"use client";
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { resetVendorPassword } from '@/services/vendor-api';

type ChangePasswordFormValues = {
    password: string;
    confirmPassword: string;
};

type ResetPasswordResponse = {
    status?: boolean;
    message?: string;
};

const ChangePassword = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const vendorId = searchParams?.get('vendorId') || searchParams?.get('vendor_id') || '';
    const flowType = (searchParams?.get('type') || '').toLowerCase();
    const [loading, setLoading] = React.useState(false);

    const loginSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ChangePasswordFormValues>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    });

    useEffect(() => {
        if (!vendorId || flowType !== 'forgot') {
            toast.error('Invalid password reset link. Please try forgot password again.');
            router.push('/vendor/forgot-password');
        }
    }, [vendorId, flowType, router]);

    const onSubmit = async (data: ChangePasswordFormValues) => {
        setLoading(true);
        try {
            const resetVendorPasswordThunk = resetVendorPassword as unknown as (payload: {
                vendor_id: string;
                new_password: string;
                confirm_password: string;
            }) => unknown;

            const dispatchAction = dispatch as unknown as (action: unknown) => Promise<{ payload?: ResetPasswordResponse }>;
            const action = await dispatchAction(resetVendorPasswordThunk({
                vendor_id: vendorId,
                new_password: data.password,
                confirm_password: data.confirmPassword
            }));
            const result = action?.payload;

            if (result?.status) {
                toast.success('Password changed successfully! Please login.');
                router.push('/vendor/login');
            } else {
                toast.error(result?.message || 'Unable to reset password');
            }
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : 'Unable to reset password');
        } finally {
            setLoading(false);
        }
    };

  return (
    <section className="register-section py-5 d-flex align-items-center">
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
                        <h3 className="secondary-color text-center">Change Password</h3>
                        <p className="text-center">You can change your password here.</p>
                        <form className="mt-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-3 mt-4">
                            <label className="form-label">Password*</label>
                            <input
                            type="password"
                            className="form-control py-2 px-4 rounded-5"
                            placeholder="Enter New Password"
                            {...register("password")}
                            disabled={loading}
                            />
                            {errors.password && (
                                <span className="error text-danger">{errors.password.message}</span>
                            )}
                        </div>
                        <div className="mb-3 mt-4">
                            <label className="form-label">Confirm Password*</label>
                            <input
                            type="password"
                            className="form-control py-2 px-4 rounded-5"
                            placeholder="Enter Confirm Password"
                            {...register("confirmPassword")}
                            disabled={loading}
                            />
                            {errors.confirmPassword && (
                                <span className="error text-danger">{errors.confirmPassword.message}</span>
                            )}
                        </div>
                        <div className="row d-flex align-items-center">
                            <div className="col-md-12">
                            <button
                                type="submit"
                                className="btn btn-secondary rounded-5 px-4"
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Change Password'}
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
  );
}

export default ChangePassword;
