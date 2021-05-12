<!-- src\views\watch\index.vue -->
<template>
  <div class=".sc-AxmLO gmtmqV" v-if="video">
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
                <svg @click="onLike" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" fill="#AAAAAA" width="22" height="22">
                  <g>
                    <path
                      d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"
                    ></path>
                  </g>
                </svg>
                <span>{{ video.likesCount }}</span>
              </p>
              <p class="flex-row dislike" style="margin-left: 1rem">
                <svg @click="onDislike" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" width="22" height="22">
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
              <img class="avatar md" src="https://img1.baidu.com/it/u=1518705398,2823507888&fm=26&fmt=auto&gp=0.jpg" alt="channel avatar" />
              <div class="channel-info-meta">
                <h4>
                  <a href="/channel/b41a4163-979c-4224-a879-0a6e009af309">{{ video.user.username }}</a>
                </h4>
                <span class="secondary small">{{ video.user.subscribersCount || 0 }} subscribers</span>
              </div>
            </div>
            <button v-if="video.user.isSubscribed" class="sc-AxirZ erzyjX un-subscribe-btn" @click="onUnsubscribe">Unsubscribe</button>
            <button v-else class="sc-AxirZ erzyjX subscribe-btn" @click="onSubscribe">Subscribe</button>
          </div>
          <p>{{ video.user.channelDescription }}</p>
        </div>
        <div class="sc-fzoyTs fNzLaQ">
          <h3>{{ commentTotal }} comments</h3>
          <!-- Add comment -->
          <div class="add-comment">
            <img src="https://img2.baidu.com/it/u=4108958279,831681952&fm=26&fmt=auto&gp=0.jpg" alt="avatar" /><textarea
              v-model="content"
              placeholder="Add a public comment"
              @keydown.enter="addComment"
            ></textarea>
          </div>
          <!-- Display comments -->
          <template v-if="comments.length > 0">
            <div v-for="comment in comments" :key="comment._id" class="comment">
              <!-- avatar -->
              <router-link :to="`/channel/${comment.user._id}`">
                <img :src="comment.user.avatar || 'https://img2.baidu.com/it/u=1613890855,3909327698&fm=26&fmt=auto&gp=0.jpg'" alt="avatar" />
              </router-link>
              <div class="comment-info" style="width: 100%">
                <p class="secondary">
                  <span>
                    <router-link :to="comment.user._id">{{ comment.user.username }}</router-link> </span
                  ><span style="margin-left: 0.6rem">{{ formatDate(comment.createdAt) }}</span>
                </p>
                <div class="comment-row">
                  <div>{{ comment.content }}</div>
                  <div @click="removeComment(comment._id)" class="del-btn" v-if="comment.user.email == user.email">删除评论</div>
                </div>
              </div>
            </div>
          </template>
          <template v-else> No comments yet 😭 </template>
        </div>
      </div>
      <!-- <div class="related-videos">
        <h3 style="margin-bottom: 1rem">Up Next</h3>
        <a href="/watch/3ac30e23-45a6-4eca-9430-3654142a772c"
          ><div class="sc-fzozJi dteCCc">
            <img class="thumb" src="https://img2.baidu.com/it/u=4172115989,873202582&fm=26&fmt=auto&gp=0.jpg" alt="thumbnail" />
            <div class="video-info-container">
              <div class="channel-avatar"></div>
              <div class="video-info">
                <h4>Twitter clone</h4>
                <span class="secondary">manikandanraji</span>
                <p class="secondary"><span>7 views</span> <span>•</span> <span>23 days ago</span></p>
              </div>
            </div>
          </div></a
        ><a href="/watch/05f411f6-9c9d-4e97-8d65-47847cd99e87"
          ><div class="sc-fzozJi dteCCc">
            <img class="thumb" src="https://img0.baidu.com/it/u=4175967163,238978539&fm=26&fmt=auto&gp=0.jpg" alt="thumbnail" />
            <div class="video-info-container">
              <div class="channel-avatar"></div>
              <div class="video-info">
                <h4>Youtubeception</h4>
                <span class="secondary">manikandanraji</span>
                <p class="secondary"><span>1 views</span> <span>•</span> <span>23 days ago</span></p>
              </div>
            </div>
          </div></a
        ><a href="/watch/b4bafa92-b60d-40a8-ad50-ecd47406edd5"
          ><div class="sc-fzozJi dteCCc">
            <img class="thumb" src="https://img0.baidu.com/it/u=3702920847,3662520481&fm=26&fmt=auto&gp=0.jpg" alt="thumbnail" />
            <div class="video-info-container">
              <div class="channel-avatar"></div>
              <div class="video-info">
                <h4>Instaclone</h4>
                <span class="secondary">manikandanraji</span>
                <p class="secondary"><span>1 views</span> <span>•</span> <span>23 days ago</span></p>
              </div>
            </div>
          </div></a
        >
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useVideo } from '@/model/video'
import { useStore } from '@/store/index'

export default defineComponent({
  name: 'WatchIndex',
  setup() {
    const store = useStore()
    const { user } = store.state

    return {
      user,
      ...useVideo()
    }
  }
})
</script>
<style lang="scss" scoped>
.comment-row {
  display: flex;
  justify-content: space-between;

  .del-btn {
    cursor: pointer;
    color: crimson;
  }
}
</style>