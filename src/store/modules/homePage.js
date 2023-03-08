const SET_USERINFO='SET_USERINFO'
const SET_USERNAME = 'SET_USERNAME'
const SET_USERTYPE = 'SET_USERTYPE'

export default{
    namespaced: true,

    state: {
        username: '',
        userType:'',
        userInfo: {},
    },
    getters: {
        getUserName(state){
            return state.username
        },
        getUserInfo(state){
            return state.userInfo
        },
        getUserType(state){
            return state.userType
        }
    },

    mutations:{
        [SET_USERINFO]:(state,data)=>{
            state.userInfo = data
        },
        [SET_USERNAME]:(state,data)=>{
            state.username = data
        },
        [SET_USERTYPE]:(state,data)=>{
            state.userType = data
        }
    },
    actions:{ 
        async setUserInfo({dispatch,commit,getters},data){
            return new Promise((resolve,reject)=>{
                //data数据示例 mutations驱动更新 [{key:'',val:''}]
                commit('SET_USERINFO',data)
                resolve(data)
            })
        },
        async setUserName({dispatch,commit,getters},data){
            return new Promise((resolve,reject)=>{
                commit('SET_USERNAME',data)
                resolve(data)
            })
        },
        async setUserType({dispatch,commit,getters},data){
            return new Promise((resolve,reject)=>{
                commit('SET_USERTYPE',data)
                resolve(data)
            })
        },
    },
}