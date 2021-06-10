import axios from '../utils/http'



// 规格列表

export function goodsList(params) {
  let res = axios.get('/goodslist', {
    params: params
  })
  return res
}
// 添加规格
export function addGoods(data) {
  let res = axios.post('/goodsadd', data)
  return res
}
// 编辑规格
export function editGoods(data) {
  let res = axios.post('/goodsedit', data)
  return res
}

// 删除规格
export function delGoods(id) {
  let res = axios.post('/goodsdelete', {
    id: id
  })
  return res
}

// 规格总数
export function goodsCount() {
  let res = axios.get('/goodscount')
  return res
}
