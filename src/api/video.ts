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

// 返回数据格式

interface VideoAuth {
  _id: string
  username: string
  avatar: string
  isSubscribed: boolean
  subscribersCount: number
  channelDescription: string
}

export interface Video {
  _id: string
  title: string
  description: string
  vodVideoId: string
  commentsCount: number
  createAt: string
  dislikesCount: number
  likesCount: number
  isLiked: boolean
  isDisliked: boolean
  viewsCount: number
  user: VideoAuth
}
interface VideoPayload {
  video: Video
}

export const createVideo = (data: CreateVideoInput) => {
  return request.post<VideoPayload>('/api/v1/videos', data)
}

export const getVideo = (videoId: string) => {
  return request.get<VideoPayload>(`/api/v1/videos/${videoId}`)
}

export const likeVideo = (videoId: string) => {
  return request.post(`/api/v1/videos/${videoId}/like`)
}

export const disLikeVideo = (videoId: string) => {
  return request.post(`/api/v1/videos/${videoId}/dislike`)
}
