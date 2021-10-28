import { request } from "./axios"

// 请求用户歌单
export function getMusicList(uid) {
  return request({
    url: '/user/playlist',
    params: {
      uid: uid
    }
  })
}
// 获取高质量歌单
export function getTheFirstOfHighquality(limit) {
  return request({
    url: '/top/playlist/highquality',
    params: {
      limit: limit
    }
  })
}
// 获取热门歌单tag数据
export function getHotTag() {
  return request({
    url: '/playlist/hot',
  })
}
// 根据类型名字请求歌单列表（网友精选碟）
export function getMusciListByTypen(cat, offset) {
  return  request({
    url: '/top/playlist',
    params: {
      cat: cat,
      offset: offset
    }
  })
}
// 获取歌单分类数据
export function getSortList() {
  return request({
    url: '/playlist/catlist'
  })
}
// 根据传来 ID 查询歌单
export function getMusicListDetailData(id,timestamp) {
  return request({
    url: '/playlist/detail',
    params: {
      id: id,
      timestamp: timestamp
    }
  })
}
// 获取歌曲详情
export function getMusicDetailData(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids: ids
    }
  })
} 
// 获取专辑内容
export function getAlbumData(id) {
  return request({
    url: 'album',
    params: {
      id: id
    }
  })
}