import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Service = () => {
  return (
    <div className="item col-md-6 col-lg-4 col-xl-3">
        <div className="box">
        <Link href="service-view.php">
            <div className="image-sec">
                <div className="right2">
                    <div className="Verifiedd">
                    <p> Verified ✓ </p>
                    </div>
                </div>
            <div className="right">
                <div className="discount2">
                <p>
                    <span>Up-to</span>50% Off
                </p>
                <Image
                    src="/images/common/tag.png"
                    style={{ width: 90, padding: 10 }}
                    width={90} alt=""
                    height={160}
                />
                </div>
            </div>
            <h1>
                ₹ 700 <span>/Onwards</span>
            </h1>
            <Image
                src="/images/common/suggestions_1.jpg"
                alt=""
                className="main-image"
                width={306} height={172}
            />
            </div>
        </Link>
        <div className="content-sec">
            <Link href="service-view.php">
            <small>Catering</small>
            <h2>
                Green Leaf Foods&nbsp;
                <Image
                src="/images/icons/order-status_01.png"
                alt=""
                width={20}
                height={20}
                />
            </h2>
            <ul>
                <li>
                <Image
                    src="/images/icons/suggestion-map.png"
                    alt=""
                    width={15}
                    height={15}
                />
                from Visakhapatnam
                </li>
                <li>
                <Image
                    src="/images/icons/suggestions-rating.png"
                    alt=""
                    width={15}
                    height={15}
                />
                4.8 Rating
                </li>
            </ul>
            </Link>
            <Link href="wishlist.php" className="wishlist_con">
                <Image src="/images/icons/wishlist.svg" alt="" width={25} height={25} />
            </Link>
        </div>
        </div>
    </div>
  )
}

export default Service
