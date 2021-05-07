<!-- src\views\profile\index.vue -->
<template>
  <div class="gspRov">
    <h2>Profile page</h2>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const name = ref('独道东滴滴')

    return {
      name
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
