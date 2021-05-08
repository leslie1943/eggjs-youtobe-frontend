<!-- src\views\profile\index.vue -->
<template>
  <div class="gspRov">
    <h2>Hello K-U-N-D-O-R-A</h2>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const name = ref('')

    return {
      name
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
