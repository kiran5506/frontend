"use client";
import Link from 'next/link'
import React, { useEffect } from 'react'

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/dist/client/components/navigation';
import { vendorLogin } from '@/services/vendor-api';
import { generateToken } from '@/services/generate-api';
import { flushToken } from '@/redux/features/generate-slice';

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    // keep selectors pure: don't log inside selector and guard against undefined
    const isAuthenticated = useSelector((state: any) => state?.vendorAuth?.isAuthenticated ?? false);
    // if you want to inspect the vendorAuth slice for debugging, use a separate selector and log in useEffect
    const vendorAuthState = useSelector((state: any) => state?.vendorAuth);
    useEffect(() => {
        console.log('vendorAuth -->', vendorAuthState);
    }, [vendorAuthState]);

    useEffect(() => {
        if (isAuthenticated) {
        router.push('/vendor/dashboard'); 
        }
    }, [isAuthenticated, router]);


    const loginSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is invalid'),
        password: Yup.string().required('Password is required')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit =  async (data: any) => {
        try{
            await (dispatch as any)(generateToken()).unwrap();
            if (!localStorage.getItem('genToken')) {
                throw new Error('Token generation failed');
            }
            // Handle login logic here
            console.log('Login data:', data);
            try {
                const result = await (dispatch as any)(vendorLogin(data)).unwrap();
                if (result?.status) {
                    dispatch(flushToken());
                    toast.success('Login successful!');
                    setTimeout(() => {
                        router.push('/vendor/dashboard');
                    }, 500);
                } else {
                    toast.error('Login failed: ' + (result?.message || 'Unknown error'));
                }
            } catch (error: any) {
                console.log('Login error:', error);
                const msg = error?.message || error || 'An error occurred during login. Please try again later.';
                toast.error(msg);
            }
        } catch (error) {
            console.error('Error generating token:', error);
        }

        
    }

  return (
    <section className="register-section py-5 d-flex align-items-center">
        <div className="container">
            <div className="row d-flex justify-content-center">
            <div className="col-md-5">
                <div className="form-sec">
                <div className="row">
                    <div className="col-md-12">
                    <div className="content">
                        <Link href={'/vendor'}>
                        <center>
                            <img
                            src="/assets/vendor/images/common/logo.png"
                            alt="logo"
                            className="pb-4"
                            />
                        </center>
                        </Link>
                        <h3 className="secondary-color text-center">Login</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">Email *</label>
                            <input
                            type="text"
                            className="form-control py-2 px-4 rounded-5"
                            placeholder="Enter Mobile or Email Id"
                            {...register("email")}
                        />
                        {errors.email && (
                            <span className="error">{errors.email.message}</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password*</label>
                        <input
                            type="password"
                            className="form-control py-2 px-4 rounded-5"
                            placeholder="******"
                            {...register("password")}
                        />
                        {errors.password && (
                            <span className="error">{errors.password.message}</span>
                        )}
                    </div>
                        <div className="row d-flex align-items-center">
                            <div className="col-md-12">
                            <button
                                type="submit"
                                className="btn btn-secondary rounded-5 px-4"
                            >
                                Login
                            </button>
                            <Link
                                href={'/vendor/forgot-password'}
                                className="float-end text-black mt-2"
                            >
                                Forgot Password?
                            </Link>
                            </div>
                        </div>
                        </form>
                        <p className="py-3 text-center text-md-start">
                        Don’t have an account?{" "}
                        <Link href={'/vendor/register'}>Register Here</Link>
                        </p>
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

export default Login
