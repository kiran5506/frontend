"use client";

import WithLayout from '@/hoc/WithLayout';
import React from 'react'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from '@/services/endpoints';

type FormValues = {
  name: string;
  mobile: string;
  email: string;
  message: string;
};

const contactSchema = yup.object({
  name: yup.string().required('Name is required'),
  mobile: yup.string().required('Mobile is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  message: yup.string().required('Message is required').min(5),
}).required();

const ContactUs = () => {
    const siteSettings = useSelector((state: any) => state?.siteSettings?.siteSettings);

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
        resolver: yupResolver(contactSchema),
        defaultValues: {
            name: '',
            mobile: '',
            email: '',
            message: ''
        }
    });

    async function onSubmit(data: FormValues) {
      try {
        // baseURL ends with /api/ per services/endpoints.js
        const url = `${baseURL}public/contact`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const payload = await res.json();
        if (res.ok && payload?.ok) {
          toast.success('Message sent. We will get back to you soon.');
          reset();
        } else {
          throw new Error(payload?.message || payload?.error || 'Failed to send message');
        }
      } catch (err: any) {
        console.error(err);
        toast.error(err?.message || 'Something went wrong');
      }
    }
    
  return (
    <section className="contact-section py-5">
        <div className="container">
            <div className="row d-flex justify-content-center pb-5">
            <div className="col-md-9">
                <div className="row">
                <div className="col-md-6">
                    <div className="item text-center">
                    <img src="/images/icons/location-icon.png" alt="" />
                    <h4>Address</h4>
                    <p>
                        {siteSettings?.address}
                    </p>
                    </div>
                    <div className="item text-center">
                    <img src="/images/icons/email-icon.png" alt="" />
                    <h4>Email Address</h4>
                    <p>{siteSettings?.email}</p>
                    </div>
                    <div className="item text-center">
                    <img src="/images/icons/call-icon.png" alt="" />
                    <h4>Phone Number</h4>
                    <p>{siteSettings?.mobile_number}</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-sec">
                    <h3>Enquiry Now</h3>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-3">
                        <label className="form-label">Name*</label>
                        <input
                            type="text"
                            className={`form-control py-2 px-4 rounded-5 ${errors.name ? 'is-invalid' : ''}`}
                            placeholder="Enter Your Name"
                            {...register('name')}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                        </div>
                        <div className="mb-3">
                        <label className="form-label">Mobile*</label>
                        <input
                            type="text"
                            className={`form-control py-2 px-4 rounded-5 ${errors.mobile ? 'is-invalid' : ''}`}
                            placeholder="Enter Mobile Number"
                            {...register('mobile')}
                        />
                        {errors.mobile && <div className="invalid-feedback">{errors.mobile.message}</div>}
                        </div>
                        <div className="mb-3">
                        <label className="form-label">Email*</label>
                        <input
                            type="email"
                            className={`form-control py-2 px-4 rounded-5 ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Enter Your Email ID"
                            {...register('email')}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>
                        <div className="mb-3">
                        <label className="form-label">Message*</label>
                        <textarea
                            className={`form-control py-2 px-4 rounded-5 ${errors.message ? 'is-invalid' : ''}`}
                            placeholder="Message"
                            rows={7}
                            {...register('message')}
                        />
                        {errors.message && <div className="invalid-feedback">{errors.message.message}</div>}
                        </div>
                        <button
                        type="submit"
                        className="btn btn-secondary rounded-5 px-4"
                        disabled={isSubmitting}
                        >
                        {isSubmitting ? 'Sending...' : 'Submit'}
                        </button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <ToastContainer />
    </section>
  )
}

export default WithLayout(ContactUs, 'frontend');
