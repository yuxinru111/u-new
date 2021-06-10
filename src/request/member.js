import axios from '../utils/http'



// 规格列表

export function memberList() {
  let res = axios.get('/memberlist')
  return res
}

// 编辑规格
export function editMember(data) {
  let res = axios.post('/memberedit', data)
  return res
}
