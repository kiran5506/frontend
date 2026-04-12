"use client";
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { videoList } from '@/services/video-api'

const CommercialAd = () => {
        const dispatch = useDispatch();
        const dispatchAction = dispatch;
        const { Videos, loading } = useSelector((state) => state.video || {});

        useEffect(() => {
                dispatchAction(videoList());
        }, [dispatchAction]);

        const firstVideo = useMemo(() => (Array.isArray(Videos) ? Videos[0] : null), [Videos]);
        const rawUrl = firstVideo?.videoUrl || 'https://www.youtube.com/embed/wQquISGhUlQ';
        const embedUrl = rawUrl.includes('youtube.com/embed/')
                ? rawUrl
                : rawUrl.includes('watch?v=')
                ? rawUrl.replace('watch?v=', 'embed/')
                : rawUrl.includes('youtu.be/')
                ? rawUrl.replace('youtu.be/', 'www.youtube.com/embed/')
                : rawUrl;

  return (
    <section className="py-5" style={{ backgroundColor: "var(--primary-color)" }}>
        <div className="container">
            <div className="main-title text-center">
            <h2 className="text-white mb-4">Commercial Ad</h2>
            </div>
            <div className="row d-flex justify-content-center">
            <div className="col-md-7" style={{ padding: 10 }}>
                <style
                dangerouslySetInnerHTML={{
                    __html:
                    ".embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }"
                }}
                />
                <div className="embed-container">
                {loading ? (
                    <p className="text-white text-center">Loading video...</p>
                ) : (
                    <iframe
                        src={embedUrl}
                        title="Commercial Ad"
                        frameBorder={0}
                        allowFullScreen
                    />
                )}
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}

export default CommercialAd
