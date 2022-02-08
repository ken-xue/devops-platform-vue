import axios from 'axios';
import request from '@/utils/request'

// 查询列表
export function getMenuData(data) {
  return request({
    url: '/app/pipeline/page',
    method: 'get',
    data: data
  })
}
export function getFlowChartData(data) {
  return request({
    url: '/app/pipeline/node/list',
    method: 'get',
    data: data
  })
}
// function getFlowChartData() {
//   return new Promise((resolve, reject) => {
//     axios.get('api/getFlowChartData').then(resolve).catch(reject);
//   });
// }
//
// function getMenuData() {
//   return new Promise((resolve, reject) => {
//     axios.get('api/getMenuData').then(resolve).catch(reject);
//   });
// }

export default {
  getFlowChartData,
  getMenuData,
};
