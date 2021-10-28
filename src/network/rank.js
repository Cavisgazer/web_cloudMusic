import { request } from "./axios";

// 根据榜单id请求详细数据
export function getMusicListDetail(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id: id
    }
  })
}
// 请求所有榜单
export function getAllRankings() {
  return request({
    url: '/toplist'
  })
}