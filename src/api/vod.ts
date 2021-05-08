/**
 * 阿里云视频点播 api
 */

import { request } from '@/utils/request'

interface CreateUploadVideoParams {
  Title: string
  FileName: string
}

interface CreateUploadVideoPayload {
  RequestId: string
  VideoId: string
  UploadAddress: string
  UploadAuth: string
}

export const createUploadVideo = (params: CreateUploadVideoParams) => {
  return request.get<CreateUploadVideoPayload>(
    '/api/v1/vod/CreateUploadVideo',
    { params }
  )
}

export const refreshUploadVideo = (videoId: string) => {
  return request.get<CreateUploadVideoPayload>(
    '/api/v1/vod/RefreshUploadVideo',
    { params: { videoId } }
  )
}

// 获取播放凭证

interface VideoMeta {
  CoverURL: string
  Duration: number
  Status: string
  Title: string
  VideoId: string
}

export interface VideoPlayAuthPayload {
  RequestId: string
  PlayAuth: string
  VideoMeta: VideoMeta
}

/**
 *
 * @param vodVideoId vodId,阿里云的视频ID
 * @returns
 */
export const getVideoPlayAuth = (vodVideoId: string) => {
  return request.get<VideoPlayAuthPayload>('/api/v1/vod/GetVideoPlayAuth', {
    params: {
      VideoId: vodVideoId
    }
  })
}
