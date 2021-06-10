import {
  memberList
} from '../../request/member'
export default {
  namespaced: true,
  state: {
    memberList: []
  },
  getters: {

  },
  mutations: {
    setMemberList(state, list) {
      state.memberList = list
    }
  },
  actions: {
    getMemberListAction({
      commit
    }) {
      memberList().then(res => {
        console.log(res);
        commit('setMemberList', res.list)
        console.log(res.list);
      })
    }
  }
}
