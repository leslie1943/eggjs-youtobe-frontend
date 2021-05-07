import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { User } from '@/api/user'
import { setStore, getStore } from '@/utils/localStore'

// 声明 State 类型
export interface State {
  count: number
  user: User | null
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

// 创建 vuex 容器
export const store = createStore<State>({
  state: {
    count: 0,
    user: ((getStore('user') as unknown) as User) || null
  },
  mutations: {
    setUser(state, user: User) {
      state.user = user
      // 数据持久化
      setStore('user', user)
    }
  }
})

// define own `useStore` composition function
export function useStore() {
  return baseUseStore(key)
}
