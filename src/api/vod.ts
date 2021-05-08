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
