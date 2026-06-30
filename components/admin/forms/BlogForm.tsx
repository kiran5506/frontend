"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createBlog, blogEdit, blogById } from '@/services/blog-api';
import { resetCurrentBlog } from '@/redux/features/blog-slice';
import { buildRichTextEditorModules, RICH_TEXT_EDITOR_FORMATS } from '@/utils/editor-config';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false }) as any;

interface BlogFormProps {
    id?: string;
}

const BlogForm = ({ id }: BlogFormProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentBlog } = useSelector((state: any) => state.blog);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [hasImage, setHasImage] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const quillRef = useRef<any>(null);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        shortDescription: Yup.string().required("Short description is required"),
        content: Yup.string().required("Content is required"),
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: { title: '', shortDescription: '', content: '' },
    });

    const editorModules = useMemo(
        () => buildRichTextEditorModules({
            quillRef,
            onMediaError: (message: string, error?: unknown) => {
                console.error('Editor media error:', error);
                toast.error(message);
            },
        }),
        [quillRef]
    );

    useEffect(() => {
        if (id) {
            (dispatch as any)(blogById(id as any)).catch(() => {
                toast.error('Error loading blog data');
            });
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (currentBlog && id) {
            const data = currentBlog.data || currentBlog;
            setValue('title', data.title || '');
            setValue('shortDescription', data.shortDescription || '');
            setValue('content', data.content || '');
            if (data.imagePath) {
                setImagePreview(data.imagePath);
                setHasImage(true);
            }
        }
    }, [currentBlog, setValue, id]);

    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            if (imagePreview && imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
            setImagePreview(URL.createObjectURL(files[0]));
            setHasImage(true);
        }
    };

    const getPreviewSrc = (preview: string | null) => {
        if (!preview) return '';
        if (preview.startsWith('blob:') || preview.startsWith('data:')) return preview;
        return `/api/image-proxy?url=${encodeURIComponent(preview)}`;
    };

    const onSubmit = async (data: any) => {
        if (submitting) return;
        try {
            setSubmitting(true);

            if (!id && !hasImage) {
                toast.error('Cover image is required');
                setSubmitting(false);
                return;
            }

            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('shortDescription', data.shortDescription);
            formData.append('content', data.content);

            const fileInput = document.getElementById('blogImage') as HTMLInputElement;
            if (fileInput && fileInput.files && fileInput.files.length > 0) {
                formData.append('image', fileInput.files[0]);
            }

            const action = id
                ? blogEdit({ id, formData } as any)
                : createBlog(formData as any);

            const response = await (dispatch as any)(action as any).unwrap();

            if (response?.status) {
                toast.success(`Blog ${id ? 'updated' : 'created'} successfully!`);
                (dispatch as any)(resetCurrentBlog());
                router.push('/admin/blogs');
            } else {
                toast.error('Failed: ' + (response?.message || 'Unknown error'));
            }
        } catch (error: any) {
            toast.error('Error: ' + (error?.message || 'An error occurred'));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            className="row g-3"
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="col-12">
                <label htmlFor="blogTitle" className="form-label">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="blogTitle"
                    placeholder="Enter blog title"
                    {...register('title')}
                />
                {errors.title && <p className="text-danger">{errors.title.message}</p>}
            </div>

            <div className="col-12">
                <label htmlFor="shortDescription" className="form-label">Short Description</label>
                <textarea
                    className="form-control"
                    id="shortDescription"
                    rows={3}
                    placeholder="Enter a short description (shown on blog card)"
                    {...register('shortDescription')}
                />
                {errors.shortDescription && <p className="text-danger">{errors.shortDescription.message}</p>}
            </div>

            <div className="col-12">
                <label className="form-label">Content</label>
                <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                        <ReactQuill
                            ref={quillRef}
                            theme="snow"
                            value={field.value}
                            onChange={field.onChange}
                            modules={editorModules}
                            formats={RICH_TEXT_EDITOR_FORMATS}
                            placeholder="Write the full blog content here..."
                            style={{ minHeight: '300px' }}
                        />
                    )}
                />
                {errors.content && <p className="text-danger mt-1">{errors.content.message}</p>}
            </div>

            <div className="col-12">
                <label htmlFor="blogImage" className="form-label">Cover Image</label>
                <input
                    type="file"
                    className="form-control"
                    id="blogImage"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {!id && !hasImage && <p className="text-danger mt-1">Cover image is required</p>}
                {imagePreview && (
                    <div className="mt-2">
                        <img
                            src={getPreviewSrc(imagePreview)}
                            alt="Preview"
                            style={{ width: '200px', height: '130px', objectFit: 'cover', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>
                )}
            </div>

            <div className="col-12">
                <button className="btn btn-primary" type="submit" disabled={submitting}>
                    {submitting ? 'Saving...' : (id ? 'Update' : 'Create') + ' Blog'}
                </button>
            </div>
        </form>
    );
};

export default BlogForm;
