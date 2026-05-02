import { approveOrRejectVendor, viewVendorById } from '@/services/vendor-api';
import { businessProfileByVendorId } from '@/services/business-profile-api';
import { baseURL } from '@/services/endpoints';
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface ViewProps {
  id?: string; // optional because create & edit
    showApprovalActions?: boolean;
}

const VendorViewPage = ({id, showApprovalActions = false}: ViewProps) => {
    const dispatch = useDispatch();
    const { currentVendor } = useSelector((state: any) => state.vendor);
        const { businessProfiles } = useSelector((state: any) => state.businessProfile);
    const resolveImageUrl = React.useCallback((url?: string) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        const apiBase = baseURL?.replace(/\/api\/?$/, '/');
        return `${apiBase}${url.replace(/^\/+/, '')}`;
    }, []);
    const formattedAddress = React.useMemo(() => {
        const address = currentVendor?.address;
        if (!address) return '';

        let parsed: any = address;
        if (typeof address === 'string') {
            try {
                parsed = JSON.parse(address);
            } catch (error) {
                parsed = { addressLine: address };
            }
        }

        const parts = [
            parsed?.door_number || parsed?.doorNumber || parsed?.addressLine,
            parsed?.area,
            parsed?.landmark,
            parsed?.city || currentVendor?.city,
            parsed?.state || currentVendor?.state,
            parsed?.pincode || parsed?.zipCode || currentVendor?.zipCode
        ].filter(Boolean);

        return parts.join(', ');
    }, [currentVendor]);
    const formattedBusinessAddress = React.useCallback((address: any) => {
        if (!address) return '';

        let parsed: any = address;
        if (typeof address === 'string') {
            try {
                parsed = JSON.parse(address);
            } catch (error) {
                parsed = { addressLine: address };
            }
        }

        const rawCity = parsed?.city;
        const cityText = typeof rawCity === 'object'
            ? (rawCity?.cityName || rawCity?.name || '')
            : (/^[a-f\d]{24}$/i.test(String(rawCity || '').trim())
                ? (parsed?.cityName || parsed?.city_name || '')
                : (rawCity || parsed?.cityName || parsed?.city_name || ''));

        const parts = [
            parsed?.door_number || parsed?.doorNumber || parsed?.addressLine,
            parsed?.area,
            parsed?.landmark,
            cityText,
            parsed?.state,
            parsed?.pincode || parsed?.zipCode
        ].filter(Boolean);

        return parts.join(', ');
    }, []);
    useEffect(() => {
        if(id) {
            (dispatch as any)(viewVendorById(id as any)).catch((error: any) => {
                console.error('Error fetching vendor:', error);
            });
            (dispatch as any)(businessProfileByVendorId(id as any)).catch((error: any) => {
                console.error('Error fetching business profile:', error);
            });
        }
    }, [id, dispatch])

    const businessProfileList = Array.isArray(businessProfiles) ? businessProfiles : (businessProfiles ? [businessProfiles] : []);
    const documentFields = [
        { key: 'aadharFront', label: 'Aadhar Front' },
        { key: 'aadharBack', label: 'Aadhar Back' },
        { key: 'registrationCopy', label: 'Registration Copy' },
        { key: 'gst', label: 'GST Document' },
    ];

    const handleApproval = (status: 'accepted' | 'rejected') => {
        if (!id) return;
    (dispatch as any)(approveOrRejectVendor({ id, profile_status: status } as any)).then((result: any) => {
            if (result?.payload?.status) {
                toast.success(result.payload.message || `Vendor ${status} successfully.`);
                (dispatch as any)(viewVendorById(id as any));
            } else {
                toast.error(result?.payload?.message || 'Unable to update vendor status.');
            }
        });
    };
  return (
    <div className="row">
        <div className="col-md-12">
            <div className="row">

            <h5 className="mt-0 alert alert-secondary text-center p-1">Business Info</h5>
            <div className="row">
                {businessProfileList && businessProfileList.length > 0 ? (
                    businessProfileList.map((profile: any) => {
                        const addressText = formattedBusinessAddress(profile?.address);
                        const profileImageUrl = resolveImageUrl(profile?.profilePicture);
                        return (
                            <div className="col-12 col-sm-12" key={profile?._id}>
                                <div className="card info-card sales-card mb-3">
                                    <div className="card-body pt-3">
                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <img
                                                    src={profileImageUrl || "/assets/admin/img/business_pic.png"}
                                                    alt=""
                                                    style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%' }}
                                                />
                                            </div>
                                            <div className="ps-3">
                                                <h5>{profile?.businessName || 'Business Name'}</h5>
                                                {(profile?.serviceName || profile?.service_id?.serviceName) && (
                                                    <p className="mb-1">
                                                        {profile?.serviceName || profile?.service_id?.serviceName}
                                                        {profile?.serviceType || profile?.service_id?.serviceType ? ` (${profile?.serviceType || profile?.service_id?.serviceType})` : ''}
                                                    </p>
                                                )}
                                                {addressText && <p className="mb-1">Address: {addressText}</p>}
                                                {profile?.skills?.length > 0 && (
                                                    <p className="mb-1">Skills: {profile.skills.join(', ')}</p>
                                                )}
                                                {profile?.languages?.length > 0 && (
                                                    <p className="mb-1">Languages: {profile.languages.join(', ')}</p>
                                                )}
                                                <Link
                                                    href={`/services/d/${profile?._id}`}
                                                    className="btn btn-primary btn-sm mt-2"
                                                    target="_blank"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-12">
                        <p className="text-muted">No business details available.</p>
                    </div>
                )}
            </div>
            {showApprovalActions && (
                <div className="d-flex flex-wrap gap-2 mt-1 mb-3">
                    <button
                        className="btn btn-success btn-sm"
                        type="button"
                        onClick={() => handleApproval('accepted')}
                        disabled={currentVendor?.profile_status === 'accepted'}
                    >
                        Approve
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        type="button"
                        onClick={() => handleApproval('rejected')}
                        disabled={currentVendor?.profile_status === 'rejected'}
                    >
                        Reject
                    </button>
                </div>
            )}

            <h5 className="mt-0 alert alert-secondary text-center p-1">Vendor Info</h5>
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
                    <p className="mb-0">Profile Image</p>
                </div>
                <div className="col-7 col-sm-9">
                    {currentVendor?.profile_image ? (
                        <img
                            src={resolveImageUrl(currentVendor.profile_image)}
                            alt=""
                            style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                    ) : (
                        <p className="mb-0 text-muted">No image</p>
                    )}
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
                    <p className="mb-0"><button className={`btn ${currentVendor?.profile_status === 'accepted' ? 'btn-success' : 'btn-danger'} btn-sm`}>{currentVendor?.profile_status === 'accepted' ? 'Accepted' : 'Pending'}</button></p>
                </div>
            </div>
            
            <div className='col-md-12 mt-4'>
                <h5 className="mt-0 alert alert-secondary text-center p-1">Documents</h5>
                <div>
                    {businessProfileList.length > 0 ? (
                        businessProfileList.map((profile: any, profileIndex: number) => {
                            const docs = profile?.documents || {};
                            const availableDocs = documentFields
                                .map((field) => ({
                                    label: field.label,
                                    value: docs?.[field.key]
                                }))
                                .filter((item) => !!item.value);

                            return (
                                <div key={`docs_${profile?._id || profileIndex}`} className="mb-3">
                                    {profile?.businessName && (
                                        <p className="fw-semibold mb-2">{profile.businessName}</p>
                                    )}

                                    {availableDocs.length > 0 ? (
                                        <div className="d-flex flex-wrap gap-3">
                                            {availableDocs.map((doc, index) => (
                                                <a
                                                    key={`${profile?._id || 'profile'}_${doc.label}_${index}`}
                                                    href={resolveImageUrl(doc.value)}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-center"
                                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                                >
                                                    <img
                                                        src={resolveImageUrl(doc.value)}
                                                        alt={doc.label}
                                                        style={{
                                                            width: '130px',
                                                            height: '90px',
                                                            objectFit: 'cover',
                                                            borderRadius: '6px',
                                                            border: '1px solid #ddd'
                                                        }}
                                                    />
                                                    <p className="mb-0 mt-1" style={{ fontSize: '12px' }}>{doc.label}</p>
                                                </a>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="mb-0 text-muted">No documents available</p>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p className="mb-0 text-muted">No documents available</p>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default VendorViewPage
