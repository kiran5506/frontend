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
import { FiEdit2, FiTrash2 } from "react-icons/fi";

type YoutubeMediaFormRow = {
  youtube_url: string;
};

type ExistingYoutubeMedia = {
  youtube_url: string;
};

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
  const [eventFiles, setEventFiles] = useState<Record<string, { images: File[] }>>({});
  const [eventPreviews, setEventPreviews] = useState<Record<string, { images: string[] }>>({});
  const [eventYoutubeMap, setEventYoutubeMap] = useState<Record<string, YoutubeMediaFormRow[]>>({});
  const [eventYoutubeDraftMap, setEventYoutubeDraftMap] = useState<Record<string, YoutubeMediaFormRow>>({});
  const [eventYoutubeEditIndex, setEventYoutubeEditIndex] = useState<Record<string, number | null>>({});
  const [eventYoutubePageMap, setEventYoutubePageMap] = useState<Record<string, number>>({});
  const [existingYoutubePageMap, setExistingYoutubePageMap] = useState<Record<string, number>>({});
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [existingEventIds, setExistingEventIds] = useState<string[]>([]);
  const [eventMediaMap, setEventMediaMap] = useState<Record<string, { images: string[]; youtube_media: ExistingYoutubeMedia[]; portfolioId: string }>>({});

  const getDefaultYoutubeRow = (): YoutubeMediaFormRow => ({
    youtube_url: '',
  });

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

  const getYoutubeEmbedUrl = (rawUrl: string) => {
    if (!rawUrl) return '';
    if (rawUrl.includes('youtube.com/embed/')) return rawUrl;
    if (rawUrl.includes('watch?v=')) return rawUrl.replace('watch?v=', 'embed/');
    if (rawUrl.includes('youtu.be/')) return rawUrl.replace('youtu.be/', 'www.youtube.com/embed/');
    return rawUrl;
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

          const mediaMap: Record<string, { images: string[]; youtube_media: ExistingYoutubeMedia[]; portfolioId: string }> = {};
          response.payload.data.forEach((portfolio: any) => {
            portfolio.events?.forEach((event: any) => {
              const eventId = event.event_id?._id || event.event_id;
              if (eventId) {
                mediaMap[eventId] = {
                  images: event.images || [],
                  youtube_media: event.youtube_media || [],
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
    if (!selectedEvent) return;
    setEventYoutubeDraftMap((prev) => ({
      ...prev,
      [selectedEvent]: prev[selectedEvent] || getDefaultYoutubeRow(),
    }));
    setEventYoutubeEditIndex((prev) => ({
      ...prev,
      [selectedEvent]: prev[selectedEvent] ?? null,
    }));
    setEventYoutubePageMap((prev) => ({
      ...prev,
      [selectedEvent]: prev[selectedEvent] || 1,
    }));
    setExistingYoutubePageMap((prev) => ({
      ...prev,
      [selectedEvent]: prev[selectedEvent] || 1,
    }));
  }, [selectedEvent]);

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

  const handleEventFiles = (eventId: string, files: FileList | null) => {
    const nextFiles = Array.from(files || []);
    setEventFiles((prev) => ({
      ...prev,
      [eventId]: {
        images: nextFiles,
      },
    }));
    setEventPreviews((prev) => ({
      ...prev,
      [eventId]: {
        images: nextFiles.map((file) => URL.createObjectURL(file)),
      },
    }));
  };

  const handleYoutubeUrlChange = (eventId: string, value: string) => {
    setEventYoutubeDraftMap((prev) => ({
      ...prev,
      [eventId]: {
        ...(prev[eventId] || getDefaultYoutubeRow()),
        youtube_url: value,
      },
    }));
  };

  const handlePublishYoutubeRecord = (eventId: string) => {
    const draft = eventYoutubeDraftMap[eventId] || getDefaultYoutubeRow();
    if (!draft.youtube_url.trim()) {
      toast.error('Please enter YouTube URL.');
      return;
    }

    const editIndex = eventYoutubeEditIndex[eventId];
    let updatedLength = 0;
    setEventYoutubeMap((prev) => {
      const currentRows = prev[eventId] || [];
      if (editIndex !== null && editIndex !== undefined && editIndex >= 0 && editIndex < currentRows.length) {
        const updatedRows = [...currentRows];
        updatedRows[editIndex] = draft;
        updatedLength = updatedRows.length;
        return { ...prev, [eventId]: updatedRows };
      }
      updatedLength = currentRows.length + 1;
      return {
        ...prev,
        [eventId]: [...currentRows, draft],
      };
    });

    if (editIndex === null || editIndex === undefined) {
      setEventYoutubePageMap((prev) => ({
        ...prev,
        [eventId]: Math.max(1, Math.ceil(updatedLength / 3)),
      }));
    }

    setEventYoutubeDraftMap((prev) => ({
      ...prev,
      [eventId]: getDefaultYoutubeRow(),
    }));
    setEventYoutubeEditIndex((prev) => ({
      ...prev,
      [eventId]: null,
    }));
  };

  const handleEditYoutubeRecord = (eventId: string, rowIndex: number) => {
    const row = (eventYoutubeMap[eventId] || [])[rowIndex];
    if (!row) return;

    setEventYoutubeDraftMap((prev) => ({
      ...prev,
      [eventId]: row,
    }));
    setEventYoutubeEditIndex((prev) => ({
      ...prev,
      [eventId]: rowIndex,
    }));
  };

  const removeYoutubeMediaRow = (eventId: string, rowIndex: number) => {
    let remaining = 0;
    setEventYoutubeMap((prev) => {
      const rows = (prev[eventId] || []).filter((_, index) => index !== rowIndex);
      remaining = rows.length;
      return {
        ...prev,
        [eventId]: rows,
      };
    });
    setEventYoutubeEditIndex((prev) => {
      const currentEditIndex = prev[eventId];
      if (currentEditIndex === rowIndex) {
        return { ...prev, [eventId]: null };
      }
      return prev;
    });
    setEventYoutubePageMap((prev) => {
      const next = { ...prev };
      const currentPage = next[eventId] || 1;
      const totalPages = Math.max(1, Math.ceil(remaining / 3));
      next[eventId] = Math.min(currentPage, totalPages);
      return next;
    });
  };

  const handleRemoveEventFile = (
    eventId: string,
    type: "images",
    index: number
  ) => {
    setEventFiles((prev) => {
      const current = prev[eventId] || { images: [] };
      const updated = {
        ...current,
        [type]: current[type].filter((_, idx) => idx !== index),
      } as { images: File[] };
      return { ...prev, [eventId]: updated };
    });
    setEventPreviews((prev) => {
      const current = prev[eventId] || { images: [] };
      const updated = {
        ...current,
        [type]: current[type].filter((_, idx) => idx !== index),
      } as { images: string[] };
      return { ...prev, [eventId]: updated };
    });
  };

  const handleDeleteExistingMedia = async (
    eventId: string,
    type: 'image' | 'youtube_media',
    file: string,
    index?: number
  ) => {
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
          file,
          index
        } as any)
      ).unwrap();

      if (response?.status && response?.data) {
        const updatedMap = { ...eventMediaMap };
        response.data.events?.forEach((event: any) => {
          const updatedId = event.event_id?._id || event.event_id;
          if (updatedId) {
            updatedMap[updatedId] = {
              images: event.images || [],
              youtube_media: event.youtube_media || [],
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
    const youtubeRows = (eventYoutubeMap[selectedEvent] || []).filter(
      (row) => row.youtube_url.trim()
    );

    formData.set(
      "events",
      JSON.stringify([
        {
          event_id: selectedEvent,
          youtube_media: youtubeRows.map((row) => ({
            youtube_url: row.youtube_url.trim(),
          })),
        },
      ])
    );

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

  const selectedYoutubeRows = selectedEvent
    ? (eventYoutubeMap[selectedEvent] || [])
    : [];
  const selectedYoutubePage = selectedEvent ? (eventYoutubePageMap[selectedEvent] || 1) : 1;
  const selectedYoutubeTotalPages = Math.max(1, Math.ceil(selectedYoutubeRows.length / 3));
  const pagedSelectedYoutubeRows = selectedYoutubeRows.slice((selectedYoutubePage - 1) * 3, selectedYoutubePage * 3);

  const existingYoutubeRows = selectedEvent
    ? (eventMediaMap[selectedEvent]?.youtube_media || [])
    : [];
  const existingYoutubePage = selectedEvent ? (existingYoutubePageMap[selectedEvent] || 1) : 1;
  const existingYoutubeTotalPages = Math.max(1, Math.ceil(existingYoutubeRows.length / 3));
  const pagedExistingYoutubeRows = existingYoutubeRows.slice((existingYoutubePage - 1) * 3, existingYoutubePage * 3);

  const selectedYoutubeDraft = selectedEvent
    ? (eventYoutubeDraftMap[selectedEvent] || getDefaultYoutubeRow())
    : getDefaultYoutubeRow();

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
                        <div className="col-md-12">
                          <label className="form-label">Upload Images</label>
                          <input
                            type="file"
                            className="form-control"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleEventFiles(selectedEvent, e.target.files)}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="form-label mb-2">YouTube Records</label>
                          <div className="row g-2 align-items-end mb-3">
                            <div className="col-12 col-md-10">
                              <label className="form-label">YouTube URL</label>
                              <input
                                type="url"
                                className="form-control"
                                placeholder="https://www.youtube.com/watch?v=..."
                                value={selectedYoutubeDraft.youtube_url}
                                onChange={(e) => handleYoutubeUrlChange(selectedEvent, e.target.value)}
                              />
                            </div>
                            <div className="col-12 col-md-2 d-grid">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handlePublishYoutubeRecord(selectedEvent)}
                              >
                                Add
                              </button>
                            </div>
                          </div>

                          <div className="table-responsive">
                            <table className="table table-bordered align-middle mb-0">
                              <thead>
                                <tr>
                                  <th>YouTube URL</th>
                                  <th style={{ width: 140 }}>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {pagedSelectedYoutubeRows.length > 0 ? (
                                  pagedSelectedYoutubeRows.map((row, indexOnPage) => {
                                    const rowIndex = (selectedYoutubePage - 1) * 3 + indexOnPage;
                                    return (
                                    <tr key={`youtube-row-${rowIndex}`}>
                                      <td>
                                        {row.youtube_url ? (
                                          <a href={row.youtube_url} target="_blank" rel="noopener noreferrer" className="text-break">
                                            {row.youtube_url}
                                          </a>
                                        ) : (
                                          <span className="text-muted">-</span>
                                        )}
                                      </td>
                                      <td>
                                        <div className="d-flex gap-2">
                                          <button
                                            type="button"
                                            className="btn btn-sm btn-success"
                                            onClick={() => handleEditYoutubeRecord(selectedEvent, rowIndex)}
                                            aria-label="Edit YouTube record"
                                          >
                                            <FiEdit2 />
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-sm btn-danger"
                                            onClick={() => removeYoutubeMediaRow(selectedEvent, rowIndex)}
                                            aria-label="Delete YouTube record"
                                          >
                                            <FiTrash2 />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  )})
                                ) : (
                                  <tr>
                                    <td colSpan={2} className="text-center text-muted">No YouTube records added.</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                          {selectedYoutubeTotalPages > 1 && (
                            <div className="d-flex justify-content-end align-items-center gap-2 mt-2">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                disabled={selectedYoutubePage === 1}
                                onClick={() => setEventYoutubePageMap((prev) => ({ ...prev, [selectedEvent]: Math.max(1, selectedYoutubePage - 1) }))}
                              >
                                Prev
                              </button>
                              <span className="small text-muted">Page {selectedYoutubePage} of {selectedYoutubeTotalPages}</span>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                disabled={selectedYoutubePage === selectedYoutubeTotalPages}
                                onClick={() => setEventYoutubePageMap((prev) => ({ ...prev, [selectedEvent]: Math.min(selectedYoutubeTotalPages, selectedYoutubePage + 1) }))}
                              >
                                Next
                              </button>
                            </div>
                          )}
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
                          <h6>YouTube Media</h6>
                          <div className="row">
                            {pagedExistingYoutubeRows.map((media, mediaIndexOnPage) => {
                              const mediaIndex = (existingYoutubePage - 1) * 3 + mediaIndexOnPage;
                              const embedUrl = getYoutubeEmbedUrl(media.youtube_url);
                              return (
                              <div className="col-12 col-md-4 mb-3" key={`existing-youtube-${mediaIndex}`}>
                                <div className="border rounded p-2">
                                  {embedUrl && (
                                    <div
                                      className="mb-2"
                                      style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 8 }}
                                    >
                                      <iframe
                                        src={embedUrl}
                                        title={`YouTube media ${mediaIndex + 1}`}
                                        frameBorder={0}
                                        allowFullScreen
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                      />
                                    </div>
                                  )}
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleDeleteExistingMedia(selectedEvent, 'youtube_media', media.youtube_url, mediaIndex)}
                                    aria-label="Remove YouTube record"
                                  >
                                    <FiTrash2 /> Delete
                                  </button>
                                </div>
                              </div>
                            )})}
                            {pagedExistingYoutubeRows.length === 0 && (
                              <p className="text-muted mb-0">No existing YouTube records.</p>
                            )}
                          </div>
                          {existingYoutubeTotalPages > 1 && (
                            <div className="d-flex justify-content-end align-items-center gap-2 mt-2">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                disabled={existingYoutubePage === 1}
                                onClick={() => setExistingYoutubePageMap((prev) => ({ ...prev, [selectedEvent]: Math.max(1, existingYoutubePage - 1) }))}
                              >
                                Prev
                              </button>
                              <span className="small text-muted">Page {existingYoutubePage} of {existingYoutubeTotalPages}</span>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                disabled={existingYoutubePage === existingYoutubeTotalPages}
                                onClick={() => setExistingYoutubePageMap((prev) => ({ ...prev, [selectedEvent]: Math.min(existingYoutubeTotalPages, existingYoutubePage + 1) }))}
                              >
                                Next
                              </button>
                            </div>
                          )}
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
