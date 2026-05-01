"use client";
import WithLayout from '@/hoc/WithLayout'
import Pagination from '@/components/Pagination'
import Service from '@/components/frontend/Service'
import RequestCallbackModal from '@/components/frontend/RequestCallbackModal'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { fetchWishlistIds, toggleWishlist } from '@/services/wishlist-api'
import axiosInstance from '@/utils/axios';
import endpoints from '@/services/endpoints';

const Services = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const slug = pathname?.split('/').pop() || '';
    const serviceId = slug.split('-').pop();
    const cityId = searchParams?.get('city_id') || '';
    const vendorId = searchParams?.get('vendor_id') || '';
    const budgetSort = searchParams?.get('budget_sort') || '';
    const discountSort = searchParams?.get('discount_sort') || '';
    const ratingFilter = searchParams?.get('rating') || '';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [serviceDetails, setServiceDetails] = useState<any>(null);
    const [businessProfiles, setBusinessProfiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [wishlistIds, setWishlistIds] = useState<string[]>([]);
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
        // Open modal automatically when page loads
        const timer = setTimeout(() => {
            setIsModalOpen(true);
        }, 500); // Small delay for better UX

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!serviceId) return;
        setLoading(true);
        const query = new URLSearchParams();
        if (cityId) query.set('city_id', cityId);
        if (vendorId) query.set('vendor_id', vendorId);
        if (budgetSort) query.set('budget_sort', budgetSort);
        if (discountSort) query.set('discount_sort', discountSort);
        if (ratingFilter) query.set('rating', ratingFilter);
        const endpoint = `${endpoints.SERVICES.findByIdWithProfiles.replace('{id}', serviceId)}${query.toString() ? `?${query.toString()}` : ''}`;

        axiosInstance
            .get(endpoint)
            .then((response) => {
                if (response?.data?.status) {
                    console.log('Service details response:', response.data.data?.service);
                    setServiceDetails(response.data.data?.service || null);
                    setBusinessProfiles(response.data.data?.business_profiles || []);
                } else {
                    setServiceDetails(null);
                    setBusinessProfiles([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching service details:', error);
                setServiceDetails(null);
                setBusinessProfiles([]);
            })
            .finally(() => setLoading(false));
    }, [serviceId, cityId, vendorId, budgetSort, discountSort, ratingFilter]);

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams?.toString() || '');
        const safePathname = pathname || '/services';
        if (!value) {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        const queryString = params.toString();
        router.push(queryString ? `${safePathname}?${queryString}` : safePathname);
    };

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

    const handleToggleWishlist = async (profile: any) => {
        if (!profile?._id) return;
        try {
            const response = await toggleWishlist(profile._id, customerId);
            if (response?.status) {
                setWishlistIds((prev) => {
                    const exists = prev.includes(profile._id);
                    if (response?.data?.added === false || exists) {
                        return prev.filter((id) => id !== profile._id);
                    }
                    return [...prev, profile._id];
                });
            }
        } catch (error) {
            // ignore
        }
    };

  return (
    <>
        <RequestCallbackModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            serviceId={serviceId}
        />
        <section className="inner-search-section2">
            <h1 className="text-center py-3 ">{serviceDetails?.serviceName || 'Service Name'}</h1>
        </section>
        <section className="inner-search-section" id="filterBy">
            <div className="container">
                <div className="main-title row d-flex justify-content-center align-items-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <form>
                    <div className="row gx-2 d-flex justify-content-between align-items-center">
                        <div className="col-2 text-left text-md-end nomb">
                        <label>Filter by :</label>
                        </div>
                        <div className="col-3 myfill">
                        <select className="form-select" value={budgetSort} onChange={(event) => handleFilterChange('budget_sort', event.target.value)}>
                            <option value="">Budget</option>
                            <option value="low_to_high">Price - Low to High</option>
                            <option value="high_to_low">Price - High to Low</option>
                        </select>
                        </div>
                        <div className="col-3 myfill">
                        <select className="form-select" value={discountSort} onChange={(event) => handleFilterChange('discount_sort', event.target.value)}>
                            <option value="">Discount</option>
                            <option value="high_to_low">Discount - High to Low</option>
                            <option value="low_to_high">Discount - Low to High</option>
                        </select>
                        </div>
                        <div className="col-3 myfill">
                        <select className="form-select" value={ratingFilter} onChange={(event) => handleFilterChange('rating', event.target.value)}>
                            <option value="">Ratings</option>
                            <option value="5">5.0 & Above</option>
                            <option value="4">4.0 & Above</option>
                            <option value="3">3.0 & Above</option>
                            <option value="2">2.0 & Above</option>
                            <option value="1">1.0 & Above</option>
                        </select>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </section>
        
        <section className="services-section py-2 pt-0">
            <div className="container">
                <div className="main-title d-flex justify-content-between align-items-center">
                    <h3>Top Suggestions</h3>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="row d-flex justify-content-center">
                            {businessProfiles.length > 0 ? (
                                    businessProfiles.map((profile) => (
                                        <Service
                                            key={profile?._id}
                                            profile={profile}
                                            serviceDetails={serviceDetails}
                                            isWishlisted={wishlistIds.includes(profile?._id)}
                                            onToggleWishlist={handleToggleWishlist}
                                        />
                                    ))
                            ) : (
                                <p className="text-muted">No businesses found for this service.</p>
                            )}
                        </div>
                        {businessProfiles.length > 8 && <Pagination />}
                    </>
                )}
            </div>
        </section>

        <section className="services-section py-2">
            <div className="container">
                <div className="main-title d-flex justify-content-between align-items-center">
                    <h3>Regular Vendors</h3>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="row d-flex justify-content-center">
                            {businessProfiles.length > 0 ? (
                                    businessProfiles.map((profile) => (
                                        <Service
                                            key={profile?._id}
                                            profile={profile}
                                            serviceDetails={serviceDetails}
                                            isWishlisted={wishlistIds.includes(profile?._id)}
                                            onToggleWishlist={handleToggleWishlist}
                                        />
                                    ))
                            ) : (
                                <p className="text-muted">No businesses found for this service.</p>
                            )}
                        </div>
                        {businessProfiles.length > 8 && <Pagination />}
                    </>
                )}
            </div>
        </section>

    </>
  )
}

export default  WithLayout(Services, 'frontend')
