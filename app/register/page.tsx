'use client';
import WithLayout from '@/hoc/WithLayout'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { customerRegister } from '@/services/customer-api';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';

const CustomerRegister = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state: any) => state.customerAuth);

    const registerSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        mobile_number: Yup.string()
            .required('Mobile number is required')
            .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
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
    } = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            name: '',
            mobile_number: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (data: any) => {
        try {
            // Add type field to data
            const registerData = {
                ...data,
                type: 'direct'
            };

            // @ts-ignore - Redux thunk type issue
            const result = await dispatch(customerRegister(registerData)).unwrap();
            if (result.status) {
                toast.success('Registration successful! Please verify your OTP.');
                setTimeout(() => {
                    const customerId = result.data?.customer?._id;
                    const mobile = result.data?.customer?.mobile_number;
                    router.push(`/verify-otp?customerId=${customerId}&mobile=${mobile}`);
                }, 2000);
            } else {
                toast.error('Registration failed: ' + (result?.message || 'Unknown error'));
            }
        } catch (error: any) {
            console.log('Registration error:', error);
            const msg = error?.message || error || 'An error occurred during registration. Please try again.';
            toast.error(msg);
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
                                            <h2>India's Best Service Booking Platform</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="content">
                                        <h3>Register</h3>

                                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                            <div className="mb-3">
                                                <label className="form-label">Name*</label>
                                                <input
                                                    type="text"
                                                    className="form-control py-2 px-4 rounded-5"
                                                    placeholder="Enter Your Name"
                                                    {...register("name")}
                                                    disabled={loading}
                                                />
                                                {errors.name && (
                                                    <span className="error text-danger">{errors.name.message}</span>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Mobile*</label>
                                                <input
                                                    type="text"
                                                    className="form-control py-2 px-4 rounded-5"
                                                    placeholder="Enter Mobile Number"
                                                    {...register("mobile_number")}
                                                    disabled={loading}
                                                    maxLength={10}
                                                    onInput={(e) => {
                                                        const input = e.target as HTMLInputElement;
                                                        input.value = input.value.replace(/[^0-9]/g, '');
                                                    }}
                                                />
                                                {errors.mobile_number && (
                                                    <span className="error text-danger">{errors.mobile_number.message}</span>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Email*</label>
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
                                            <div className="mb-3">
                                                <label className="form-label">Password*</label>
                                                <input
                                                    type="password"
                                                    className="form-control py-2 px-4 rounded-5"
                                                    placeholder="******"
                                                    {...register("password")}
                                                    disabled={loading}
                                                />
                                                {errors.password && (
                                                    <span className="error text-danger">{errors.password.message}</span>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Confirm Password*</label>
                                                <input
                                                    type="password"
                                                    className="form-control py-2 px-4 rounded-5"
                                                    placeholder="******"
                                                    {...register("confirmPassword")}
                                                    disabled={loading}
                                                />
                                                {errors.confirmPassword && (
                                                    <span className="error text-danger">{errors.confirmPassword.message}</span>
                                                )}
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn btn-secondary rounded-5 px-4"
                                                disabled={loading}
                                            >
                                                {loading ? 'Registering...' : 'Register'}
                                            </button>
                                        </form>
                                        <p className="py-3">
                                            Already have an account? <a href="/login">Login</a>
                                        </p>
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

export default WithLayout(CustomerRegister, 'frontend')
