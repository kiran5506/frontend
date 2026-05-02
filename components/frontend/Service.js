"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

/**
 * @param {{
 *  profile: any;
 *  serviceDetails: any;
 *  isWishlisted?: boolean;
 *  onToggleWishlist?: (profile: any) => void | Promise<void>;
 * }} props
 */
const Service = ({ profile, serviceDetails, isWishlisted, onToggleWishlist }) => {
  const router = useRouter();
  const customerAuth = useSelector((state) => state.customerAuth);
  const isLoggedIn = Boolean(customerAuth?.isAuthenticated);
  const serviceName =
    profile?.serviceName || serviceDetails?.serviceName || "";
  const businessName = profile?.businessName || "";
  const city = profile?.address?.city;
  const averageRating = Number(profile?.averageRating || 0);
  const reviewCount = Number(profile?.reviewCount || 0);
  const imageSrc =
    profile?.profilePicture || "/images/common/suggestions_1.jpg";
  const lowestOfferPrice = Number(profile?.lowestOfferPrice || 0);
  const lowestDiscount = Number(profile?.lowestDiscount || 0);
  const formatPrice = (value) =>
    Number.isFinite(value) && value > 0 ? value.toLocaleString("en-IN") : "";
  const linkHref = profile?._id ? `/services/d/${profile._id}` : "";
  const handleWishlistClick = (event) => {
    if (!isLoggedIn) {
      event.preventDefault();
      toast.info("Please login to add to wishlist.");
      router.push("/login");
      return;
    }

    event.preventDefault();
    if (onToggleWishlist) {
      onToggleWishlist(profile);
    }
  };

  const wishlistIcon = isWishlisted
    ? "/images/icons/wishlist-fill.png"
    : "/images/icons/wishlist.svg";

  return (
    <div className="item col-md-6 col-lg-4 col-xl-3">
      <div className="box">
        <Link href={linkHref}>
          <div className="image-sec">
            <div className="right2">
              <div className="Verifiedd">
                <p> Verified ✓ </p>
              </div>
            </div>
            <div className="right">
              <div className="discount2">
                <p>
                  <span>Up-to</span>{lowestDiscount ? `${lowestDiscount}%` : "0%"} Off
                </p>
                <Image
                  src="/images/common/tag.png"
                  style={{ width: 90, padding: 10 }}
                  width={90}
                  alt=""
                  height={160}
                />
              </div>
            </div>
            <h1>
              {lowestOfferPrice ? `₹ ${formatPrice(lowestOfferPrice)}` : "₹ 700"} <span>/Onwards</span>
            </h1>
            <img
              src={`/api/image-proxy?url=${encodeURIComponent(imageSrc)}`}
              alt=""
              className="main-image"
              style={{ width: "100%", height: "172px", objectFit: "cover" }}
            />
          </div>
        </Link>
        <div className="content-sec">
          <Link href={linkHref}>
            <small>{serviceName}</small>
            <h2>
              {businessName}&nbsp;
              <Image
                src="/images/icons/order-status_01.png"
                alt=""
                width={20}
                height={20}
              />
            </h2>
            <ul>
              {(city || Number.isFinite(averageRating)) && (
                <>
                  {city && (
                    <li>
                      <Image
                        src="/images/icons/suggestion-map.png"
                        alt=""
                        width={15}
                        height={15}
                      />
                      from {city}
                    </li>
                  )}
                  <li>
                    <Image
                      src="/images/icons/suggestions-rating.png"
                      alt=""
                      width={15}
                      height={15}
                    />
                    {(Number.isFinite(averageRating) ? averageRating : 0).toFixed(1)} ({reviewCount})
                  </li>
                </>
              )}
            </ul>
          </Link>
          <button
            type="button"
            className="wishlist_con"
            onClick={handleWishlistClick}
            aria-label="Add to wishlist"
            style={{border: 'none', background: 'transparent'}}
          >
            <Image
              src={wishlistIcon}
              alt=""
              width={25}
              height={25}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Service;
