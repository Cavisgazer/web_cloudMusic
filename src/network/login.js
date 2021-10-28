import { request } from './axios'

// 用户登录
export function login(phone, password) {
  return request({
    url: '/login/cellphone',
    method: 'post',
    params: {
      phone: phone,
      password: password
    }
  })
}

// 获取热搜列表
export function getHotSearchData() {
  return request({
    url: '/search/hot/detail'
  })
}

// 获取搜索建议
export function getSearchSuggestData(keywords) {
  return request({
    url: '/search/suggest',
    params: {
      keywords: keywords
    }
  })
}

// 根据id获取歌曲详情
export function getMusicInfoData(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids: ids
    }
  })
}