import React from 'react'
import Service from '../Service'

/**
 * @param {{
 *  title: string;
 *  profiles?: any[];
 *  loading?: boolean;
 *  emptyMessage?: string;
 *  wishlistIds?: string[];
 *  onToggleWishlist?: (profile: any) => void | Promise<void>;
 * }} props
 */
const Vendorslist = ({
  title,
  profiles,
  loading = false,
  emptyMessage = 'Vendors Not Found.',
  // @ts-ignore - default prop value for JS file consumed by TSX
  wishlistIds = [],
  onToggleWishlist = () => {}
}) => {
  const hasDynamicProfiles = Array.isArray(profiles);

  return (
    <section className="services-section2 py-5 bg-gray-color">
        <div className="container">
            <div className="main-title d-flex justify-content-between align-items-center">
                <h3>{title}</h3>
            </div>
            <div className="row d-flex justify-content-center">
                {hasDynamicProfiles ? (
                  loading ? (
                    <p>Loading...</p>
                  ) : profiles.length > 0 ? (
                    profiles.map((profile) => (
                      <Service
                        key={profile?._id}
                        profile={profile}
                        serviceDetails={null}
                        isWishlisted={wishlistIds.includes(profile?._id)}
                        onToggleWishlist={onToggleWishlist}
                      />
                    ))
                  ) : (
                    <p className="text-muted text-center">{emptyMessage}</p>
                  )
                ) : (
                  <>
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                  </>
                )}
            </div>
        </div>
    </section>
  )
}

export default Vendorslist
