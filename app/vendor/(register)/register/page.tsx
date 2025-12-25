"use client";
import Link from 'next/link'
import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { vendorRegister } from '@/services/vendor-api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { generateToken } from '@/services/generate-api';
import { flushToken } from '@/redux/features/generate-slice';

const Register = () => {
    const dispatch = useDispatch();
    const router = useRouter();

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
            .required('Confirm Password is required'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const onSubmit =  async (data: any) => {
        try{
            await (dispatch as any)(generateToken()).unwrap();
            if (!localStorage.getItem('genToken')) {
                throw new Error('Token generation failed');
            }
            try {
                // dispatch the async thunk and unwrap to get payload or throw on rejection
                const result = await (dispatch as any)(vendorRegister(data)).unwrap();
                if (result?.status) {
                    dispatch(flushToken());
                    toast.success('Registration successful!');
                    setTimeout(() => {
                        router.push('/vendor/login');
                    }, 500);
                } else {
                    toast.error('Registration failed: ' + (result?.message || 'Unknown error'));
                }
            } catch (error: any) {
                console.log('Registration error:', error);
                // If unwrap threw, error may be a string or object
                const msg = error?.message || error || 'An error occurred during registration. Please try again later.';
                toast.error(msg);
            }
        }
        catch (error) {
            console.error('Error generating token:', error);
            toast.error('Failed to generate token. Please try again.');
            return;
        }    
    }



  return (
    <section className="register-section py-5 d-flex align-items-center">
        <div className="form-sec container-fluid">
            <div className="row g-0 d-flex align-items-center">
            <div className="col-md-7 bg">
                <h2>
                Register <span className="title_01">India's</span>
                <br />
                Leading <span className="title_02">Service</span>
                <br />
                <span className="title_03">Booking</span>
                <br />
                Platform and <span className="title_04">Grow</span> <br />
                your <span className="title_05">Business</span> <br />
                Today.
                </h2>
            </div>
            <div className="col-md-4">
                <div className="content">
                <Link href="index.php">
                    <img
                    src="/assets/vendor/images/common/logo.png"
                    alt="logo"
                    className="pb-4"
                    style={{ width: 140 }}
                    />
                </Link>
                <h3 className="secondary-color" style={{ fontSize: 20 }}>
                    Vendor Registration
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-3">
                    <label className="form-label">Your Name*</label>
                    <input
                        type="text"
                        className="form-control py-2 px-4 rounded-5"
                        placeholder="Enter Your Name"
                        {...register("name")}
                    />
                    {errors.name && (
                        <span className="error">{errors.name.message}</span>
                    )}
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Mobile*</label>
                    <input
                        type="text"
                        className="form-control py-2 px-4 rounded-5"
                        placeholder="Enter Mobile Number"
                        {...register("mobile_number")}
                        maxLength={10}
                        onInput={(e) => {
                            const input = e.target as HTMLInputElement;
                            input.value = input.value.replace(/[^0-9]/g, '');
                        }}
                    />
                    {errors.mobile_number && (
                        <span className="error">{errors.mobile_number.message}</span>
                    )}
                    </div>

                    <div className="mb-3">
                    <label className="form-label">Email*</label>
                    <input
                        type="text"
                        className="form-control py-2 px-4 rounded-5"
                        placeholder="Enter Your Email ID"
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
                    <div className="mb-3">
                    <label className="form-label">Re-enter Password*</label>
                    <input
                        type="password"
                        className="form-control py-2 px-4 rounded-5"
                        placeholder="******"
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                        <span className="error">{errors.confirmPassword.message}</span>
                    )}
                    </div>
                    <div className="form-check pb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="acceptTerms"
                        {...register("acceptTerms")}
                    />
                    
                    <label className="form-check-label" htmlFor="check1">
                        I Accept <Link href={'/vendor/terms-and-conditions'}>Terms and Conditions</Link>
                    </label>
                    {errors.acceptTerms && (
                        <span className="error">{errors.acceptTerms.message}</span>
                    )}
                    </div>
                    <button type="submit" className="btn btn-secondary rounded-5 px-4" > Register </button>
                </form>
                <p className="py-3">
                    Already have an account? <Link href={'/vendor/login'}>Login</Link>
                </p>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Register
