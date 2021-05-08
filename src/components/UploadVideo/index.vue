
<!-- src\components\UploadVideo\index.vue -->
<template>
  <div class="sc-AxiKw dZbDOR">
    <div class="modal-content">
      <form @submit.prevent="handleSubmit">
        <div class="modal-header">
          <div class="modal-header-left">
            <svg
              @click="handleClose"
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
            >
              <g>
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                ></path>
              </g>
            </svg>
            <h3>Upload Video</h3>
          </div>
          <div style="display: block">
            <button class="sc-AxirZ erzyjX">Save</button>
          </div>
        </div>
        <div class="tab video-form">
          <input
            ref="inputFileRef"
            required
            type="file"
            @change="handleFileChange"
          />
          <video ref="videoFileRef" controls></video>
          <input
            v-model="video.title"
            required
            type="text"
            placeholder="Enter the title"
          />
          <textarea
            v-model="video.description"
            required
            placeholder="Tell viewers about your video"
          ></textarea>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { createUploader } from '@/utils/video'
import { CreateVideoInput } from '@/api/video'

export default defineComponent({
  name: 'UploadVideo',
  setup(props, context) {
    console.info('props', props)
    /**
     * 使用 ref 的时候
     * 1: 确保定义的名称与template中定义的ref一致
     * 2: return 出去
     * 就可以将变量和DOM关联起来
     */
    const inputFileRef = ref(null)
    const videoFileRef = ref(null)
    const video = reactive<CreateVideoInput>({
      title: '',
      description: '',
      vodVideoId: '',
      cover: ''
    })
    const handleClose = () => {
      // 发布 close 事件
      context.emit('close', false)
    }

    // 文件修改 Event
    const handleFileChange = () => {
      // eslint-disable-next-line
      const file = (inputFileRef.value as any).files[0]
      // eslint-disable-next-line
      ;(videoFileRef.value as any).src = URL.createObjectURL(file)
    }

    const handleSubmit = async () => {
      // 获取 uploader 上传实例
      const uploader = createUploader(video)

      // 🚀 添加上传文件
      const paramData = JSON.stringify({ Vod: {} })
      uploader.addFile(
        // eslint-disable-next-line
        (inputFileRef.value as any).files[0],
        null,
        null,
        null,
        paramData
      )
      // 🚀 开始上传
      uploader.startUpload()

      // 🚀 上传完成 -> 创建视频
      console.info('last uploader', uploader._uploadList[0].videoId)
    }

    return {
      handleClose,
      inputFileRef,
      videoFileRef,
      handleFileChange,
      handleSubmit,
      video
    }
  }
})
</script>
