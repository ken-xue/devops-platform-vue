import request from '@/utils/request'

// 查询列表
export function page(data) {
  return request({
    url: '/app/machine/page',
    method: 'get',
    data: data
  })
}
export function list(data) {
  return request({
    url: '/app/machine/list',
    method: 'get',
    data: data
  })
}
// 查询详细
export function get(id) {
  return request({
    url: '/app/machine/info',
    method: 'get',
    params: { 'id': id }
  })
}
// 新增
export function add(data) {
  return request({
    url: '/app/machine/add',
    method: 'post',
    data: data
  })
}
// 测试连接
export function testConn(data) {
  return request({
    url: '/app/machine/testConn',
    method: 'post',
    data: data
  })
}
// 修改
export function update(data) {
  return request({
    url: '/app/machine/update',
    method: 'put',
    data: data
  })
}
// 删除
export function del(data) {
  return request({
    url: '/app/machine/delete',
    method: 'delete',
    data: data
  })
}