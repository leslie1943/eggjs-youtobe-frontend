<template>
  <div class="sc-AxmLO gmtmqV">
    <div class="sc-fzokOt hLgJkJ">
      <h2>{{ `Liked Videos (${total})` }}</h2>
      <div class="sc-fzoLsD fYZyZu">Videos that you have liked will show up here</div>
      <div class="sc-fzoLsD fYZyZu">
        <template v-for="item in videos" :key="item._id">
          <router-link :to="`/watch/${item._id}`"
            ><div class="sc-fzozJi dteCCc">
              <img class="thumb" src="https://img2.baidu.com/it/u=960273510,4202420586&fm=26&fmt=auto&gp=0.jpg" alt="thumbnail" />
              <div class="video-info-container">
                <div class="channel-avatar">
                  <img src="https://img0.baidu.com/it/u=3949781130,170972349&fm=26&fmt=auto&gp=0.jpg" alt="channel avatar" class="sc-AxhCb eSwYtm" style="margin-right: 0.8rem" />
                </div>
                <div class="video-info">
                  <h4>{{ item.description }}</h4>
                  <span class="secondary">{{ item.user.username }}</span>
                  <p class="secondary">
                    <span>{{ item.viewsCount }} views</span> <span>•</span> <span>{{ formatDate(item.createdAt) }}</span>
                  </p>
                </div>
              </div>
            </div></router-link
          >
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getUserFeedVideos } from '@/api/user'
import { Video } from '@/api/video'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

// 把业务模块封装到单独的模块中
export default defineComponent({
  name: 'AppSidebar',
  setup() {
    const total = ref(0)
    const videos = ref<Array<Video> | null>([])
    const router = useRouter()

    // 格式化日期
    const formatDate = (date: Date) => {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    }

    const toWatch = (videoId: string) => {
      router.push({ name: 'watch', params: { videoId } })
    }

    onMounted(async () => {
      const { data } = await getUserFeedVideos()
      videos.value = data.videos || []
      total.value = data.videosCount
    })

    return {
      total,
      videos,
      formatDate,
      toWatch
    }
  }
})
</script>