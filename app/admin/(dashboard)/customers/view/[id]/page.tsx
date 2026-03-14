"use client";
import React, { useMemo, useEffect } from 'react'
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { viewCustomerById } from '@/services/customer-api';
import { useRouter } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';

const CustomerView = () => {
    const params = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const router = useRouter();
    const title = "Customer Details";

    const { currentCustomer } = useSelector((state: any) => state.customer);

    useEffect(() => {
        if (params?.id) {
            dispatch((viewCustomerById as any)(params.id));
        }
    }, [params?.id, dispatch]);

    const customerData = useMemo(() => {
        if (currentCustomer && params?.id) {
            return currentCustomer.data || currentCustomer;
        }
        return null;
    }, [currentCustomer, params?.id]);

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                Customer Details
                                <button 
                                    onClick={() => router.back()}
                                    className="btn btn-success btn-sm" 
                                    style={{ float: 'right' }}
                                >
                                    <BsArrowLeft /> Back
                                </button>
                            </h5>

                            {customerData ? (
                                <div className="row">
                                    <div className="col-md-12">
                                        {/* Name */}
                                        <div className="row">
                                            <div className="col-5 col-sm-4">
                                                <p className="mb-0"><strong>Name</strong></p>
                                            </div>
                                            <div className="col-7 col-sm-8">
                                                <p className="mb-0">{customerData.name || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <hr />

                                        {/* Email */}
                                        <div className="row">
                                            <div className="col-5 col-sm-4">
                                                <p className="mb-0"><strong>Email</strong></p>
                                            </div>
                                            <div className="col-7 col-sm-8">
                                                <p className="mb-0">{customerData.email || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <hr />

                                        {/* Mobile Number */}
                                        <div className="row">
                                            <div className="col-5 col-sm-4">
                                                <p className="mb-0"><strong>Mobile</strong></p>
                                            </div>
                                            <div className="col-7 col-sm-8">
                                                <p className="mb-0">{customerData.mobile_number || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <hr />

                                        {/* Type */}
                                        <div className="row">
                                            <div className="col-5 col-sm-4">
                                                <p className="mb-0"><strong>Type</strong></p>
                                            </div>
                                            <div className="col-7 col-sm-8">
                                                <p className="mb-0">
                                                    {customerData.type 
                                                        ? customerData.type.charAt(0).toUpperCase() + customerData.type.slice(1) 
                                                        : 'Direct'
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <hr />

                                        {/* Status */}
                                        <div className="row">
                                            <div className="col-5 col-sm-4">
                                                <p className="mb-0"><strong>Status</strong></p>
                                            </div>
                                            <div className="col-7 col-sm-8">
                                                <p className="mb-0">
                                                    <span className={`badge ${customerData.isActive ? 'bg-success' : 'bg-danger'}`}>
                                                        {customerData.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <hr />

                                        {/* OTP Verified */}
                                        <div className="row">
                                            <div className="col-5 col-sm-4">
                                                <p className="mb-0"><strong>OTP Verified</strong></p>
                                            </div>
                                            <div className="col-7 col-sm-8">
                                                <p className="mb-0">
                                                    <span className={`badge ${customerData.is_otp_verified ? 'bg-success' : 'bg-warning'}`}>
                                                        {customerData.is_otp_verified ? 'Verified' : 'Not Verified'}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <hr />

                                        {/* Created Date */}
                                        <div className="row">
                                            <div className="col-5 col-sm-4">
                                                <p className="mb-0"><strong>Created Date</strong></p>
                                            </div>
                                            <div className="col-7 col-sm-8">
                                                <p className="mb-0">
                                                    {customerData.createdAt 
                                                        ? new Date(customerData.createdAt).toLocaleDateString() 
                                                        : 'N/A'
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>Loading customer details...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CustomerView
