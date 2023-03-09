import http from '@/utils/http'

export const login = (data) => (
  http.request({
    method: 'post',
    url: '/api/login',
    data,
  })
)
