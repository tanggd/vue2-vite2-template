<template>
  <div>
    <h1 :class="styles.title">{{ msg }}
      <span :class="styles.span">222</span>
    </h1>
    <nav>
      <router-link to="/home">Home</router-link> | 
      <router-link to="/about">About</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from '@vue/composition-api'
import styles from './app.module.scss'
import './app.scss'
export default defineComponent({
  name: 'App',
  setup() {
    const msg = ref('Hello Vite2')
    return {
      msg,
      styles
    }
  },
})
</script>

// <style lang="scss" scoped>
// .title {
//   color: red;
//   .span {
//     color: blue;
//     font-size: 12px;
//   }
// }
// </style>