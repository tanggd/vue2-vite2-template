import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

Vue.use(Vuex)

// todo 类型问题
interface AnyObj {
  [x: string]: any
}

const store = new Vuex.Store({
  state: {
    count: 0
  },
  getters: {},
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {},
  modules: {}
})

export default store