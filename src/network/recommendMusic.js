import { request } from "./axios";

// 请求轮播图数据
export function getBannerData() {
  return request({
    url: '/banner'
  })
}
// 请求前十个推荐歌单数据
export function getMusicList(limit) {
  return request({
    url: '/personalized',
    params: {
      limit: limit
    }
  })
}
// 请求歌手列表
export function getSingerList(type, area, initial, offset) {
  return request({
    url: '/artist/list',
    params: {
      type: type,
      area: area,
      initial: initial,
      offset: offset
    }
  })
}
// 请求每日推荐歌曲
export function getRecommendSongsData() {
  return request({
    url: '/recommend/songs'
  })
}
// 请求歌手详情
export function getSingerDetail(id) {
  return request({
    url: '/artist/detail',
    params: {
      id: id
    }
  })
}
// 请求歌手热门50首
export function getSingerSongs(id) {
  return request({
    url: '/artist/top/song',
    params: {
      id: id
    }
  })
}