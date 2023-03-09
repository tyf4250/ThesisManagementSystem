import {createRouter,createWebHistory} from 'vue-router'

const webHistory=createWebHistory()

const router = createRouter({
    history:webHistory,
    routes:[
        {
            path:'/',
            redirect:'/login',
        },
        {
            path:'/login',
            component:()=>import('../views/login.vue'),
            name:'login',
            meta:{
                title:'登录管理系统',
            },
            beforeEnter: () => {
                if (sessionStorage.getItem('token')) {
                    location.href='/home'
                }
            }
        },
        {
            path: '/home',
            component: () => import('../views/home.vue'),
            name: 'home',
            meta: {
                title:'我的主页'
            }
        }
    ]
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    const token = sessionStorage.getItem('token')
    if (!token &&!['/', '/login'].includes(to.path)) {
       location.href='/login' 
    }
    next();
});
export default router