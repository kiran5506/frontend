import React from 'react'

/**
 * @param {{
 *  pkg?: {
 *    _id?: string;
 *    packageName?: string;
 *    totalLeads?: number;
 *    amount?: number;
 *    imagePath?: string;
 *  };
 *  onSubscribe?: (pkg?: any) => void | Promise<void>;
 * }} props
 */
const Package = ({ pkg, onSubscribe }) => {
    const rawImage = pkg?.imagePath || '/assets/vendor/img/packages_img.jpg';
    const imageSrc = rawImage && rawImage.startsWith('http')
        ? `/api/image-proxy?url=${encodeURIComponent(rawImage)}`
        : rawImage;
    const packageName = pkg?.packageName || 'Package';
    const amount = pkg?.amount ?? 0;
    const totalLeads = pkg?.totalLeads ?? 0;

    return (
        <div className="col-md-4">
            <div className="package_item active text-center">
                <img src={imageSrc} alt={packageName} width={150} />
                <h5>{packageName}</h5>
                <h2>₹{amount}</h2>
                <ul>
                    <li>
                        <p>{totalLeads} Leads</p>
                    </li>
                    <li>
                        <p>Lifetime Validity</p>
                    </li>
                </ul>
                <button
                    type="button"
                    className="btn color-white orange-btn btn-xs"
                    onClick={() => onSubscribe && onSubscribe(pkg)}
                >
                    Subscribe
                </button>
            </div>
        </div>
    )
}

export default Package
