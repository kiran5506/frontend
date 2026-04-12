"use client";
import React, { useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { videoById } from '@/services/video-api'
import { BsArrowLeft } from 'react-icons/bs'

const VideoView = () => {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (params?.id) {
      ;(dispatch as any)(videoById(params.id as any))
    }
  }, [params?.id, dispatch])

  const { currentVideo } = useSelector((state: any) => state.video)

  const videoData = useMemo(() => {
    if (currentVideo && params?.id) {
      return currentVideo.data || currentVideo
    }
    return null
  }, [currentVideo, params?.id])

  const videoUrl = videoData?.videoUrl || ''
  const isVideoFile = /\.(mp4|webm|ogg)$/i.test(videoUrl)
  const isYouTubeUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(videoUrl)

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return ''
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/i)
    if (shortMatch?.[1]) {
      return `https://www.youtube-nocookie.com/embed/${shortMatch[1]}`
    }
    const longMatch = url.match(/[?&]v=([^?&]+)/i)
    if (longMatch?.[1]) {
      return `https://www.youtube-nocookie.com/embed/${longMatch[1]}`
    }
    const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/i)
    if (embedMatch?.[1]) {
      return `https://www.youtube-nocookie.com/embed/${embedMatch[1]}`
    }
    return url
  }

  const previewUrl = isYouTubeUrl ? getYouTubeEmbedUrl(videoUrl) : videoUrl

  return (
    <section className="section">
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Video Details
                <button
                  onClick={() => router.back()}
                  className="btn btn-success btn-sm"
                  style={{ float: 'right' }}
                >
                  <BsArrowLeft /> Back
                </button>
              </h5>

              {videoData ? (
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-5 col-sm-4">
                        <p className="mb-0"><strong>Video URL</strong></p>
                      </div>
                      <div className="col-7 col-sm-8">
                        {videoUrl ? (
                          <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                            {videoUrl}
                          </a>
                        ) : (
                          <p className="mb-0">N/A</p>
                        )}
                      </div>
                    </div>
                    <hr />

                    {videoUrl ? (
                      <div className="row">
                        <div className="col-12">
                          {isVideoFile ? (
                            <video
                              controls
                              src={videoUrl}
                              style={{ width: '100%', maxHeight: '360px', borderRadius: '6px' }}
                            />
                          ) : (
                            <iframe
                              title="Video preview"
                              src={previewUrl}
                              style={{ width: '100%', height: '360px', border: 0, borderRadius: '6px' }}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <p>Loading video details...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoView
