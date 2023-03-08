import {createStore} from 'vuex'
import persist from 'vuex-persistedstate'
import HomePage from './modules/homePage'

export default createStore({
    modules:{
        HomePage
    },
    // 数据状态持久化 vuex-persistedstate
    plugins:[persist({
        storage:window.sessionStorage
    })]
})