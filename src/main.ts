import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})