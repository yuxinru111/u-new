import axios from '../utils/http'



// 规格列表

export function bannerList() {
  let res = axios.get('/bannerlist')
  return res
}
// 添加规格
export function addBanner(data) {
  let res = axios.post('/banneradd', data)
  return res
}
// 编辑规格
export function editBanner(data) {
  let res = axios.post('/banneredit', data)
  return res
}

// 删除规格
export function delBanner(id) {
  let res = axios.post('/bannerdelete', {
    id: id
  })
  return res
}
