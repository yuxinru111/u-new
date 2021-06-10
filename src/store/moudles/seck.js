import {
  seckList
} from '../../request/seck'
export default {
  namespaced: true,
  state: {
    seckList: []
  },
  getters: {

  },
  mutations: {
    setSeckList(state, list) {
      state.seckList = list
    }
  },
  actions: {
    getSeckListAction({
      commit
    }) {
      seckList().then(res => {
        console.log(res);
        commit('setSeckList', res.list)
        console.log(res.list);
      })
    }
  }
}
