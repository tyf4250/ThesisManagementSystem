'use strict'
import axios from 'axios'
import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'

axios.defaults.headers['content-type'] = 'application/json;charset=utf-8'

const http = axios.create({
  withCredentials: true,
  timeout: 1000 * 10,
})
/**请求拦截 */
http.interceptors.request.use((config) => {
  if (config.cache) {
    const key = config.url
    let val
    try {
      val = sessionStorage.getItem(key)
      if (val) {
        return Promise.resolve(val)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const token = sessionStorage.getItem('token')
  token && (config.headers.Authorization = token)
  return config
})
/**返回拦截 */
http.interceptors.response.use(
  (response) => {
    //报错统一处理
    if (response.data.code !== '0000') {
      const { msg } = response.data
      ElMessage({ message: `请求失败 ${msg}`,type: "error",});
      return Promise.reject(response.data)
    }
    if (response.data.data?.token) {
      sessionStorage.setItem('token',response.data.data.token)
    }
    return response.data
  },
  (err) => {
    const { status } = err.response
    if (status === 401 || status === 403) {
      sessionStorage.removeItem('token')
      ElMessageBox.alert('检测到您当前无权限或者登录已过期,请重新登录', '提示').then(() => {
        location.href='/login'
      })
    } else {
      ElMessageBox.alert('请求失败！', msg||'')
    }
  }
)
export default http
