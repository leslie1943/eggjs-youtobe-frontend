import axios from 'axios'

export const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
})

// 请求拦截器

// 响应拦截器
