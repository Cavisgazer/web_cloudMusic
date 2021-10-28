import { request} from 'network/axios'

// 请求相关视频
export function getRelatedVideoData(id) {
  return request({
    url: '/related/allvideo',
    params: {
      id: id,
    }
  })
}

// 请求mv详情
export function getMvDetailData(mvid) {
  return request({
    url: '/mv/detail',
    params: {
      mvid: mvid
    }
  })
}

// 请求Mv地址
export function getMvUrlData(id) {
  return request({
    url: '/mv/url',
    params: {
      id: id
    }
  })
}

// 请求视频详情
export function getVideoDetailData(id) {
  return request({
    url: '/video/detail',
    params: {
      id: id
    }
  })
}

// 请求视频url
export function getVideoUrlData(id) {
  return  request({
    url: '/video/url',
    params: {
      id: id
    }
  })
}