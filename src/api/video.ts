/**
 * 视频保存 api
 */

import { request } from '@/utils/request'
import { User } from './user'

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

export interface Comment {
  content: string
  user: User
}
interface Comments {
  comments: Array<Comment>
  commentTotal: number
}

// 获取 评论列表
export const getComments = (videoId: string) => {
  return request.get<Comments>(`/api/v1/videos/${videoId}/comments`)
}

// 添加评论
export const createComment = (videoId: string, content: string) => {
  return request.post(`/api/v1/videos/${videoId}/comments`, { content })
}

// 删除评论
export const deleteComment = (videoId: string, commentId: string) => {
  return request.delete(`/api/v1/videos/${videoId}/comments/${commentId}`)
}
