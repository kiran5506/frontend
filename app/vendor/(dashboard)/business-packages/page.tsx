"use client";

import Link from 'next/link';
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { businessPackageDelete, businessPackageListByVendor } from '@/services/business-package-api';
import { toast } from 'react-toastify';

const BusinessPackages = () => {
    const dispatch = useDispatch() as any;
    const { vendorAuth } = useSelector((state: any) => state);
    const { BusinessPackages: packages, loading } = useSelector((state: any) => state.businessPackage);
    const vendorId = vendorAuth?.vendorid;

    useEffect(() => {
        if (!vendorId) return;
        (dispatch as any)(businessPackageListByVendor(vendorId));
    }, [dispatch, vendorId]);

    const handleDelete = async (id: string) => {
        if (!id) return;
        const confirmed = window.confirm('Are you sure you want to delete this package?');
        if (!confirmed) return;
        try {
            const response = await (dispatch as any)(businessPackageDelete(id as any)).unwrap();
            if (response?.status) {
                toast.success('Package deleted successfully.');
            } else {
                toast.error(response?.message || 'Failed to delete package.');
            }
        } catch (error: any) {
            toast.error(error?.message || 'Something went wrong while deleting.');
        }
    };

    const hasPackages = useMemo(() => Array.isArray(packages) && packages.length > 0, [packages]);

    return (
        <>
            <div className="row mb-3 mb-md-0">
                <div className="col-12 col-md-8">
                    <h2 className="page-title">Business Packages</h2>
                </div>
                <div className="col-12 col-md-4">
                    <Link
                        href="/vendor/business-packages/create"
                        className="btn orange-btn btn-xs float-right"
                    >
                        Add New Package{" "}
                    </Link>
                </div>
            </div>
            <div className="row package-row">
                <div className="col-sm-12">
                    <div className="table-responsive">
                        <table className="responsive-table-new table table-bordered text-start wallet-table">
                            <thead>
                                <tr>
                                    <th className="minn">S.No</th>
                                    <th className="midd">EVENT NAME</th>
                                    <th className="largee">CITY</th>
                                    <th className="midd">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan={4} className="text-center">Loading packages...</td>
                                    </tr>
                                )}
                                {!loading && !hasPackages && (
                                    <tr>
                                        <td colSpan={4} className="text-center">No packages found.</td>
                                    </tr>
                                )}
                                {!loading && hasPackages && packages.map((pkg: any, index: number) => (
                                    <tr key={pkg._id || index}>
                                        <td className="minn">{index + 1}</td>
                                        <td className="midd">{pkg.event_id?.eventName || '—'}</td>
                                        <td className="largee">
                                            {pkg.cityPricing?.length ? (
                                                pkg.cityPricing.map((city: any, cityIndex: number) => (
                                                    <div key={`${pkg._id}-city-${cityIndex}`}>
                                                        {city.city} - ₹{city.offerPrice || 0} / ₹{city.marketPrice || 0}
                                                    </div>
                                                ))
                                            ) : (
                                                <span>—</span>
                                            )}
                                        </td>
                                        <td className="midd">
                                            <div className="d-flex gap-2 flex-wrap">
                                                <Link
                                                    href={`/vendor/business-packages/create?packageId=${pkg._id}`}
                                                    className="btn btn-primary py-2 px-2"
                                                    style={{
                                                        fontSize: 15,
                                                        paddingLeft: "10px !important",
                                                        paddingRight: "10px !important"
                                                    }}
                                                >
                                                    Edit
                                                    <img src="assets/img/btn-arrow.png" alt="" width={10} />
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => handleDelete(pkg._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>

    )
}

export default BusinessPackages