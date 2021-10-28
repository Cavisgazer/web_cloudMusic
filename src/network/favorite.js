import { request } from './axios'

// 请求收藏专辑
export function getFavoriteAlbumData(limit) {
  return request({
    url: '/album/sublist',
    withCredentials: true,
    params: {
      limit: limit
    },
  })
}
// 请求收藏歌手
export function getFavoriteSingerData() {
  return request({
    url: '/artist/sublist'
  })
}
// 请求收藏视频
export function getFavoriteVideoData() {
  return request({
    url: '/mv/sublist'
  })
}