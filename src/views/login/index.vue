<!-- src\views\signin\index.vue -->
<template>
  <div class="gspRov">
    <h2>Login to your account</h2>
    <form @submit.prevent="handleSubmit">
      <ul v-if="errors" class="errors">
        <li v-for="(value, key) in errors" :key="key">
          {{ `${value}` }}
        </li>
      </ul>
      <input type="email" v-model="user.email" placeholder="email" />
      <input type="password" v-model="user.password" placeholder="password" />
      <div class="action input-group">
        <span class="pointer">Signup instead</span>
        <button
          :class="isLoading ? 'loadingButtonFalse' : 'loadingButtonTrue'"
          :disabled="isLoading"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// 把业务模块封装到单独的模块中
import { useLogin } from '@/model/user'

export default defineComponent({
  name: 'LoginIndex',
  setup() {
    return {
      ...useLogin()
    }
  }
})
</script>
