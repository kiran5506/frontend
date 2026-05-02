"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { businessProfileByVendorId } from "@/services/business-profile-api";
import { eventByServiceId } from "@/services/event-api";
import { serviceList } from "@/services/service-api";
import { cityList } from "@/services/city-api";
import {
  businessPackageById,
  businessPackageEdit,
  createBusinessPackage
} from "@/services/business-package-api";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const emptyPricingRow = {
  city: "",
  marketPrice: "",
  offerPrice: "",
  discount: ""
};

const calculateDiscount = (marketPrice: string, offerPrice: string): string => {
  const market = Number(marketPrice);
  const offer = Number(offerPrice);

  if (!market || market <= 0 || Number.isNaN(market) || Number.isNaN(offer) || offer < 0) {
    return "";
  }

  const discount = ((market - offer) / market) * 100;
  const normalized = Math.round(Math.max(0, discount) * 100) / 100;
  return normalized.toString();
};

const CreateBusinessPackagesPage = () => {
  const dispatch = useDispatch() as any;
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams?.get("packageId") || "";
  const isEditing = Boolean(packageId);

  const { vendorAuth } = useSelector((state: any) => state);
  const { Services } = useSelector((state: any) => state.service);
  const { Cities } = useSelector((state: any) => state.city);

  const vendorId = vendorAuth?.vendorid;

  const [serviceId, setServiceId] = useState<string>("");
  const [eventId, setEventId] = useState<string>("");
  const [events, setEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(false);

  const [packageName, setPackageName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [cityPricing, setCityPricing] = useState<any[]>([]);
  const [pricingDraft, setPricingDraft] = useState<any>({ ...emptyPricingRow });

  const selectedService = useMemo(() => {
    return Services?.find((service: any) => service._id === serviceId);
  }, [Services, serviceId]);

  useEffect(() => {
    (dispatch as any)(serviceList());
    (dispatch as any)(cityList());
  }, [dispatch]);

  useEffect(() => {
    if (!vendorId) return;
    (dispatch as any)(businessProfileByVendorId(vendorId))
      .then((response: any) => {
        if (response?.payload?.status && response?.payload?.data?.length) {
          const profileData = response.payload.data[0];
          setServiceId(profileData?.service_id?._id || profileData?.service_id || "");
        } else {
          toast.info("No business profile found for this vendor.");
        }
      })
      .catch(() => {
        toast.error("Failed to load business profile data.");
      });
  }, [dispatch, vendorId]);

  useEffect(() => {
    if (!serviceId) return;
    setLoadingEvents(true);
  (dispatch as any)(eventByServiceId(serviceId as any))
      .then((response: any) => {
        if (response?.payload?.status) {
          setEvents(response.payload.data || []);
        } else {
          setEvents([]);
        }
      })
      .catch(() => {
        toast.error("Failed to load events.");
        setEvents([]);
      })
      .finally(() => setLoadingEvents(false));
  }, [dispatch, serviceId]);

  useEffect(() => {
    if (!isEditing || !packageId) return;
  (dispatch as any)(businessPackageById(packageId as any))
      .then((response: any) => {
        if (response?.payload?.status) {
          const data = response.payload.data;
          setEventId(data?.event_id?._id || data?.event_id || "");
          setPackageName(data?.packageName || "");
          setDescription(data?.description || "");
          const pricingRows = (data?.cityPricing || []).map((item: any) => ({
            city: item.city || "",
            marketPrice: item.marketPrice?.toString() || "",
            offerPrice: item.offerPrice?.toString() || "",
            discount: item.discount?.toString() || ""
          }));
          setCityPricing(pricingRows);
          setPricingDraft({ ...emptyPricingRow });
          if (data?.coverImage) {
            setCoverPreview(data.coverImage);
          }
        }
      })
      .catch(() => {
        toast.error("Failed to load package data.");
      });
  }, [dispatch, isEditing, packageId]);

  const handleCoverImage = (file: File | null) => {
    setCoverImage(file);
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handlePricingChange = (field: string, value: string) => {
    setPricingDraft((prev: any) => {
      const nextDraft = { ...prev, [field]: value };
      if (field === "marketPrice" || field === "offerPrice") {
        nextDraft.discount = calculateDiscount(nextDraft.marketPrice, nextDraft.offerPrice);
      }
      return nextDraft;
    });
  };

  const handleAddPricingRow = () => {
    if (!pricingDraft.city) {
      toast.error("Please select a city before adding.");
      return;
    }

    const market = Number(pricingDraft.marketPrice);
    const offer = Number(pricingDraft.offerPrice);

    if (!market || market <= 0) {
      toast.error("Please enter a valid market price.");
      return;
    }

    if (offer < 0) {
      toast.error("Offer price cannot be negative.");
      return;
    }

    if (offer > market) {
      toast.error("Offer price cannot be greater than market price.");
      return;
    }

    setCityPricing((prev) => [...prev, { ...pricingDraft }]);
    setPricingDraft({ ...emptyPricingRow });
  };

  const handleRemovePricingRow = (index: number) => {
    setCityPricing((prev) => prev.filter((_, rowIndex) => rowIndex !== index));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!vendorId) {
      toast.error("Vendor ID not found. Please login again.");
      return;
    }
    if (!eventId) {
      toast.error("Please select an event.");
      return;
    }

    const filteredPricing = cityPricing.filter((row) => row.city);
    if (filteredPricing.length === 0) {
      toast.error("Please add at least one city pricing entry using Add.");
      return;
    }

    const formData = new FormData();
    formData.append("vendor_id", vendorId);
    if (serviceId) {
      formData.append("service_id", serviceId);
    }
    formData.append("event_id", eventId);
    formData.append("packageName", packageName);
    formData.append("description", description);
    formData.append("cityPricing", JSON.stringify(filteredPricing));
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      const response = isEditing
        ? await (dispatch as any)(businessPackageEdit({ id: packageId, formData } as any)).unwrap()
        : await (dispatch as any)(createBusinessPackage(formData as any)).unwrap();

      if (response?.status) {
        toast.success(response?.message || "Business package saved successfully.");
        router.push("/vendor/business-packages");
      } else {
        toast.error(response?.message || "Failed to save business package.");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong while saving.");
    }
  };

  return (
    <>
      <div className="row mb-3">
        <div className="col-12">
          <h2 className="page-title">{isEditing ? "Edit Package" : "Add Packages"}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Choose Service Category*</label>
            <select
              className="form-select"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              disabled={true}
            >
              <option value="">Select</option>
              {Services?.map((service: any) => (
                <option key={service._id} value={service._id}>
                  {service.serviceName} - {service.serviceType}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Choose Event*</label>
            <select
              className="form-select"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              disabled={loadingEvents || !serviceId}
            >
              <option value="">Select</option>
              {events.map((evt) => (
                <option key={evt._id} value={evt._id}>
                  {evt.eventName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gray mt-3 p-3 rounded">
          <div className="row g-3 d-flex align-items-center">
            <div className="col-md-5">
              <label className="form-label">Package Name (Optional)</label>
              <input
                type="text"
                className="form-control"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                placeholder="Enter Package Name"
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Upload Cover Image</label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={(e) => handleCoverImage(e.target.files?.[0] || null)}
              />
            </div>
            <div className="col-md-3">
              {coverPreview ? (
                <img alt="" src={coverPreview} style={{ height: 70, objectFit: "cover", objectPosition: "top" }} />
              ) : (
                <div className="text-muted">No image</div>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">Package Details</label>
              <textarea
                className="form-control rounded-4"
                placeholder="Write Package Details"
                style={{ height: 100 }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="row g-3 mt-3">
            <div className="col-12">
              <div style={{ overflowX: "auto" }}>
                <table className="table table-bordered mytabll">
                  <thead>
                    <tr>
                      <th>City</th>
                      <th>Market Price</th>
                      <th>Offer Price</th>
                      <th>Discount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <select
                          className="form-select"
                          value={pricingDraft.city}
                          onChange={(e) => handlePricingChange("city", e.target.value)}
                        >
                          <option value="">Select City</option>
                          {Cities?.map((city: any) => (
                            <option key={city._id} value={city.cityName || city.name || city.city}>
                              {city.cityName || city.name || city.city}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={pricingDraft.marketPrice}
                          onChange={(e) => handlePricingChange("marketPrice", e.target.value)}
                          placeholder="Enter"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={pricingDraft.offerPrice}
                          onChange={(e) => handlePricingChange("offerPrice", e.target.value)}
                          placeholder="Enter"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={pricingDraft.discount}
                          disabled
                          readOnly
                          placeholder="%"
                        />
                      </td>
                      <td>
                        <button type="button" className="btn btn-primary" onClick={handleAddPricingRow}>
                          Add
                        </button>
                      </td>
                    </tr>
                    {cityPricing.map((row, index) => (
                      <tr key={`pricing-${index}`}>
                        <td>{row.city || "-"}</td>
                        <td>₹{row.marketPrice || 0}</td>
                        <td>₹{row.offerPrice || 0}</td>
                        <td>{row.discount || 0}%</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleRemovePricingRow(index)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="text-left">
            <button type="submit" className="btn orange-btn">
              {isEditing ? "Update Package" : "Add New Package"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateBusinessPackagesPage;
