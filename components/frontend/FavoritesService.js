import React from 'react'
import Link from 'next/link'

/**
 * @param {{
 *  profile: any;
 *  onToggleWishlist?: (profile: any) => void | Promise<void>;
 * }} props
 */
const FavoritesService = ({ profile, onToggleWishlist }) => {
    const businessName = profile?.businessName || 'Business';
    const serviceName = profile?.serviceName || 'Service';
    const imageSrc = profile?.profilePicture || '/images/common/cart_img.jpg';
    const lowestOfferPrice = Number(profile?.lowestOfferPrice || 0);
    const lowestDiscount = Number(profile?.lowestDiscount || 0);
    const formatPrice = (value) =>
        Number.isFinite(value) && value > 0 ? value.toLocaleString('en-IN') : '';
    const linkHref = profile?._id ? `/services/d/${profile._id}` : '#';
    const whatsappNumber = profile?.vendor_id?.mobile_number || '9985886393';

    const handleRemove = () => {
        if (onToggleWishlist) {
            onToggleWishlist(profile);
        }
    };

  return (
    <>
        <div className="main_box1 wishlist mb-4">
            <div className="row d-flex align-items-center">
            <div className="col-sm-3 position-relative">
                <div className="discount col-sm-12 float-end">
                <img
                    src="/images/common/tag.png"
                    alt="Tag"
                    style={{ width: 70, padding: 10 }}
                />
                </div>
                <img
                    src={`/api/image-proxy?url=${encodeURIComponent(imageSrc)}`}
                    alt={businessName}
                    className="photo"
                />
            </div>
            <div className="col-sm-4 inhead">
                <h5>{businessName}</h5>
                <p className="mb-1 text-muted">{serviceName}</p>
                <h6>
                {lowestOfferPrice ? `₹ ${formatPrice(lowestOfferPrice)}` : '₹ 0'}{' '}
                <span style={{ fontSize: 12 }}>/Onwards</span>{' '}
                {lowestDiscount ? (
                    <span style={{ fontSize: 12 }} className="diso">
                        {lowestDiscount}% Off
                    </span>
                ) : null}
                </h6>
            </div>
            <div className="col-sm-3">
                <p>
                <Link
                    href={`https://api.whatsapp.com/send/?phone=${whatsappNumber}&text&type=letmeknowcostbsfye`}
                    className=" "
                    target="_blank"
                >
                    <img
                    src="/images/icons/whatsapp.png"
                    alt="WhatsApp"
                    style={{ width: 20, height: "auto" }}
                    />{" "}
                    {whatsappNumber}
                </Link>
                </p>
            </div>
            <div className="col-sm-2 mymrr">
                <Link href={linkHref} className="btn btn-secondary py-2 px-3">
                    View Profile
                </Link>
                {/* {onToggleWishlist ? (
                    <button
                        type="button"
                        className="btn btn-outline-secondary py-2 px-3 mt-2"
                        onClick={handleRemove}
                    >
                        Remove
                    </button>
                ) : null} */}
            </div>
            </div>
        </div>
    </>
  )
}

export default FavoritesService
