import {menuList} from '../../request/menu'
export default{
    namespaced:true,
    state:{
        menuList:[]
    },
    getters:{

    },
    mutations:{
        setMenuList(state,list){
            state.menuList=list
        }
    },
    actions:{
        getMenuListAction({commit}){
           menuList().then(res=>{
               console.log(res);
               commit('setMenuList',res.list)
               console.log(res.list);
           })
        }
    }
}