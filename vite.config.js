import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  // 插件，vue就是以插件的方式集成到vite工具中
  plugins: [vue()],
  // 添加别名
  resolve: {
    alias: {
      '@': path.resolve('src')
    }
  },
  server: {
    // 配置端口
    port: 80,
    // 自动打开浏览器
    open: false,
    // 通过配置开发时，代理服务器，在开发时进行跨域解决
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001',
        // 改变请求头源地址
        changeOrigin: true,
        // 重写，如果目标地址中存在 /api，就将 /api 替换为空字符串
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  
})

