'use client';
import WithLayout from '@/hoc/WithLayout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { customerLogin } from '@/services/customer-api';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { flushToken } from '@/redux/features/generate-slice';

const CustomerLogin = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, isAuthenticated } = useSelector((state: any) => state.customerAuth);

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    const onSubmit = async (data: any) => {
        try {
            // @ts-ignore - Redux thunk type issue
            const result = await dispatch(customerLogin(data)).unwrap();
            if (result.status) {
                dispatch(flushToken());
                toast.success('Login successful!');
                router.push('/');
            } else {
                toast.error('Login failed: ' + (result?.message || 'Unknown error'));
            }
        } catch (error: any) {
            console.log('Login error:', error);
            const msg = error?.message || error || 'An error occurred during login. Please try again.';
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
                                        <h3>Login</h3>

                                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                            <div className="mb-3">
                                                <label className="form-label">Email*</label>
                                                <input
                                                    type="email"
                                                    className="form-control py-2 px-4 rounded-5"
                                                    placeholder="Enter Email Id"
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
                                            <div className="row d-flex align-items-center">
                                                <div className="col-md-12">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-secondary rounded-5 px-4"
                                                        disabled={loading}
                                                    >
                                                        {loading ? 'Logging in...' : 'Login'}
                                                    </button>
                                                    <a
                                                        href="/forgot-password"
                                                        className="float-end text-black mt-2"
                                                    >
                                                        Forgot Password?
                                                    </a>
                                                </div>
                                            </div>
                                        </form>
                                        <p className="py-3 text-center text-md-start">
                                            Don't have an account?{" "}
                                            <a href="/register">Register Here</a>
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

export default WithLayout(CustomerLogin, 'frontend')
