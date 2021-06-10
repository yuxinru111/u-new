import {
  cateList
} from '../../request/cate'
export default {
  namespaced: true,
  state: {
    cateList: []
  },
  getters: {

  },
  mutations: {
    setCateList(state, list) {
      state.cateList = list
    }
  },
  actions: {
    getCateListAction({
      commit
    }) {
      cateList().then(res => {
        console.log(res);
        commit('setCateList', res.list)
        console.log(res.list);
      })
    }
  }
}
