import Link from 'next/link'
import React from 'react'

interface PackageCardProps {
  pkg: any;
  pricing?: any;
  toProxy: (url?: string) => string;
  onRequestCallback?: (packageId?: string) => void;
}

const PackageCard = ({ pkg, pricing, toProxy, onRequestCallback }: PackageCardProps) => {
  const coverImage = pkg?.coverImage || '/images/common/cart_img.jpg';
  const description = pkg?.description || '';
  const eventName = pkg?.event_id?.eventName;
  const cityPricing = Array.isArray(pkg?.cityPricing) ? pkg.cityPricing : [];
  const firstPricing = pricing || cityPricing[0];
  const discountPercent = Number(firstPricing?.discount) || null;

  return (
    <div className="main_box service-bx mb-4 p-3 border rounded bg-white">
      <div className="row align-items-center gy-3">
        <div className="col-12 col-md-6 col-lg-2 position-relative text-center">
          <img
            src={toProxy(coverImage)}
            alt="Package Image"
            className="img-fluid photo rounded"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
          <div className="discount3">
            <p className="mb-0 text-white">
              <span>Up-to</span> {discountPercent ? `${discountPercent}%` : '0%'} Off
            </p>
            <img
              src="/images/common/tag.png"
              alt="Tag"
              style={{ width: 90, padding: 10 }}
            />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <h5 className="mb-1">{pkg?.packageName || 'Package Name'}</h5>
          <small className="d-block">
            <Link href="#" className="text-decoration-none text-muted">
              {description || eventName || 'Package details not provided.'}
            </Link>
          </small>
          {eventName && <small className="text-muted">Event: {eventName}</small>}
        </div>
        <div className="col-6 col-md-3 col-lg-2 text-center">
          <p className="mb-0 text-muted price">Market Price</p>
          <h4 className="text-muted text-decoration-line-through">
            {firstPricing?.marketPrice ? `₹${firstPricing.marketPrice}` : ''}
          </h4>
        </div>
        <div className="col-6 col-md-3 col-lg-2 text-center">
          <p className="mb-0 text-success price">Offer Price</p>
          <h4 className="text-success">
            {firstPricing?.offerPrice ? `₹${firstPricing.offerPrice}` : '₹5,000'}
          </h4>
        </div>
        <div className="col-12 col-md-6 col-lg-2">
          <button
            type="button"
            className="btn btn-secondary whatsapp-icon d-block mb-2 text-white"
            onClick={() => onRequestCallback?.(pkg?._id)}
          >
            Call Back Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
