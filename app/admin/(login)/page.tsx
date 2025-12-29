"use client";
import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/dist/client/components/navigation';
import { generateToken } from '@/services/generate-api';
import { adminLogin } from '@/services/admin-api';
import { flushToken } from '@/redux/features/generate-slice';

const AdminLoginPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

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

            try {
                const result = await (dispatch as any)(adminLogin(data)).unwrap();
                if (result?.status) {
                    dispatch(flushToken());
                    toast.success('Login successful!');
                    setTimeout(() => {
                        router.push('/admin/dashboard');
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
    <main>
        <div className="container">
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                    <div className="d-flex justify-content-center py-4">
                    <a href="#" className="logo d-flex align-items-center w-auto">
                        <img
                        src="/assets/admin/img/logo.png"
                        alt=""
                        style={{ maxHeight: 70 }}
                        />
                        {/* <span class="d-none d-lg-block">NiceAdmin</span> */}
                    </a>
                    </div>
                    {/* End Logo */}
                    <div className="card mb-3">
                    <div className="card-body">
                        <div className="pt-4 pb-2">
                            <h5 className="card-title text-center pb-0 fs-4">Login</h5>
                        </div>
                        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-12">
                                <label htmlFor="yourUsername" className="form-label">
                                Username
                                </label>
                                <div className="input-group has-validation">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="yourUsername"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <span className="error">{errors.email.message}</span>
                                )}
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="yourPassword" className="form-label">
                                Password
                                </label>
                                <input
                                type="password"
                                className="form-control"
                                id="yourPassword"
                                {...register("password")}
                                />
                                {errors.password && (
                                    <span className="error">{errors.password.message}</span>
                                )}
                            </div>
                            <div className="col-12">
                                <button
                                className="btn btn-primary w-100"
                                type="submit"
                                >  Login </button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </div>
        </main>

  )
}

export default AdminLoginPage
