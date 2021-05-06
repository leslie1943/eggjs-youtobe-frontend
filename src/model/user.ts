import { login } from '@/api/user'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'

export const useLogin = () => {
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
