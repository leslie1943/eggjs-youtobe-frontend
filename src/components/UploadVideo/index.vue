
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
/* eslint-disable */
import { defineComponent, reactive, ref } from 'vue'
import { CreateVideoInput, createVideo } from '@/api/video'
import { useRouter } from 'vue-router'
import { createUploadVideo, refreshUploadVideo } from '@/api/vod'

export default defineComponent({
  name: 'UploadVideo',
  setup(props, context) {
    console.info('props', props)
    const router = useRouter()
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

    const createUploader = () => {
      const uploader = new window.AliyunUpload.Vod({
        // 阿里账号ID, 必须有值
        userId: '122',
        // 分片大小默认1 MB, 不能小于100 KB
        partSize: 1048576,
        // 并行上传分片个数, 默认5
        parallel: 5,
        // 网络原因失败时, 重新上传次数, 默认为3
        retryCount: 3,
        // 网络原因失败时, 重新上传间隔时间, 默认为2秒
        retryDuration: 2,
        // 是否上报上传日志到视频点播, 默认为true
        enableUploadProgress: true,
        // 🚀 开始上传
        onUploadstarted: async function (uploadInfo: any) {
          console.info(
            `onUploadStarted:${uploadInfo.file.name}, endpoint:${uploadInfo.endpoint}, bucket:${uploadInfo.bucket}, object:${uploadInfo.object}`
          )
          /**
           * 💛 上传方式1
           * 需要根据 uploadInfo.videoId 是否有值,
           * 调用视频点播的不同接口获取 uploadauth 和 uploadAddress,
           * 如果 videoId 有值, 调用刷新视频上传凭证接口, 否则调用创建视频上传凭证接口
           */
          if (uploadInfo.videoId) {
            // 如果uploadInfo.videoId 存在, 调用刷新视频上传凭证接口
            const { data } = await refreshUploadVideo(uploadInfo.videoId)
            uploader.setUploadAuthAndAddress(
              uploadInfo,
              data.UploadAuth,
              data.UploadAddress,
              data.VideoId
            )
          } else {
            // 💛 如果uploadInfo.videoId不存在, 调用获取视频上传地址和凭证接口
            // 从视频点播服务获取的 uploadAuth, uploadAddress 和 videoId, 设置到 SDK 里
            const { data } = await createUploadVideo({
              Title: uploadInfo.file.name,
              FileName: uploadInfo.file.name
            })
            uploader.setUploadAuthAndAddress(
              uploadInfo,
              data.UploadAuth,
              data.UploadAddress,
              data.VideoId
            )
          }
        },
        // 🚀 文件上传成功 => 保存到后台
        onUploadSucceed: async function (uploadInfo: any) {
          console.info('uploadInfo', uploadInfo)
          console.info(
            `onUploadSucceed: file: ${uploadInfo.file.name} , endpoint:${uploadInfo.endpoint}, bucket: ${uploadInfo.bucket}, object: ${uploadInfo.object}`
          )
          video.vodVideoId = uploadInfo.videoId // 视频Id
          video.cover = uploadInfo.bucket // 视频封面

          // 提交给后台保存视频
          const { data } = await createVideo(video)
          console.info('保存成功 data', data)
          router.push({ name: 'watch', params: { videoId: data.video._id } })
          handleClose()
        },
        // 🚀 文件上传失败
        onUploadFailed: function (uploadInfo: any, code: any, message: any) {
          console.info(
            `onUploadFailed: file: ${uploadInfo.file.name} ,code:${code}, message: ${message}`
          )
        },
        // 🚀 文件上传进度, 单位：字节
        onUploadProgress: function (
          uploadInfo: any,
          totalSize: any,
          loadedPercent: any
        ) {
          console.log(
            'onUploadProgress:file:' +
              uploadInfo.file.name +
              ', fileSize:' +
              totalSize +
              ', percent:' +
              Math.ceil(loadedPercent * 100) +
              '%'
          )
        },
        // 🚀 上传凭证超时
        onUploadTokenExpired: async function (uploadInfo: any) {
          console.log('onUploadTokenExpired')
          // 实现时, 根据 uploadInfo.videoId 调用刷新视频上传凭证接口重新获取 UploadAuth
          // 从点播服务刷新的 uploadAuth, 设置到SDK里
          const { data } = await refreshUploadVideo(uploadInfo.videoId)
          uploader.resumeUploadWithAuth(data.UploadAuth)
        },
        // 🚀 全部文件上传结束
        onUploadEnd: function (uploadInfo: any) {
          console.log('OnUploadEnd: File upload Finish.')
        }
      })

      return uploader
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
      const uploader = createUploader()

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
