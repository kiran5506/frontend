"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { fetchWishlistItems, toggleWishlist } from '@/services/wishlist-api';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FavoritesService from '@/components/frontend/FavoritesService';

const CustomerWishlist = () => {
    const [wishlistItems, setWishlistItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
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
                if (isMounted) setWishlistItems([]);
                return;
            }
            setLoading(true);
            try {
                const response = await fetchWishlistItems(customerId);
                if (isMounted && response?.status) {
                    setWishlistItems(response.data || []);
                }
            } catch (error) {
                if (isMounted) {
                    toast.error('Unable to load wishlist.');
                    setWishlistItems([]);
                }
            } finally {
                if (isMounted) setLoading(false);
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
            if (response?.status && response?.data?.added === false) {
                setWishlistItems((prev) => prev.filter((item) => item._id !== profile._id));
            }
        } catch (error) {
            toast.error('Unable to update wishlist.');
        }
    };

    return (
        <div className="content">
            <div className="pad">
                <h3 className="text-start text-theme mb-3">My Favorites</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : wishlistItems.length > 0 ? (
                    <div className="row d-flex justify-content-center">
                        {wishlistItems.map((profile) => (
                            <FavoritesService
                                key={profile?._id}
                                profile={profile}
                                onToggleWishlist={handleToggleWishlist}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-muted">No wishlist items found.</p>
                )}
            </div>
        </div>
    );
};

export default CustomerWishlist;
