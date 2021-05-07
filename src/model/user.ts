import { login } from '@/api/user'
import { useRouter } from 'vue-router'
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
      const { data } = await login(user)
      console.info('data', data)
      store.commit('setUser', data.user)
      router.push({ name: 'home' })
    } catch (err) {
      console.info(err.response)
      if (err.response.status === 422) {
        errors.value = err.response.data
      }
    }
    isLoading.value = false
  }

  return { user, handleSubmit, errors, isLoading }
}
