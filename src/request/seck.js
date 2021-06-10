import axios from '../utils/http'



// 规格列表

export function seckList() {
  let res = axios.get('/secklist')
  return res
}
// 添加规格
export function addSeck(data) {
  let res = axios.post('/seckadd', data)
  return res
}
// 编辑规格
export function editSeck(data) {
  let res = axios.post('/seckedit', data)
  return res
}

// 删除规格
export function delSeck(id) {
  let res = axios.post('/seckdelete', {
    id: id
  })
  return res
}
