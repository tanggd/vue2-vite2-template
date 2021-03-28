<template>
  <div>
    home page {{count}}
    <button @click="add">add +1</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import store from '../../store'
export default defineComponent({
  name: 'Home',
  setup() {
    const count = computed(() => store.state.count)
    const add = () => {
      store.commit('increment')
    }
    return {
      count,
      add
    }
  }
})
</script>