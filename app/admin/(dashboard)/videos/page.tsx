"use client";
import React, { useEffect, useState } from 'react'
import AdPageLayout from '../../../../components/common/Layouts/AdPageLayout'
import Table from '../../../../components/common/Table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { videoDelete, videoList } from '@/services/video-api'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const tableHeader: string[] = ['S.No', 'Video URL', 'Actions'];

interface VideoRow {
    _id: string;
    videoUrl: string;
}

interface VideoState {
    Videos: VideoRow[];
    loading: boolean;
}

interface RootState {
    video: VideoState;
}

const AdVideos = () => {
    const router = useRouter();
    const [headerData, setHeaderData] = useState<string[]>([]);
    const [bodyData, setBodyData] = useState<VideoRow[]>([]);
    const isview = true;
    const isedit = true;
    const isdelete = true;

    const dispatch = useDispatch();
    const dispatchAction = dispatch as unknown as (action: unknown) => Promise<unknown>;
    useEffect(() => {
        dispatchAction(videoList());
    }, [dispatch]);

    const { Videos, loading } = useSelector((state: RootState) => state.video);

    useEffect(() => {
        setHeaderData(tableHeader);

        if (!loading && Videos && Videos.length > 0) {
            setBodyData(Videos);
        } else {
            setBodyData([]);
        }
    }, [Videos, loading]);

    const handleView = (id: string) => {
        router.push(`/admin/videos/view/${id}`);
    }
    const handleEdit = (id: string) => {
        router.push(`/admin/videos/${id}`);
    }
    const handleDelete = (id: string) => {
        const deleteAction = videoDelete as unknown as (videoId: string) => unknown;
        dispatchAction(deleteAction(id)).then((result: unknown) => {
            const payload = (result as { payload?: { status?: boolean; message?: string } })?.payload;
            if (payload?.status) {
                toast.success(payload.message);
            } else {
                toast.error(payload?.message || 'Failed to delete video');
            }
        });
    }

  return (
    <AdPageLayout
        iscreate={true}
        title="Videos"
        linkHref="/admin/videos/create"
        name="Video"
    >
      { loading ? <p>Loading...</p> : <Table  headerData={headerData} bodyData={bodyData} onView={handleView} onEdit={handleEdit}  onDelete={handleDelete} isview={isview} isedit={isedit} isdelete={isdelete}/> }
    </AdPageLayout>
  )
}

export default AdVideos
