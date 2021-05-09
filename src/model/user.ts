import { register, login } from '@/api/user'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
// import { useStore } from 'vuex' // 不适用默认的
import { useStore } from '@/store' // 使用自己封装带 Symbol key 的

/**
 *  💛 登录
 */
export const useLogin = () => {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()

  const errors = ref([])
  const isLoading = ref(false)
  const user = reactive({
    email: 'leslie@sina.com',
    password: '111111'
  })

  const handleSubmit = async () => {
    errors.value = []
    isLoading.value = true
    try {
      // 登录并持久化登录信息
      const { data } = await login(user)
      store.commit('setUser', data.user)

      // 登录成功跳转
      const redirect = (route.query.redirect || '/') as string
      router.push({ path: redirect })
    } catch (err) {
      if (err.response.status === 422) {
        errors.value = err.response.data
      }
    }
    isLoading.value = false
  }

  return { user, handleSubmit, errors, isLoading }
}

/**
 *  💛 注册
 */
export const useRegister = () => {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()

  const errors = ref([])
  const isLoading = ref(false)
  const user = reactive({
    username: 'michael',
    email: 'michael@sina.com',
    password: '111111'
  })

  const handleSubmit = async () => {
    errors.value = []
    isLoading.value = true
    try {
      // 注册用户并持久化登录信息
      const { data } = await register(user)
      console.info('register data', data)
      store.commit('setUser', data.user)

      // 登录成功跳转
      const redirect = (route.query.redirect || '/') as string
      router.push({ path: redirect })
    } catch (err) {
      if (err.response.status === 422) {
        errors.value = err.response.data
      }
    }
    isLoading.value = false
  }

  return {
    user,
    handleSubmit,
    errors,
    isLoading
  }
}
