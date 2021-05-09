/* eslint-disable no-new */
<!-- src\views\watch\index.vue -->
<template>
  <div class=".sc-AxmLO gmtmqV" v-if="video">
    {{ video }}
    <div class="sc-fzoXWK fRnHrz">
      <div class="video-container">
        <div class="video">
          <!-- <video src="" controls></video> -->
          <!-- 阿里云播放器初始化容器 -->
          <div class="prism-player" id="J_prismPlayer"></div>
        </div>
        <div class="video-info">
          <h3>{{ video.title ? video.title : '' }}</h3>
          <div class="video-info-stats">
            <p>
              <span>{{ video.viewsCount }} views</span> <span> • </span>
              <span>{{ formatDate(video.createdAt) }}</span>
            </p>
            <div class="likes-dislikes flex-row">
              <p class="flex-row like">
                <svg
                  @click="onLike"
                  viewBox="0 0 24 24"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                  fill="#AAAAAA"
                  width="22"
                  height="22"
                >
                  <g>
                    <path
                      d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"
                    ></path>
                  </g>
                </svg>
                <span>{{ video.likesCount }}</span>
              </p>
              <p class="flex-row dislike" style="margin-left: 1rem">
                <svg
                  @click="onDislike"
                  viewBox="0 0 24 24"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                  width="22"
                  height="22"
                >
                  <g>
                    <path
                      d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"
                    ></path>
                  </g>
                </svg>
                <span>{{ video.dislikesCount }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="channel-info-description">
          <div class="channel-info-flex">
            <div class="channel-info flex-row">
              <img
                class="avatar md"
                src="https://img1.baidu.com/it/u=4026833186,446874750&fm=26&fmt=auto&gp=0.jpg"
                alt="channel avatar"
              />
              <div class="channel-info-meta">
                <h4>
                  <a href="/channel/b41a4163-979c-4224-a879-0a6e009af309">{{
                    video.user.username
                  }}</a>
                </h4>
                <span class="secondary small"
                  >{{ video.user.subscribersCount || 0 }} subscribers</span
                >
              </div>
            </div>
            <button
              v-if="video.user.isSubscribed"
              class="sc-AxirZ erzyjX un-subscribe-btn"
              @click="onUnsubscribe"
            >
              Unsubscribe
            </button>
            <button
              v-else
              class="sc-AxirZ erzyjX subscribe-btn"
              @click="onSubscribe"
            >
              Subscribe
            </button>
          </div>
          <p>{{ video.user.channelDescription }}</p>
        </div>
        <div class="sc-fzoyTs fNzLaQ">
          <h3>2 comments</h3>
          <div class="add-comment">
            <img
              src="https://img1.baidu.com/it/u=4026833186,446874750&fm=26&fmt=auto&gp=0.jpg"
              alt="avatar"
            /><textarea placeholder="Add a public comment"></textarea>
          </div>
          <div class="comment">
            <a href="/channel/1311e080-5e0e-4b4b-bb83-08f1a6837649"
              ><img
                src="https://img1.baidu.com/it/u=4026833186,446874750&fm=26&fmt=auto&gp=0.jpg"
                alt="avatar"
            /></a>
            <div class="comment-info">
              <p class="secondary">
                <span
                  ><a href="/channel/1311e080-5e0e-4b4b-bb83-08f1a6837649"
                    >akshaydsvg</a
                  ></span
                ><span style="margin-left: 0.6rem">11 hours ago</span>
              </p>
              <p>vnd</p>
            </div>
          </div>
          <div class="comment">
            <a href="/channel/1311e080-5e0e-4b4b-bb83-08f1a6837649"
              ><img
                src="https://img1.baidu.com/it/u=4026833186,446874750&fm=26&fmt=auto&gp=0.jpg"
                alt="avatar"
            /></a>
            <div class="comment-info">
              <p class="secondary">
                <span
                  ><a href="/channel/1311e080-5e0e-4b4b-bb83-08f1a6837649"
                    >akshaydsvg</a
                  ></span
                ><span style="margin-left: 0.6rem">11 hours ago</span>
              </p>
              <p>test</p>
            </div>
          </div>
        </div>
      </div>
      <div class="related-videos">
        <h3 style="margin-bottom: 1rem">Up Next</h3>
        <a href="/watch/3ac30e23-45a6-4eca-9430-3654142a772c"
          ><div class="sc-fzozJi dteCCc">
            <img
              class="thumb"
              src="https://img2.baidu.com/it/u=1602883503,613387145&fm=26&fmt=auto&gp=0.jpg"
              alt="thumbnail"
            />
            <div class="video-info-container">
              <div class="channel-avatar"></div>
              <div class="video-info">
                <h4>Twitter clone</h4>
                <span class="secondary">manikandanraji</span>
                <p class="secondary">
                  <span>7 views</span> <span>•</span> <span>23 days ago</span>
                </p>
              </div>
            </div>
          </div></a
        ><a href="/watch/05f411f6-9c9d-4e97-8d65-47847cd99e87"
          ><div class="sc-fzozJi dteCCc">
            <img
              class="thumb"
              src="https://img2.baidu.com/it/u=1782783895,4075316672&fm=26&fmt=auto&gp=0.jpg"
              alt="thumbnail"
            />
            <div class="video-info-container">
              <div class="channel-avatar"></div>
              <div class="video-info">
                <h4>Youtubeception</h4>
                <span class="secondary">manikandanraji</span>
                <p class="secondary">
                  <span>1 views</span> <span>•</span> <span>23 days ago</span>
                </p>
              </div>
            </div>
          </div></a
        ><a href="/watch/b4bafa92-b60d-40a8-ad50-ecd47406edd5"
          ><div class="sc-fzozJi dteCCc">
            <img
              class="thumb"
              src="https://img0.baidu.com/it/u=728075063,1631308747&fm=224&fmt=auto&gp=0.jpg"
              alt="thumbnail"
            />
            <div class="video-info-container">
              <div class="channel-avatar"></div>
              <div class="video-info">
                <h4>Instaclone</h4>
                <span class="secondary">manikandanraji</span>
                <p class="secondary">
                  <span>1 views</span> <span>•</span> <span>23 days ago</span>
                </p>
              </div>
            </div>
          </div></a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getVideo, Video, likeVideo, disLikeVideo } from '@/api/video'
import { getVideoPlayAuth } from '@/api/vod'

import { subscribe, unsubscribe } from '@/api/user'

import { createPlayer } from '@/utils/video'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'

/**
 * 先获取视频详情, 拿到 vodId, 然后再去获取阿里云视频
 */
export default defineComponent({
  name: 'WatchIndex',
  setup() {
    const video = ref<Video | null>(null)
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
      // 播放视频
      playVideo(video.value?.vodVideoId as string)
    })

    // 喜欢
    const onLike = async () => {
      await likeVideo(video.value?._id as string)
      loadVideoInfo()
    }

    const onDislike = async () => {
      await disLikeVideo(video.value?._id as string)
      loadVideoInfo()
    }

    const onSubscribe = async () => {
      const { data } = await subscribe(video.value?.user._id as string)
      console.info('subscribe data', data)
      loadVideoInfo()
    }
    const onUnsubscribe = async () => {
      const { data } = await unsubscribe(video.value?.user._id as string)
      console.info('unsubscribe data', data)
      loadVideoInfo()
    }

    const formatDate = (date: Date) => {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    }

    return { video, onLike, onDislike, formatDate, onSubscribe, onUnsubscribe }
  }
})
</script>