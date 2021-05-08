/* eslint-disable */

import { CreateVideoInput } from '@/api/video'
import { createUploadVideo, refreshUploadVideo } from '@/api/vod'
import { createVideo } from '@/api/video'
import { Router } from 'vue-router'

export const createUploader = (
  video: CreateVideoInput,
  router: Router,
  close: Function
) => {
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
    onUploadstarted: async function(uploadInfo: any) {
      console.log(
        'onUploadStarted:' +
          uploadInfo.file.name +
          ', endpoint:' +
          uploadInfo.endpoint +
          ', bucket:' +
          uploadInfo.bucket +
          ', object:' +
          uploadInfo.object
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
    onUploadSucceed: async function(uploadInfo: any) {
      console.info('uploadInfo', uploadInfo)
      console.info(
        `onUploadSucceed: file: ${uploadInfo.file.name} , endpoint:${uploadInfo.endpoint}, bucket: ${uploadInfo.bucket}, object: ${uploadInfo.object}`
      )
      // 💙💙💙 ❗❗❗❗❗❗❗❗ 这里的 video 是从业务组件传递过来的 ❗❗❗❗❗❗❗❗ 💙💙💙
      // src/components/UploadVideo/index.vue 下
      video.vodVideoId = uploadInfo.videoId // 视频Id
      video.cover = uploadInfo.bucket // 视频封面

      // 提交给后台保存视频
      const { data } = await createVideo(video)
      console.info('保存成功 data', data)
      router.push({ name: 'watch', params: { videoId: data.video._id } })
      close()
    },
    // 🚀 文件上传失败
    onUploadFailed: function(uploadInfo: any, code: any, message: any) {
      console.info(
        `onUploadFailed: file: ${uploadInfo.file.name} ,code:${code}, message: ${message}`
      )
    },
    // 🚀 文件上传进度, 单位：字节
    onUploadProgress: function(
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
    onUploadTokenExpired: async function(uploadInfo: any) {
      console.log('onUploadTokenExpired')
      // 实现时, 根据 uploadInfo.videoId 调用刷新视频上传凭证接口重新获取 UploadAuth
      // 从点播服务刷新的 uploadAuth, 设置到SDK里
      const { data } = await refreshUploadVideo(uploadInfo.videoId)
      uploader.resumeUploadWithAuth(data.UploadAuth)
    },
    // 🚀 全部文件上传结束
    onUploadEnd: function(uploadInfo: any) {
      console.log('onUploadEnd: uploaded all the files')
    }
  })

  return uploader
}
