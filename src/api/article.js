import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/cicd-platform-vue/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/cicd-platform-vue/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/cicd-platform-vue/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/cicd-platform-vue/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/cicd-platform-vue/article/update',
    method: 'post',
    data
  })
}
