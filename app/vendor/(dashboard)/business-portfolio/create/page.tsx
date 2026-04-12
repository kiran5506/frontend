"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { businessProfileByVendorId } from "@/services/business-profile-api";
import { eventByServiceId } from "@/services/event-api";
import { serviceList } from "@/services/service-api";
import { createBusinessPortfolio, businessPortfolioByVendorId, businessPortfolioDeleteMedia } from "@/services/business-portfolio-api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const CreateBusinessPortfolio = () => {
  const dispatch = useDispatch() as any;
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditingEvent = Boolean(searchParams?.get('eventId'));
  const { vendorAuth } = useSelector((state: any) => state);
  const vendorId = vendorAuth?.vendorid;
  const { Services } = useSelector((state: any) => state.service);

  const [businessProfileId, setBusinessProfileId] = useState<string>("");
  const [serviceId, setServiceId] = useState<string>("");
  const [events, setEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [eventFiles, setEventFiles] = useState<Record<string, { images: File[]; videos: File[] }>>({});
  const [eventPreviews, setEventPreviews] = useState<Record<string, { images: string[]; videos: string[] }>>({});
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [existingEventIds, setExistingEventIds] = useState<string[]>([]);
  const [eventMediaMap, setEventMediaMap] = useState<Record<string, { images: string[]; videos: string[]; portfolioId: string }>>({});

  const getProxyUrl = (url: string) => {
    if (!url) return url;
    if (url.startsWith('data:') || url.startsWith('/assets') || url.startsWith('blob:')) {
      return url;
    }
    if (url.startsWith('http')) {
      return `/api/image-proxy?url=${encodeURIComponent(url)}`;
    }
    return url;
  };

  const selectedService = useMemo(() => {
    return Services?.find((service: any) => service._id === serviceId);
  }, [Services, serviceId]);

  useEffect(() => {
    (dispatch as any)(serviceList());
  }, [dispatch]);

  useEffect(() => {
    if (!vendorId) return;

    (dispatch as any)(businessProfileByVendorId(vendorId))
      .then((response: any) => {
        if (response?.payload?.status && response?.payload?.data?.length) {
          const profileData = response.payload.data[0];
          setBusinessProfileId(profileData?._id || "");
          setServiceId(profileData?.service_id?._id || profileData?.service_id || "");
        } else {
          toast.info("No business profile found for this vendor.");
        }
      })
      .catch((error: any) => {
        console.error("Error fetching business profile:", error);
        toast.error("Failed to load business profile data.");
      });
  }, [dispatch, vendorId]);

  useEffect(() => {
    if (!vendorId) return;
    (dispatch as any)(businessPortfolioByVendorId(vendorId))
      .then((response: any) => {
        if (response?.payload?.status && response?.payload?.data?.length) {
          const eventIds = response.payload.data.flatMap((portfolio: any) =>
            portfolio.events?.map((event: any) => event.event_id?._id || event.event_id)
          );
          setExistingEventIds(eventIds.filter(Boolean));

          const mediaMap: Record<string, { images: string[]; videos: string[]; portfolioId: string }> = {};
          response.payload.data.forEach((portfolio: any) => {
            portfolio.events?.forEach((event: any) => {
              const eventId = event.event_id?._id || event.event_id;
              if (eventId) {
                mediaMap[eventId] = {
                  images: event.images || [],
                  videos: event.videos || [],
                  portfolioId: portfolio._id
                };
              }
            });
          });
          setEventMediaMap(mediaMap);
        } else {
          setExistingEventIds([]);
          setEventMediaMap({});
        }
      })
      .catch((error: any) => {
        console.error("Error fetching portfolios:", error);
      });
  }, [dispatch, vendorId]);

  useEffect(() => {
    const eventId = searchParams?.get('eventId');
    if (eventId) {
      setSelectedEvent(eventId);
    }
  }, [searchParams]);

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
      .catch((error: any) => {
        console.error("Error fetching events:", error);
        toast.error("Failed to load events.");
        setEvents([]);
      })
      .finally(() => setLoadingEvents(false));
  }, [dispatch, serviceId]);

  const handleEventFiles = (
    eventId: string,
    type: "images" | "videos",
    files: FileList | null
  ) => {
    const nextFiles = Array.from(files || []);
    setEventFiles((prev) => ({
      ...prev,
      [eventId]: {
        images: type === "images" ? nextFiles : prev[eventId]?.images || [],
        videos: type === "videos" ? nextFiles : prev[eventId]?.videos || [],
      },
    }));
    setEventPreviews((prev) => ({
      ...prev,
      [eventId]: {
        images:
          type === "images"
            ? nextFiles.map((file) => URL.createObjectURL(file))
            : prev[eventId]?.images || [],
        videos:
          type === "videos"
            ? nextFiles.map((file) => URL.createObjectURL(file))
            : prev[eventId]?.videos || [],
      },
    }));
  };

  const handleRemoveEventFile = (
    eventId: string,
    type: "images" | "videos",
    index: number
  ) => {
    setEventFiles((prev) => {
      const current = prev[eventId] || { images: [], videos: [] };
      const updated = {
        ...current,
        [type]: current[type].filter((_, idx) => idx !== index),
      } as { images: File[]; videos: File[] };
      return { ...prev, [eventId]: updated };
    });
    setEventPreviews((prev) => {
      const current = prev[eventId] || { images: [], videos: [] };
      const updated = {
        ...current,
        [type]: current[type].filter((_, idx) => idx !== index),
      } as { images: string[]; videos: string[] };
      return { ...prev, [eventId]: updated };
    });
  };

  const handleDeleteExistingMedia = async (eventId: string, type: 'image' | 'video', file: string) => {
    const portfolioId = eventMediaMap[eventId]?.portfolioId;
    if (!portfolioId || !vendorId) {
      toast.error('Portfolio details not found.');
      return;
    }

    try {
      const response = await (dispatch as any)(
        businessPortfolioDeleteMedia({
          id: portfolioId,
          vendor_id: vendorId,
          event_id: eventId,
          type,
          file
        } as any)
      ).unwrap();

      if (response?.status && response?.data) {
        const updatedMap = { ...eventMediaMap };
        response.data.events?.forEach((event: any) => {
          const updatedId = event.event_id?._id || event.event_id;
          if (updatedId) {
            updatedMap[updatedId] = {
              images: event.images || [],
              videos: event.videos || [],
              portfolioId
            };
          }
        });
        setEventMediaMap(updatedMap);
        toast.success('Media deleted successfully.');
      } else {
        toast.error(response?.message || 'Failed to delete media.');
      }
    } catch (error: any) {
      console.error('Delete media error:', error);
      toast.error(error?.message || 'Failed to delete media.');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!vendorId || !businessProfileId || !serviceId) {
      toast.error("Business profile details are missing.");
      return;
    }

    if (!selectedEvent) {
      toast.error("Please select an event.");
      return;
    }

    const formData = new FormData();
    formData.append("vendor_id", vendorId);
    formData.append("business_profile_id", businessProfileId);
    formData.append("service_id", serviceId);
    formData.append(
      "events",
      JSON.stringify([{ event_id: selectedEvent }])
    );

    const files = eventFiles[selectedEvent];
    if (files?.images?.length) {
      files.images.forEach((file) => formData.append(`images_${selectedEvent}`, file));
    }
    if (files?.videos?.length) {
      files.videos.forEach((file) => formData.append(`videos_${selectedEvent}`, file));
    }

    try {
      const response = await (dispatch as any)(createBusinessPortfolio(formData as any)).unwrap();
      if (response?.status) {
        toast.success("Portfolio created successfully.");
        router.push("/vendor/business-portfolio");
      } else {
        toast.error(response?.message || "Failed to create portfolio.");
      }
    } catch (error: any) {
      console.error("Create portfolio error:", error);
      toast.error(error?.message || "Failed to create portfolio.");
    }
  };

  return (
    <>
      <h2 className="page-title">Add Business Portfolio</h2>
      <div className="col-12 col-lg-10">
        <form className="row g-3" onSubmit={handleSubmit}>
          <input type="hidden" value={businessProfileId} readOnly />
          <div className="col-12 col-md-6">
            <label className="form-label">Service</label>
            <select className="form-select" value={serviceId} disabled>
              <option value="">Select service</option>
              {Services?.map((service: any) => (
                <option key={service._id} value={service._id}>
                  {service.serviceName}
                </option>
              ))}
            </select>
            {selectedService && (
              <small className="text-muted">
                {selectedService.serviceName} - {selectedService.serviceType}
              </small>
            )}
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label">Select Event</label>
            <select
              className="form-select"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              disabled={isEditingEvent}
            >
              <option value="">Choose Event</option>
              {events.map((eventItem) => (
                  <option key={eventItem._id} value={eventItem._id}>
                    {eventItem.eventName}
                  </option>
                ))}
            </select>
          </div>

          <div className="col-12">
            <h4 className="mt-3">Events</h4>
            {loadingEvents ? (
              <p>Loading events...</p>
            ) : events.length > 0 ? (
              <div className="row">
                {selectedEvent && (
                  <div className="col-12 mb-4">
                    <div className="border rounded-3 p-3">
                      <h5 className="mb-3">
                        {events.find((eventItem) => eventItem._id === selectedEvent)?.eventName}
                      </h5>
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">Upload Images</label>
                          <input
                            type="file"
                            className="form-control"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleEventFiles(selectedEvent, "images", e.target.files)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Upload Videos</label>
                          <input
                            type="file"
                            className="form-control"
                            multiple
                            accept="video/*"
                            onChange={(e) => handleEventFiles(selectedEvent, "videos", e.target.files)}
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-12">
                          <h6>Images</h6>
                          <div className="row">
                            {(eventMediaMap[selectedEvent]?.images || []).map((image, index) => (
                              <div className="col-6 col-lg-3 mb-3" key={`existing-image-${index}`}>
                                <div className="position-relative">
                                  <img
                                    src={getProxyUrl(image)}
                                    alt={`Existing image ${index + 1}`}
                                    className="w-100"
                                    style={{ height: 120, objectFit: 'cover', borderRadius: 8 }}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2"
                                    style={{ borderRadius: '50%', width: 28, height: 28, padding: 0 }}
                                    onClick={() => handleDeleteExistingMedia(selectedEvent, 'image', image)}
                                    aria-label="Remove image"
                                  >
                                    &times;
                                  </button>
                                </div>
                              </div>
                            ))}
                            {(eventPreviews[selectedEvent]?.images || []).map((image, index) => (
                              <div className="col-6 col-lg-3 mb-3" key={`event-image-${index}`}>
                                <div className="position-relative">
                                  <img
                                    src={image}
                                    alt={`Event image ${index + 1}`}
                                    className="w-100"
                                    style={{ height: 120, objectFit: 'cover', borderRadius: 8 }}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                                    style={{ borderRadius: '50%', width: 28, height: 28, padding: 0 }}
                                    onClick={() => handleRemoveEventFile(selectedEvent, "images", index)}
                                    aria-label="Remove image"
                                  >
                                    &times;
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="col-12 mt-3">
                          <h6>Videos</h6>
                          <div className="row">
                            {(eventMediaMap[selectedEvent]?.videos || []).map((video, index) => (
                              <div className="col-12 col-lg-4 mb-3" key={`existing-video-${index}`}>
                                <div className="position-relative">
                                  <video
                                    src={getProxyUrl(video)}
                                    controls
                                    className="w-100"
                                    style={{ height: 160, borderRadius: 8 }}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2"
                                    style={{ borderRadius: '50%', width: 28, height: 28, padding: 0 }}
                                    onClick={() => handleDeleteExistingMedia(selectedEvent, 'video', video)}
                                    aria-label="Remove video"
                                  >
                                    &times;
                                  </button>
                                </div>
                              </div>
                            ))}
                            {(eventPreviews[selectedEvent]?.videos || []).map((video, index) => (
                              <div className="col-12 col-lg-4 mb-3" key={`event-video-${index}`}>
                                <div className="position-relative">
                                  <video
                                    src={video}
                                    controls
                                    className="w-100"
                                    style={{ height: 160, borderRadius: 8 }}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                                    style={{ borderRadius: '50%', width: 28, height: 28, padding: 0 }}
                                    onClick={() => handleRemoveEventFile(selectedEvent, "videos", index)}
                                    aria-label="Remove video"
                                  >
                                    &times;
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p>No events available for this service.</p>
            )}
          </div>

          <div className="col-12">
            <button type="submit" className="btn orange-btn">
              {isEditingEvent ? 'Update Portfolio' : 'Create Portfolio'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateBusinessPortfolio;
