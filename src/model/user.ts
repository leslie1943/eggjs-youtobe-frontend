import { login } from '@/api/user'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
// import { useStore } from 'vuex'
import { useStore } from '@/store'

export const useLogin = () => {
  /**
   * store
   */
  const store = useStore()
  // store.state.count = 1
  // store.state.user.age

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
