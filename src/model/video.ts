import { onMounted, ref } from 'vue'
import { getVideo, Video, likeVideo, disLikeVideo, getComments, Comment, createComment, deleteComment } from '@/api/video'
import { getVideoPlayAuth } from '@/api/vod'

import { subscribe, unsubscribe } from '@/api/user'

import { createPlayer } from '@/utils/video'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'

/**
 * 先获取视频详情, 拿到 vodId, 然后再去获取阿里云视频
 */
export const useVideo = () => {
  const video = ref<Video | null>(null)
  const comments = ref<Array<Comment> | null>([])
  const commentTotal = ref(0)
  const content = ref('')

  const route = useRoute()

  // 从服务器端 获取视频详情
  const loadVideoInfo = async () => {
    const videoId = route.params.videoId as string
    const { data } = await getVideo(videoId)
    video.value = data.video
  }

  /**
   * 播放视频
   * 1: 获取 从阿里云服务器 获取播放凭证
   * 2: 获取视频, 播放视频
   */
  const playVideo = async (vodVideoId: string) => {
    // 获取视频播放凭证
    const { data } = await getVideoPlayAuth(vodVideoId)
    // 创建播放器, 播放视频
    createPlayer(data)
  }

  onMounted(async () => {
    // 加载视频详情
    await loadVideoInfo()
    await loadComments()
    // 播放视频
    playVideo(video.value?.vodVideoId as string)
  })

  // 喜欢
  const onLike = async () => {
    await likeVideo(video.value?._id as string)
    loadVideoInfo()
  }
  // 不喜欢
  const onDislike = async () => {
    await disLikeVideo(video.value?._id as string)
    loadVideoInfo()
  }

  // 订阅用户
  const onSubscribe = async () => {
    const { data } = await subscribe(video.value?.user._id as string)
    console.info('subscribe data', data)
    loadVideoInfo()
  }
  // 取消订阅用户
  const onUnsubscribe = async () => {
    const { data } = await unsubscribe(video.value?.user._id as string)
    console.info('unsubscribe data', data)
    loadVideoInfo()
  }

  // 获取评论
  const loadComments = async () => {
    const { data } = await getComments(video.value?._id as string)
    console.info('loadComments data', data)
    comments.value = data.comments
    commentTotal.value = data.commentTotal
  }
  // 添加评论
  const addComment = async () => {
    if (content.value.trim()) {
      await createComment(video.value?._id as string, content.value)
      content.value = ''
      loadComments()
    }
  }

  // 删除评论
  const removeComment = async (commentId: string) => {
    await deleteComment(video.value?._id as string, commentId)
    loadComments()
  }

  // 格式化日期
  const formatDate = (date: Date) => {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
  }

  return {
    video,
    onLike,
    onDislike,
    formatDate,
    onSubscribe,
    onUnsubscribe,
    loadComments,
    comments,
    commentTotal,
    content,
    addComment,
    removeComment
  }
}
