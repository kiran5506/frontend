import { viewVendorById } from '@/services/vendor-api';
import Image from 'next/image';
import Link from 'next/link'
import React, { use, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

interface ViewProps {
  id?: string; // optional because create & edit
}

const VendorViewPage = ({id}: ViewProps) => {
    const dispatch = useDispatch();
    const { currentVendor } = useSelector((state: any) => state.vendor);
    useEffect(() => {
        if(id) {
            (dispatch as any)(viewVendorById(id as any)).catch((error: any) => {
                console.error('Error fetching vendor:', error);
            });
        }
    }, [id])
  return (
    <div className="row">
        <div className="col-md-12">
            <div className="row">
            <div className="col-5 col-sm-3">
                <p className="mb-0">Vendor ID</p>
            </div>
            <div className="col-7 col-sm-9">
                <p className="mb-0">#{currentVendor?._id}</p>
            </div>
            </div>
            <hr />
            <div className="row">
            <div className="col-5 col-sm-3">
                <p className="mb-0">Vendor Name</p>
            </div>
            <div className="col-7 col-sm-9">
                <p className="mb-0">{currentVendor?.name}</p>
            </div>
            </div>
            <hr />
            <div className="row">
            <div className="col-5 col-sm-3">
                <p className="mb-0">Email</p>
            </div>
            <div className="col-7 col-sm-9">
                <p className="mb-0">{currentVendor?.email}</p>
            </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-5 col-sm-3">
                    <p className="mb-0">Mobile</p>
                </div>
                <div className="col-7 col-sm-9">
                    <p className="mb-0">+91 {currentVendor?.mobile_number}</p>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-5 col-sm-3">
                    <p className="mb-0">Is OTP Verified ?</p>
                </div>
                <div className="col-7 col-sm-9">
                    <p className="mb-0">{currentVendor?.is_otp_verified ? 'Yes' : 'No'}</p>
                </div>
            </div>
            <hr />

            <div className="row">
                <div className="col-5 col-sm-3">
                    <p className="mb-0">Is Profile Completed ?</p>
                </div>
                <div className="col-7 col-sm-9">
                    <p className="mb-0">{currentVendor?.is_profile_completed ? 'Yes' : 'No'}</p>
                </div>
            </div>
            <hr />

            <div className="row">
                <div className="col-5 col-sm-3">
                    <p className="mb-0">Status</p>
                </div>
                <div className="col-7 col-sm-9">
                    <p className="mb-0"><button className={`btn ${currentVendor?.isActive ? 'btn-success' : 'btn-danger'} btn-sm`}>{currentVendor?.isActive ? 'Active' : 'In-Active'}</button></p>
                </div>
            </div>
            <hr />

            {currentVendor?.address && (
            <div className="row">
            <div className="col-5 col-sm-3">
                <p className="mb-0">Address</p>
            </div>
            <div className="col-7 col-sm-9">
                <p className="mb-0"> {currentVendor?.address}, {currentVendor?.city}, {currentVendor?.state} - {currentVendor?.zipCode}</p>
            </div>
            </div>
            )}
            <h5 className="mt-5 mb-3">Businesses Info</h5>
            <div className="row">
            <div className="col-12 col-sm-12">
                <div className="card info-card sales-card">
                    <div className="card-body pt-3">
                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <Image src="/assets/admin/img/business_pic.png" width={80} height={80} alt=''/>
                            </div>
                        <div className="ps-3">
                            <h5>Business Name Here </h5>
                            <Link
                            href="https://bsfye.com/"
                            className="btn btn-primary btn-sm"
                            target="_blank"
                            >
                            View Details
                            </Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <button className={`btn ${currentVendor?.isActive ? 'btn-danger' : 'btn-success'} btn-sm`} type='button' > {currentVendor?.isActive ? 'In-Active' : 'Active'} </button>
        </div>
    </div>
  )
}

export default VendorViewPage
