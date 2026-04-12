"use client";
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createVideo, videoById, videoEdit } from '@/services/video-api';
import { resetCurrentVideo } from '@/redux/features/video-slice';

interface VideoFormProps {
    id?: string;
}

interface VideoRecord {
    _id?: string;
    videoUrl?: string;
}

interface VideoState {
    currentVideo: VideoRecord | { data?: VideoRecord } | null;
}

interface RootState {
    video: VideoState;
}

interface VideoFormValues {
    videoUrl: string;
}

interface VideoPayload {
    videoUrl: string;
}

interface VideoResponse {
    status?: boolean;
    message?: string;
    data?: VideoRecord;
}

type ThunkResult<T> = { unwrap: () => Promise<T> };

const VideoForm = ({ id }: VideoFormProps) => {
    const dispatch = useDispatch();
    const dispatchAction = dispatch as unknown as (action: unknown) => Promise<unknown>;
    const router = useRouter();
    const { currentVideo } = useSelector((state: RootState) => state.video);

    const validationSchema = Yup.object().shape({
        videoUrl: Yup.string().required("Video URL is required").url("Enter a valid URL"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<VideoFormValues>({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (id) {
            const fetchVideo = videoById as unknown as (videoId: string) => unknown;
            dispatchAction(fetchVideo(id)).catch((error: unknown) => {
                console.error('Error fetching video:', error);
                toast.error('Error loading video data');
            });
        }
    }, [id, dispatchAction]);

    useEffect(() => {
        if (currentVideo && id) {
            const data = ('data' in currentVideo ? currentVideo.data : currentVideo) as VideoRecord | undefined;
            setValue('videoUrl', data?.videoUrl || '');
        }
    }, [currentVideo, setValue, id]);

    const onSubmit = async (data: VideoFormValues) => {
        try {
            const payload: VideoPayload = { videoUrl: data.videoUrl };
            const createAction = createVideo as unknown as (request: VideoPayload) => unknown;
            const editAction = videoEdit as unknown as (request: { id: string; formData: VideoPayload }) => unknown;
            const action = id ? editAction({ id, formData: payload }) : createAction(payload);
            const response = await (dispatchAction(action) as unknown as ThunkResult<VideoResponse>).unwrap();
            if (response?.status) {
                toast.success(`Video ${ id ? 'Updated' : 'Created' } successfully!`);
                dispatch(resetCurrentVideo());
                router.push('/admin/videos');
            } else {
                toast.error('Failed to save video: ' + (response?.message || 'Unknown error'));
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An error occurred while saving the video';
            console.error('Error submitting form:', error);
            toast.error('Error: ' + message);
        }
    };

  return (
    <form
        className="row g-3"
        role="form"
        id="updateVideo"
        name="updateVideo"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
    >
        <div className="col-12">
            <label htmlFor="videoUrl" className="form-label">
                Video URL
            </label>
            <input
                type="text"
                className="form-control"
                id="videoUrl"
                placeholder="Enter video URL"
                {...register('videoUrl')}
            />
            {errors.videoUrl && <p className="text-danger">{errors.videoUrl.message}</p>}
        </div>
        <div className="col-12">
            <button className="btn btn-primary" type="submit">
                {id ? 'Update' : 'Create'} Video
            </button>
        </div>
    </form>
  );
}

export default VideoForm
