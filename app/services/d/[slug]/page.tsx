"use client";
import WithLayout from '@/hoc/WithLayout'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Vendorslist from '@/components/frontend/ServiceDetails/Vendorslist'
import PackageCard from '@/components/frontend/ServiceDetails/PackageCard'
import RequestCallbackModal from '@/components/frontend/RequestCallbackModal'
import axiosInstance from '@/utils/axios'
import endpoints from '@/services/endpoints'
import "./servicedetails.css"
import { fetchWishlistIds, toggleWishlist } from '@/services/wishlist-api'

const ServiceDetails = () => {
    const router = useRouter();
    const params = useParams();
    const rawSlug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
    const businessProfileId = rawSlug ? rawSlug.split('-').pop() : undefined;
    const [businessProfile, setBusinessProfile] = useState<any>(null);
    const [vendor, setVendor] = useState<any>(null);
    const [portfolio, setPortfolio] = useState<any>(null);
    const [packages, setPackages] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<string>('all');
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState<any[]>([]);
    const [reviewRating, setReviewRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>('');
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
    const [selectedPackageId, setSelectedPackageId] = useState<string>('');
    const [wishlistIds, setWishlistIds] = useState<string[]>([]);
    const [topSuggestions, setTopSuggestions] = useState<any[]>([]);
    const [isTopSuggestionsLoading, setIsTopSuggestionsLoading] = useState(false);
    const customerAuth = useSelector((state: any) => state.customerAuth);
    const customerDetails = useMemo(() => {
        if (!customerAuth?.details) return null;
        if (typeof customerAuth.details === 'string') {
            try {
                return JSON.parse(customerAuth.details);
            } catch (error) {
                return null;
            }
        }
        return customerAuth.details;
    }, [customerAuth?.details]);
    const customerId = customerDetails?._id;
    useEffect(() => {
        let isMounted = true;
        const loadWishlist = async () => {
            if (!customerAuth?.isAuthenticated) {
                if (isMounted) setWishlistIds([]);
                return;
            }
            try {
                const response = await fetchWishlistIds(customerId);
                if (isMounted && response?.status) {
                    setWishlistIds(response.data || []);
                }
            } catch (error) {
                if (isMounted) setWishlistIds([]);
            }
        };

        loadWishlist();
        return () => {
            isMounted = false;
        };
    }, [customerAuth?.isAuthenticated]);

    const handleToggleWishlist = async () => {
        if (!businessProfileId) return;
        if (!customerAuth?.isAuthenticated) {
            toast.info('Please login to add to wishlist.');
            router.push('/login');
            return;
        }
        try {
            const response = await toggleWishlist(businessProfileId, customerId);
            if (response?.status) {
                toast.success(response?.message);
                setWishlistIds((prev) => {
                    const exists = prev.includes(businessProfileId);
                    if (response?.data?.added === false || exists) {
                        return prev.filter((id) => id !== businessProfileId);
                    }
                    return [...prev, businessProfileId];
                });
            }
        } catch (error) {
            // ignore
        }
    };

    const toProxy = (url?: string) => {
        if (!url) return '';
        return `/api/image-proxy?url=${encodeURIComponent(url)}`;
    };

    useEffect(() => {
        if (!businessProfileId) return;
        setLoading(true);
        axiosInstance
            .get(endpoints.BUSINESS_PROFILE.detailsById.replace('{id}', businessProfileId))
            .then((response) => {
                if (response?.data?.status) {
                    const data = response.data.data || {};

                    console.log('Business profile details response:', data);
                    setBusinessProfile(data.business_profile || null);
                    setVendor(data.vendor || null);
                    setPortfolio(data.portfolio || null);
                    setPackages(data.packages || []);
                    setEvents(data.events || []);
                } else {
                    setBusinessProfile(null);
                    setVendor(null);
                    setPortfolio(null);
                    setPackages([]);
                    setEvents([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching business profile details:', error);
                setBusinessProfile(null);
                setVendor(null);
                setPortfolio(null);
                setPackages([]);
                setEvents([]);
            })
            .finally(() => setLoading(false));
    }, [businessProfileId]);

    useEffect(() => {
        if (!businessProfileId) {
            setTopSuggestions([]);
            return;
        }

        setIsTopSuggestionsLoading(true);
        axiosInstance
            .get(endpoints.SERVICES.topSuggestions.replace('{business_profile_id}', businessProfileId))
            .then((response) => {
                if (response?.data?.status) {
                    setTopSuggestions(response?.data?.data?.business_profiles || []);
                } else {
                    setTopSuggestions([]);
                }
            })
            .catch(() => {
                setTopSuggestions([]);
            })
            .finally(() => setIsTopSuggestionsLoading(false));
    }, [businessProfileId]);

    const activeEventId = selectedEventId === 'all' ? null : selectedEventId;
    const portfolioEvents = portfolio?.events || [];
    const filteredPortfolioEvents = activeEventId
        ? portfolioEvents.filter((event: any) => (event?.event_id?._id || event?.event_id) === activeEventId)
        : portfolioEvents;

    const portfolioImages = filteredPortfolioEvents.flatMap((event: any) => event?.images || []);
    const portfolioVideos = filteredPortfolioEvents.flatMap((event: any) => event?.videos || []);

    const filteredPackages = activeEventId
        ? packages.filter((pkg: any) => (pkg?.event_id?._id || pkg?.event_id) === activeEventId)
        : packages;

    const pricingEntries = useMemo(() => {
        return filteredPackages
            .flatMap((pkg: any) => (Array.isArray(pkg?.cityPricing) ? pkg.cityPricing : []))
            .map((pricing: any) => ({
                offer: Number(pricing?.offerPrice),
                market: Number(pricing?.marketPrice),
            }))
            .filter((pricing: any) => Number.isFinite(pricing.offer) && pricing.offer > 0);
    }, [filteredPackages]);

    const lowestPricing = useMemo(() => {
        return pricingEntries.reduce((lowest: any, current: any) => {
            if (!lowest) return current;
            return current.offer < lowest.offer ? current : lowest;
        }, null);
    }, [pricingEntries]);

    const lowestOffer = lowestPricing?.offer;
    const lowestMarket = lowestPricing?.market;
    const discountPercent =
        lowestMarket && lowestOffer && lowestMarket > 0
            ? Math.round(((lowestMarket - lowestOffer) / lowestMarket) * 100)
            : null;

    const formatPrice = (value?: number) =>
        typeof value === 'number' && Number.isFinite(value)
            ? value.toLocaleString('en-IN')
            : '';

    const coverImage = businessProfile?.cover_images?.[0] || '/images/services/banner_img.jpg';
    const profileImage = businessProfile?.profilePicture || vendor?.profile_image || '/images/services/profile-pic.jpg';
    const serviceName = businessProfile?.service_id?.serviceName || businessProfile?.serviceName || 'Service';
    const businessName = businessProfile?.businessName || 'Business Name';
    const cityName = businessProfile?.address?.city || vendor?.city;
    const reviewSummary = useMemo(() => {
        if (!reviews.length) {
            return { average: 0, count: 0 };
        }
        const total = reviews.reduce((sum: number, item: any) => sum + Number(item?.rating || 0), 0);
        const average = reviews.length > 0 ? total / reviews.length : 0;
        return { average, count: reviews.length };
    }, [reviews]);

    useEffect(() => {
        const vendorId = vendor?._id || businessProfile?.vendor_id?._id || businessProfile?.vendor_id;
        if (!vendorId || !businessProfileId) return;

        const currentBusinessProfileId = businessProfileId.toString();
        axiosInstance
            .get(endpoints.REVIEW.findByVendorId.replace('{vendor_id}', vendorId), {
                params: { page: 1, limit: 100 }
            })
            .then((response) => {
                if (response?.data?.status) {
                    const allVendorReviews = response.data.data || [];
                    const filteredByBusinessProfile = allVendorReviews.filter((item: any) => {
                        const profileId = (item?.business_profile_id?._id || item?.business_profile_id || '').toString();
                        const status = (item?.status || '').toString().toLowerCase();
                        return profileId === currentBusinessProfileId && status !== 'rejected';
                    });
                    setReviews(filteredByBusinessProfile);
                } else {
                    setReviews([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
                setReviews([]);
            });
    }, [vendor?._id, businessProfile?.vendor_id, businessProfileId]);

    const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!customerId) {
            toast.error('Please login to submit a review.');
            return;
        }
        if (!reviewRating || !reviewText.trim()) {
            toast.error('Please add a rating and review.');
            return;
        }
        const vendorId = vendor?._id || businessProfile?.vendor_id?._id || businessProfile?.vendor_id;
        if (!vendorId) {
            toast.error('Vendor information is missing.');
            return;
        }
        setIsSubmittingReview(true);
        axiosInstance
            .post(endpoints.REVIEW.create, {
                vendor_id: vendorId,
                customer_id: customerId,
                business_profile_id: businessProfileId,
                review: reviewText,
                rating: reviewRating
            })
            .then((response) => {
                if (response?.data?.status) {
                    toast.success(response.data.message || 'Review submitted successfully.');
                    setReviews((prev: any[]) => ([
                        {
                            rating: reviewRating,
                            review: reviewText,
                            status: 'pending',
                            business_profile_id: businessProfileId
                        },
                        ...prev
                    ]));
                    setReviewRating(0);
                    setReviewText('');
                } else {
                    toast.error(response?.data?.message || 'Unable to submit review.');
                }
            })
            .catch((error) => {
                const message = error?.response?.data?.message || 'Unable to submit review.';
                toast.error(message);
            })
            .finally(() => setIsSubmittingReview(false));
    };

    const handleShareProfile = async () => {
        if (typeof window === 'undefined') return;

        const shareUrl = window.location.href;
        const shareTitle = businessName || 'Business Profile';
        const shareText = `Check out this business profile on Bsfye: ${shareTitle}`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: shareTitle,
                    text: shareText,
                    url: shareUrl
                });
                return;
            }

            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(shareUrl);
                toast.success('Profile link copied to clipboard.');
                return;
            }

            toast.info('Sharing is not supported on this browser.');
        } catch (error) {
            // Ignore abort errors from native share sheet cancellation
            const err = error as { name?: string };
            if (err?.name !== 'AbortError') {
                toast.error('Unable to share profile right now.');
            }
        }
    };
  return (
    <>
        <RequestCallbackModal
            isOpen={isCallbackModalOpen}
            onClose={() => {
                setIsCallbackModalOpen(false);
                setSelectedPackageId('');
            }}
            serviceId={businessProfile?.service_id?._id || businessProfile?.service_id}
            packageId={selectedPackageId || undefined}
            enquiryType="callback"
        />
        <section className="main-banner">
            <div className="container">
                <div className="row">
                <div className="col-sm-12">
                    <img
                    src={toProxy(coverImage) || '/images/services/banner_img.jpg'}
                    alt=""
                    className="w-100 rounded-4"
                    style={{ height: '421px', objectFit: 'cover' }}
                    />
                </div>
                </div>
                <div className="row d-flex justify-content-center n-mt-30">
                <div className="col-12 col-md-12 col-lg-9">
                    <div className="item services-view featured-item">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-4 col-lg-3 text-center text-md-start top-img">
                        <img
                            src={toProxy(profileImage) || '/images/services/profile-pic.jpg'}
                            alt=""
                            className="profile-pic"
                            style={{ minHeight: '215px'}}
                        />
                        </div>
                        <div className="col-md-8 col-lg-9">
                        <div className="content-sec">
                            <div className="d-flex">
                            <small>{serviceName}</small>
                            </div>
                            <h1>
                            {businessName}&nbsp;
                            <Image
                                src="/images/icons/order-status_01.png"
                                alt=""
                                width={30}
                                height={30}
                            />
                            </h1>
                            <h3>
                            
                            <span className="diso"> Verified ✓ </span> &nbsp; &nbsp;
                            {cityName ? `From ${cityName}` : ''}
                            </h3>
                            <ul>
                            <li>
                                <Image
                                src="/images/icons/suggestions-rating.png"
                                alt=""
                                width={15}
                                height={15}
                                />
                                {`${reviewSummary.average.toFixed(1)} (${reviewSummary.count})`}
                            </li>
                            </ul>
                            <div className="mydivdd">
                            <button
                                type="button"
                                className="wishlist_con"
                                onClick={handleToggleWishlist}
                                aria-label="Add to wishlist"
                                style={{border: 'none', backgroundColor: '#fff'}}
                            >
                                <Image
                                    src={wishlistIds.includes(businessProfileId || '')
                                        ? "/images/icons/wishlist-fill.png"
                                        : "/images/icons/wishlist.svg"}
                                    alt=""
                                    width={20}
                                    height={20}
                                />
                            </button>
                            <Link
                                href="https://api.whatsapp.com/send/?phone=919985886393&text&type=letmeknowcostbsfye"
                                target="_blank"
                                className="whatsapp_con"
                            >
                                <Image src="/images/icons/whatsapp.png" alt="" width={20} height={20} />
                            </Link>
                            <button
                                type="button"
                                className="share_con"
                                onClick={handleShareProfile}
                                aria-label="Share profile"
                                style={{ border: 'none', background: 'transparent' }}
                            >
                                <Image src="/images/icons/share.png" alt="" width={20} height={20} />
                            </button>
                            </div>
                            <h2>
                            {lowestOffer ? `₹ ${formatPrice(lowestOffer)}` : '₹ 6,000'}
                            <span style={{ fontSize: 12 }}> /Onwards</span>
                            {discountPercent ? (
                                <span style={{ fontSize: 12, marginLeft: 5 }} className="diso">
                                    {discountPercent}% Off
                                </span>
                            ) : null}
                            </h2>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>

        <section className="service-view content_sec ">
            <div id="sticky-wrapper">
                <div className="container" id="top-menu">
                <div className="item">
                    {/* Dropdown Toggle for Mobile */}
                    <div className="d-md-none mb-2 text-center">
                    <ul className="mobile-link-menu">
                        <li>
                        <Link className="d-flex align-items-center" href="#portfolio">
                            
                            Portfolio
                        </Link>
                        </li>
                        <li>
                        <Link className="d-flex align-items-center" href="#services">
                            Packages
                        </Link>
                        </li>
                        <li>
                        <Link
                            className="dropdown-item d-flex align-items-center"
                            href="#about"
                        >
                            About
                        </Link>
                        </li>
                        <li>
                        <Link
                            className="dropdown-item d-flex align-items-center"
                            href="#reviews"
                        >
                            
                            Reviews
                        </Link>
                        </li>
                    </ul>
                    </div>
                    {/* Normal Horizontal Menu for Desktop */}
                    <div className="menu d-none d-md-block">
                        <ul className="d-flex justify-content-between align-items-center list-unstyled mb-0">
                            <li>
                            <Link href="#portfolio" className="d-flex align-items-center">
                                <Image
                                src="/images/icons/service-menu-icon2.png"
                                alt=""
                                className="me-2"
                                width={20}
                                height={20}
                                />
                                Portfolio
                            </Link>
                            </li>
                            <li>
                            <Link href="#services" className="d-flex align-items-center">
                                <Image
                                src="/images/icons/service-menu-icon1.png"
                                alt=""
                                className="me-2"
                                width={20}
                                height={20}
                                />
                                Packages
                            </Link>
                            </li>
                            <li>
                            <Link href="#about" className="d-flex align-items-center">
                                <Image
                                src="/images/icons/service-menu-icon3.png"
                                alt=""
                                className="me-2"
                                width={20}
                                height={20}
                                />
                                About Us
                            </Link>
                            </li>
                            <li>
                            <Link href="#reviews" className="d-flex align-items-center">
                                <Image
                                src="/images/icons/service-menu-icon4.png"
                                alt=""
                                className="me-2"
                                width={20}
                                height={20}
                                />
                                Reviews
                            </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="clearfix" />
                </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                <div className="col-sm-12" id="portfolio">
                    <div className="item mt-4">
                    <div className="row">
                        <div className="col-md-3 col-lg-3">
                        <h4 className="mb-3">
                            
                            <span> Portfolio &nbsp; &nbsp;</span>
                            
                            <span style={{ fontSize: 13, marginRight: 10 }}>
                                <Link href="#photos">Photos </Link> ({portfolioImages.length})
                            </span>
                            <span style={{ fontSize: 13 }}> 
                                    <Link href="#videos">Videos </Link> ({portfolioVideos.length})
                                </span> 
                        </h4>
                        </div>
                        <div className="col-md-4 col-lg-3">
                        <form className="mb-4">
                            <div className="row gx-2 d-flex align-items-center">
                            <div className="col-18">
                                <div className="search-container">
                                <select
                                    className="form-select search-package"
                                    value={selectedEventId}
                                    onChange={(event) => setSelectedEventId(event.target.value)}
                                >
                                    <option value="all">All Events</option>
                                    {events.map((eventItem: any) => (
                                        <option value={eventItem?._id} key={eventItem?._id}>
                                            {eventItem?.eventName}
                                        </option>
                                    ))}
                                </select>
                                </div>
                            </div>
                            </div>
                        </form>
                        </div>
                    </div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <div className="row" id="photos">
                                {portfolioImages.length > 0 ? (
                                    portfolioImages.map((image: string, index: number) => (
                                        <div className="col-6 col-md-4 col-lg-3 mb-3" key={`img-${index}`}>
                                            <img
                                                src={toProxy(image)}
                                                alt=""
                                                className="w-100 rounded"
                                                style={{ height: '180px', objectFit: 'cover' }}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">No photos available.</p>
                                )}
                            </div>
                            <div className="row mt-3" id="videos">
                                
                                {portfolioVideos.length > 0 ? (
                                    portfolioVideos.map((video: string, index: number) => (
                                        <div className="col-12 col-md-6 col-lg-4 mb-3" key={`vid-${index}`}>
                                            <video
                                                src={toProxy(video)}
                                                controls
                                                className="w-100 rounded"
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">No videos available.</p>
                                )}
                            </div>
                        </>
                    )}


                    </div>
                    <div className="col-sm-12" id="services">
                    <div className="item mt-4">
                        <div className="row">
                        <div className="col-md-3 col-lg-3">
                            <h4 className="mb-3">
                            
                            <span> Packages &nbsp; &nbsp; </span>
                            <span style={{ fontSize: 13 }}>
                                
                                <Link href="#photos"> Packages </Link> ({filteredPackages.length})
                            </span>
                            </h4>
                        </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                        {filteredPackages.length > 0 ? (
                            filteredPackages.flatMap((pkg: any) => {
                                const pricingList = Array.isArray(pkg?.cityPricing)
                                    ? pkg.cityPricing
                                    : [null];
                                return pricingList.map((pricing: any, index: number) => (
                                    <PackageCard
                                        key={`${pkg?._id || 'pkg'}-${pricing?._id || index}`}
                                        pkg={pkg}
                                        pricing={pricing}
                                        toProxy={toProxy}
                                        onRequestCallback={(packageId) => {
                                            setSelectedPackageId(packageId || '');
                                            setIsCallbackModalOpen(true);
                                        }}
                                    />
                                ));
                            })
                        ) : (
                            <p className="text-muted">No packages found for this event.</p>
                        )}
                        
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-12" id="about">
                    <div className="item mt-4">
                        <div className="row">
                        <h4 className=" mb-3">About Us</h4>
                        <p className="mb-3"> {businessProfile?.about_us} </p>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-12" id="reviews">
                    <div className="item mt-4">
                        <div className="row">
                        <div className="col-8 col-md-6 col-lg-3">
                            <h4 className=" mb-3">Reviews </h4>
                        </div>
                        <div className="col-4 col-md-6 col-lg-9">
                            <ul className="scroll-media review-link">
                            <li>
                                <Link href="#add-your-review">Add Review</Link>
                            </li>
                            </ul>
                        </div>
                        <div className="sdf ">
                            <div className="col-md-12">
                            <div className="row testimonials-carousal">
                                <div className="col-12 col-md-12 col-lg-6">
                                    <div className="row testm-box">
                                        <h3>
                                        
                                        <Image
                                            src="/images/common/testimonials_pic.jpg"
                                            alt=""
                                            width={150}
                                            height={150}
                                        />
                                        &nbsp; Name Here
                                        </h3>
                                        <p>
                                        
                                        Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit. Phasellus lacinia ante quis aliquet bibendum.
                                        Lorem ipsum
                                        </p>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="text-start mt-3" id="add-your-review">
                            <h4 className="mt-3">Add Your Ratings &amp; Reviews</h4>
                            <form onSubmit={handleReviewSubmit}>
                            <div className="mt-2">
                                <div className="rating">
                                <input
                                    type="radio"
                                    name="rating"
                                    defaultValue={5}
                                    id="rating-5"
                                    checked={reviewRating === 5}
                                    onChange={() => setReviewRating(5)}
                                />
                                <label htmlFor="rating-5">☆</label>
                                <input
                                    type="radio"
                                    name="rating"
                                    defaultValue={4}
                                    id="rating-4"
                                    checked={reviewRating === 4}
                                    onChange={() => setReviewRating(4)}
                                />
                                <label htmlFor="rating-4">☆</label>
                                <input
                                    type="radio"
                                    name="rating"
                                    defaultValue={3}
                                    id="rating-3"
                                    checked={reviewRating === 3}
                                    onChange={() => setReviewRating(3)}
                                />
                                <label htmlFor="rating-3">☆</label>
                                <input
                                    type="radio"
                                    name="rating"
                                    defaultValue={2}
                                    id="rating-2"
                                    checked={reviewRating === 2}
                                    onChange={() => setReviewRating(2)}
                                />
                                <label htmlFor="rating-2">☆</label>
                                <input
                                    type="radio"
                                    name="rating"
                                    defaultValue={1}
                                    id="rating-1"
                                    checked={reviewRating === 1}
                                    onChange={() => setReviewRating(1)}
                                />
                                <label htmlFor="rating-1">☆</label>
                                </div>
                            </div>
                            <div className="mt-2 col-12 col-md-12 col-lg-6">
                                <textarea
                                className="form-control py-2 px-4 rounded-5"
                                rows={7}
                                value={reviewText}
                                onChange={(event) => setReviewText(event.target.value)}
                                placeholder={customerId ? "Share your review" : "Login to add a review"}
                                disabled={!customerId || isSubmittingReview}
                                />
                            </div>
                            <div className="mt-2 col-12 col-md-12 col-lg-6">
                                <button
                                    type="submit"
                                    className="btn btn-secondary px-4"
                                    disabled={!customerId || isSubmittingReview}
                                >
                                Add Review 
                                <Image
                                    src="/images/icons/btn-arrow.png"
                                    alt=""
                                    width={10}
                                    height={10}
                                />
                                </button>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>

        <Vendorslist
            title="Top Suggestions"
            profiles={topSuggestions}
            loading={isTopSuggestionsLoading}
            emptyMessage="Top Suggestion Vendors Not Found."
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
        />
        <Vendorslist title="Similar Vendors" />
    </>
  )
}

export default WithLayout(ServiceDetails, 'frontend')
