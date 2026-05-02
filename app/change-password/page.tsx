"use client"
import WithLayout from '@/hoc/WithLayout'
import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { resetPasswordRequest } from '@/services/customer-api';

type ChangePasswordFormValues = {
    password: string;
    confirmPassword: string;
};

const ChangePassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const customerId = searchParams?.get('customerId') || '';
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
        if (!customerId || flowType !== 'forgot') {
            toast.error('Invalid password reset link. Please try forgot password again.');
            router.push('/forgot-password');
        }
    }, [customerId, flowType, router]);

    const onSubmit = async (data: ChangePasswordFormValues) => {
        setLoading(true);
        try {
            const result = await resetPasswordRequest({
                customer_id: customerId,
                new_password: data.password,
                confirm_password: data.confirmPassword
            });

            if (result?.status) {
                toast.success('Password changed successfully! Please login.');
                router.push('/login');
            } else {
                toast.error(result?.message || 'Unable to reset password');
            }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : 'Unable to reset password';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

  return (
    <section className="register-section py-5">
        <div className="container">
            <div className="row d-flex justify-content-center">
            <div className="col-md-9">
                <div className="form-sec">
                <div className="row">
                    <div className="col-md-6">
                    <div className="bg">
                        <div className="d-flex align-items-center">
                        <h2>India&apos;s Best Service Booking Platform</h2>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="content">
                        <h3>Change Password</h3>
                        <p className="text-center">You can change your password here.</p>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-3 mt-4">
                            <label className="form-label">Password*</label>
                            <input
                            type="password"
                            className="form-control py-2 px-4 rounded-5"
                            placeholder="Enter Your Password"
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
                            placeholder="Enter Your Confirm Password"
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
            </div>
            </div>
        </div>
        </section>

  )
}

export default WithLayout(ChangePassword, 'frontend')
