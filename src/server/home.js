import http from '@/utils/http'

export const init = (data) => (
  http.request({
    method: 'post',
    url: '/api/init',
    data,
  })
)
export const getEmailCode = (data) => {
  http.request({
    method: 'post',
    url: '/api/modifyCode',
    data
  })
}
export const modifyPassword = (data) => {
  http.request({
    method: 'post',
    url: '/api/modifyPassword',
    data
  })
}