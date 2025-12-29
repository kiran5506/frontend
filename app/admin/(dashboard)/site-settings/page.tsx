"use client"
import React, { useEffect, useState } from 'react'
import { set, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useRouter } from 'next/dist/client/components/navigation';
import { useDispatch } from 'react-redux';
import { getSiteSettings, updateSiteSettings } from '@/services/admin-api';
import { toast } from 'react-toastify';

const SiteSettingsPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    let id = "694e6ca8aa5aae1acb87f836";

    const [logoPreview, setLogoPreview] = useState("");
    const [footerLogoPreview, setFooterLogoPreview] = useState("");
    const [faviconPreview, setFaviconPreview] = useState("");

    const validationSchema = Yup.object().shape({
        logo: Yup.mixed().required("Logo is required"),
        footer_logo: Yup.mixed().required("Footer logo is required"),
        page_title: Yup.string().required("Page title is required"),
        mobile_number: Yup.string().required("Mobile number is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        whatsapp_number: Yup.string().required("Whatsapp number is required"),
        address: Yup.string().required("Address is required"),
        why_bsfye: Yup.string().required("Why Bsfye? is required"),
        favicon: Yup.mixed().required("Favicon is required"),
        facebook_url: Yup.string().url("Invalid URL").optional(),
        twitter_url: Yup.string().url("Invalid URL").optional(),
        instagram_url: Yup.string().url("Invalid URL").optional(),
        youtube_url: Yup.string().url("Invalid URL").optional(),
        linkdin_url: Yup.string().url("Invalid URL").optional(),
        google_analytics: Yup.string().optional(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await (dispatch as any)(getSiteSettings(id as any));
            if (response.payload.status) {
                const settings = response.payload.data;
                setValue("page_title", settings.page_title);
                setValue("mobile_number", settings.mobile_number);
                setValue("email", settings.email);
                setValue("whatsapp_number", settings.whatsapp_number);
                setValue("address", settings.address);
                setValue("facebook_url", settings.facebook_url);
                setValue("twitter_url", settings.twitter_url);
                setValue("instagram_url", settings.instagram_url);
                setValue("youtube_url", settings.youtube_url);
                setValue("linkdin_url", settings.linkdin_url);
                setValue("why_bsfye", settings.why_bsfye);
                setValue("google_analytics", settings.google_analytics);
                setLogoPreview(settings.logo);
                setFooterLogoPreview(settings.footer_logo);
                setFaviconPreview(settings.favicon);
            }else {
                toast.error('Failed to fetch settings: ' + (response.payload?.message || 'Unknown error'));
            }
        } catch (error) {
            toast.error('Error fetching settings: ' + (error as any).message || 'An error occurred while fetching settings.');
        }
    }

    const onSubmit =  async (data: any) => {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (data[key]) {
                    if (data[key] instanceof FileList && data[key].length > 0) {
                        formData.append(key, data[key][0]);
                    } else if (!(data[key] instanceof FileList)) {
                        formData.append(key, data[key]);
                    }
                }
            });

            const response = await (dispatch as any)(updateSiteSettings({ id, settingsData: formData } as any)).unwrap();
            if (response?.status) {
                toast.success('Settings updated successfully!');
                fetchSettings();
            } else {
                toast.error('Failed to update settings: ' + (response?.message || 'Unknown error'));
            }
        } catch (error: any) {
            toast.error('Error updating settings: ' + (error?.message || 'An error occurred'));
        }
    };

  return (
    <section className="section">
        <div className="row">
            <div className="col-lg-12">
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">Site Settings</h5>
                <form className="row g-3" role="form" id="create_product" name="create_product" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className="col-4">
                    <label htmlFor="logo" className="form-label">
                        Logo
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="logo"
                        placeholder=""
                        accept="image/*"
                        {...register("logo")}
                    />
                    {errors.logo && <p className="text-danger">{errors.logo.message}</p>}
                    </div>
                    <div className="col-2">
                        <img
                            src={logoPreview ? `/api/image-proxy?url=${encodeURIComponent(logoPreview)}` : "/assets/admin/img/logo.png"}
                            style={{ border: "1px solid #ddd7d7", width: "100%" }}
                        />
                    </div>
                    <div className="col-4">
                    <label htmlFor="footer_logo" className="form-label">
                        Footer Logo
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="footer_logo"
                        placeholder=""
                        accept="image/*"
                        {...register("footer_logo")}
                    />
                    {errors.footer_logo && <p className="text-danger">{errors.footer_logo.message}</p>}
                    </div>
                    <div className="col-2">
                        <img
                            src={footerLogoPreview ? `/api/image-proxy?url=${encodeURIComponent(footerLogoPreview)}` : "/assets/admin/img/f-logo.png"}
                            style={{ border: "1px solid #ddd7d7", width: "100%" }}
                            alt="Footer Logo"
                        />  
                    </div>
                    <div className="col-6">
                    <label htmlFor="page_title" className="form-label">
                        Page Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="page_title"
                        placeholder="Product Title"
                        
                        {...register("page_title")}
                    />
                    {errors.page_title && <p className="text-danger">{errors.page_title.message}</p>}
                    </div>
                    <div className="col-6">
                    <label htmlFor="mobile_number" className="form-label">
                        Mobile Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="mobile_number"
                        placeholder="Mobile Number"
                        
                        {...register("mobile_number")}
                    />
                    {errors.mobile_number && <p className="text-danger">{errors.mobile_number.message}</p>}
                    </div>
                    <div className="col-6">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        
                        {...register("email")}
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                    </div>
                    <div className="col-6">
                    <label htmlFor="whatsapp_number" className="form-label">
                        Whatsapp Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="whatsapp_number"
                        placeholder="Whatsapp Number"
                        
                        {...register("whatsapp_number")}
                    />
                    {errors.whatsapp_number && <p className="text-danger">{errors.whatsapp_number.message}</p>}
                    </div>
                    <div className="col-12">
                    <label htmlFor="address" className="form-label">
                        Address
                    </label>
                    <textarea
                        className="form-control"
                        id="address"
                        placeholder="Address"
                        {...register("address")}
                    />
                    {errors.address && <p className="text-danger">{errors.address.message}</p>}
                    </div>
                    <div className="col-6">
                    <label htmlFor="facebook_url" className="form-label">
                        Facebook URL
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="facebook_url"
                        placeholder="Facebook URL"
                        {...register("facebook_url")}
                    />
                    {errors.facebook_url && <p className="text-danger">{errors.facebook_url.message}</p>}
                    </div>
                    <div className="col-6">
                    <label htmlFor="twitter_url" className="form-label">
                        Twitter URL
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="twitter_url"
                        placeholder="Twitter URL"
                        {...register("twitter_url")}
                    />
                    {errors.twitter_url && <p className="text-danger">{errors.twitter_url.message}</p>}
                    </div>
                    <div className="col-4">
                    <label htmlFor="instagram_url" className="form-label">
                        Instagram URL
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="instagram_url"
                        placeholder="Instagram URL"
                        {...register("instagram_url")}
                    />
                    {errors.instagram_url && <p className="text-danger">{errors.instagram_url.message}</p>}
                    </div>
                    <div className="col-4">
                    <label htmlFor="youtube_url" className="form-label">
                        YouTube URL
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="youtube_url"
                        placeholder="YouTube URL"
                        {...register("youtube_url")}
                    />
                    {errors.youtube_url && <p className="text-danger">{errors.youtube_url.message}</p>}
                    </div>
                    <div className="col-4">
                    <label htmlFor="linkdin_url" className="form-label">
                        Linkdin URL
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="linkdin_url"
                        placeholder="Linkdin URL"
                        {...register("linkdin_url")}
                    />
                    {errors.linkdin_url && <p className="text-danger">{errors.linkdin_url.message}</p>}
                    </div>
                    <div className="col-12">
                    <label htmlFor="why_bsfye" className="form-label">
                        Why Bsfye?
                    </label>
                    <textarea
                        className="form-control"
                        id="why_bsfye"
                        rows={6}
                        placeholder="Why Bsfye?"
                        {...register("why_bsfye")}
                    />
                    {errors.why_bsfye && <p className="text-danger">{errors.why_bsfye.message}</p>}
                    </div>
                    <div className="col-12">
                    <label htmlFor="google_analytics" className="form-label">
                        Google Analytics
                    </label>
                    <textarea
                        className="form-control"
                        id="google_analytics"
                        rows={6}
                        placeholder="Google Analytics"
                        {...register("google_analytics")}
                    />
                    {errors.google_analytics && <p className="text-danger">{errors.google_analytics.message}</p>}
                    </div>
                    <div className="col-4">
                    <label htmlFor="favicon" className="form-label">
                        Fav Icon
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="favicon"
                        placeholder=""
                        accept="image/*"
                        {...register("favicon")}
                    />
                    {errors.favicon && <p className="text-danger">{errors.favicon.message}</p>}
                    </div>
                    <div className="col-2">
                        <img
                            src={faviconPreview ? `/api/image-proxy?url=${encodeURIComponent(faviconPreview)}` : "/assets/admin/img/favicon.png"}
                            style={{ border: "1px solid #ddd7d7", width: 64 }}
                        />
                    </div>
                    <div className="text-center">
                    <button type="submit" className="btn btn-primary" style={{ marginRight: "10px" }}>
                        Update
                    </button>
                    <button type="reset" className="btn btn-secondary">
                        Reset
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    </section>

  )
}

export default SiteSettingsPage
