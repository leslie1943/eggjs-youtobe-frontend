import { request } from '@/utils/request'

// 登录参数
interface LoginInput {
  email: string
  password: string
}

// 返回User
interface User {
  email: string
  token: string
  usernmae: string
  channelDescription?: string
  avatar?: string
}

// 返回数据类型
interface LoginOutput {
  user: User
}

/**
 * 如何告诉 axios 返回的数据类型是什么? 如何使用 res.data. 自动获取后面的变量提示?
 * request的请求方法(get/post/patch)都支持一个泛型参数<T>
 * 比如 request.post<LoginOutput>('/api/v1/users/login', data). axios 内部会使用 LoginInput 去指定 res.data 的返回类型
 * 这样一来就可以: res.data.user.email
 */
export const login = (data: LoginInput) => {
  return request.post<LoginOutput>('/api/v1/users/login', data)
}
