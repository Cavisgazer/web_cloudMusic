import { request } from "./axios";

// 根据id请求歌曲url
export function getSongsUrl(id) {
  return request({
    url: '/song/url',
    params: {
      id: id
    }

  })
} 