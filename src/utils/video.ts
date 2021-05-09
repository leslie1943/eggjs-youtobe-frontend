import { VideoPlayAuthPayload } from '@/api/vod'

export const createPlayer = (data: VideoPlayAuthPayload) => {
  // 接收 Promise.resolve
  let onReady: (value: unknown) => void
  const promise = new Promise(resolve => {
    onReady = resolve
  })
  // eslint-disable-next-line no-new
  new window.Aliplayer(
    {
      id: 'J_prismPlayer',
      width: '100%',
      // height: '500px',
      autoplay: false,
      //   播放方式二: 点播用户推荐
      vid: data.VideoMeta.VideoId,
      playauth: data.PlayAuth,
      cover: data.VideoMeta.CoverURL
      //   encryptType: 1 // 当播放私有加密流时需要设置.
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function(player: any) {
      onReady(player)
    }
  )

  return promise
}
