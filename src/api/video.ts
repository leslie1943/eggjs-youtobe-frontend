/**
 * 视频保存 api
 */

import { request } from '@/utils/request'

// 创建视频: 接收参数格式
export interface CreateVideoInput {
  title: string
  description: string
  vodVideoId: string
  cover: string
}

// 视频格式
interface Video {
  _id: string
  title: string
  description: string
  vodVideoId: string
}

// 返回数据格式
interface CreateVideoPayload {
  video: Video
}

export const createVideo = (data: CreateVideoInput) => {
  return request.post<CreateVideoPayload>('/api/v1/videos', data)
}
