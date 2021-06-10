// 设置菜单的请求头
import axios from '../utils/http'

// 菜单列表
export function menuList() {
  let res = axios.get('/menulist?istree=1')
  return res
}
// 添加菜单
export function addMenu(data) {
  let res = axios.post('/menuadd', data)
  return res
}
// 删除列表
export function delMenu(id) {
  let res = axios.post('/menudelete', {
    id: id
  })
  return res
}
// 编辑菜单
export function editMenu(data) {
  let res = axios.post('/menuedit', data)
  return res
}
