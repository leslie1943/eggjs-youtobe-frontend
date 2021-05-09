<!-- src\views\signin\index.vue -->
<template>
  <div class="gspRov">
    <h2>Create your account</h2>
    <form @submit.prevent="handleSubmit">
      <ul v-if="errors" class="errors">
        <li v-for="(value, key) in errors" :key="key">
          {{ `${value}` }}
        </li>
      </ul>
      <input v-model="user.username" placeholder="Enter your name" />
      <input type="email" v-model="user.email" placeholder="Enter your email" />
      <input
        type="password"
        v-model="user.password"
        placeholder="Enter password"
      />
      <div class="action input-group">
        <span class="pointer"
          ><router-link to="/login">Signin</router-link></span
        >
        <button
          :class="isLoading ? 'loadingButtonFalse' : 'loadingButtonTrue'"
          :disabled="isLoading"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// 把业务模块封装到单独的模块中
import { useRegister } from '@/model/user'

export default defineComponent({
  name: 'RegisterIndex',
  setup() {
    return {
      ...useRegister()
    }
  }
})
</script>
