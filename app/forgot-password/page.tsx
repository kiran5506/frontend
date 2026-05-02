"use client"
import WithLayout from '@/hoc/WithLayout'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { forgotPasswordRequest } from '@/services/customer-api';

type ForgotPasswordFormValues = {
    email: string;
};

const ForgotPassword = () => {
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
            const result = await forgotPasswordRequest(data.email);
            if (result?.status) {
                toast.success('OTP sent successfully. Please verify OTP.');
                const customerId = result?.data?.customer_id;
                const mobile = result?.data?.mobile_number || '';
                const email = data?.email || '';
                router.push(`/verify-otp?customerId=${customerId}&mobile=${mobile}&email=${encodeURIComponent(email)}&type=forgot`);
            } else {
                toast.error(result?.message || 'Unable to process forgot password request');
            }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : 'Unable to process forgot password request';
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
                        <h3>Forgot Password</h3>
                        <p className="text-center">You can reset your password here.</p>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-3 mt-4">
                            <label className="form-label">Email Address*</label>
                            <input
                            type="email"
                            className="form-control py-2 px-4 rounded-5"
                            placeholder="Enter Your Email ID"
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
            </div>
            </div>
        </div>
        </section>

  )
}

export default WithLayout(ForgotPassword, 'frontend')
