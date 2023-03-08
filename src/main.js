import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'

import router from './router/index'
import store from './store/index'
import ElementPlus from 'element-plus'

const app = createApp(App)
app.use(router).use(store)
app.use(ElementPlus)

app.mount('#app')
