import { request } from "./axios";

// 请求全部Mv
export function getMvListf(area, order, offset, type){
  return request({
    url: '/mv/all',
    params: {
      area: area,
      order: order,
      offset: offset,
      type: type
    }
  })
}
// 获取视频分类
export function getVideoCategoryData(){
  return request({
    url: '/video/category/list'
  })
}