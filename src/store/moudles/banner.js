import {
  bannerList
} from '../../request/banner'
export default {
  namespaced: true,
  state: {
    bannerList: []
  },
  getters: {

  },
  mutations: {
    setBannerList(state, list) {
      state.bannerList = list
    }
  },
  actions: {
    getBannerListAction({
      commit
    }) {
      bannerList().then(res => {
        console.log(res);
        commit('setBannerList', res.list)
        console.log(res.list);
      })
    }
  }
}
