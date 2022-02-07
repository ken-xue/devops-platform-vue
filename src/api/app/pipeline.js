import request from '@/utils/request'
// 查询User列表
export function pageUser(data) {
  return request({
    url: '/sys/user/page',
    method: 'get',
    data: data
  })
}
// 查询User详细
export function getUser(id) {
  return request({
    url: '/sys/user/info',
    method: 'get',
    params: { 'id': id }
  })
}
// 新增User
export function addUser(data) {
  return request({
    url: '/sys/user/add',
    method: 'post',
    data: data
  })
}
// 修改User
export function updateUser(data) {
  return request({
    url: '/sys/user/update',
    method: 'put',
    data: data
  })
}
// 删除User
export function delUser(data) {
  return request({
    url: '/sys/user/delete',
    method: 'delete',
    data: data
  })
}
