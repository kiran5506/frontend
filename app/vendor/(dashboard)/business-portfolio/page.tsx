"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { businessPortfolioByVendorId } from "@/services/business-portfolio-api";
import { toast } from "react-toastify";

const BusinessPortfolio = () => {
  const dispatch = useDispatch() as any;
  const { vendorAuth } = useSelector((state: any) => state);
  const vendorId = vendorAuth?.vendorid;
  const [portfolios, setPortfolios] = useState<any[]>([]);

  useEffect(() => {
    if (!vendorId) return;
    (dispatch as any)(businessPortfolioByVendorId(vendorId))
      .then((response: any) => {
        if (response?.payload?.status) {
          setPortfolios(response.payload.data || []);
        } else {
          setPortfolios([]);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching portfolios:", error);
        toast.error("Failed to load portfolios");
      });
  }, [dispatch, vendorId]);

  const rows = useMemo(() => {
    return portfolios.flatMap((portfolio: any) =>
      (portfolio.events || []).map((event: any) => ({
        portfolioId: portfolio._id,
        eventId: event.event_id?._id || event.event_id,
        eventName: event.event_id?.eventName || "Event",
        imagesCount: event.images?.length || 0,
        youtubeCount: event.youtube_media?.length || 0
      }))
    );
  }, [portfolios]);

  return (
    <>
        <div className="row mb-3 mb-md-0">
          <div className="col-12 col-md-8">
            <h2 className="page-title">Business Portfolio</h2>
          </div>
          <div className="col-12 col-md-4">
            <span style={{ margin: 3, float: "right" }}>
              <Link href="/vendor/business-portfolio/create" className="btn orange-btn btn-xs ">
                + Add Portfolio
              </Link>
            </span>
          </div>
        </div>
        <div className="row package-row">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="responsive-table-new table table-bordered text-start wallet-table">
                <thead>
                  <tr>
                    <th className="minn">S.No</th>
                    <th className="midd">EVENT NAME</th>
                    <th className="midd">Items</th>
                    <th className="midd">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length > 0 ? (
                    rows.map((row, index) => (
                      <tr key={`${row.portfolioId}-${row.eventId}`}
                        >
                        <td className="minn">{index + 1}</td>
                        <td className="midd">{row.eventName}</td>
                        <td className="midd">
                          Photos - {row.imagesCount} <br /> YouTube - {row.youtubeCount}
                        </td>
                        <td className="midd">
                          <Link
                            href={`/vendor/business-portfolio/create?eventId=${row.eventId}`}
                            className="btn btn-primary py-2 px-2"
                            style={{
                              fontSize: 15,
                              paddingLeft: "10px !important",
                              paddingRight: "10px !important",
                            }}
                          >
                            Manage
                            <img src="assets/img/btn-arrow.png" alt="" width={10} />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No portfolio entries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </>
  );
};

export default BusinessPortfolio;
