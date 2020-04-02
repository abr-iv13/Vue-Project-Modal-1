import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    yourVariable: false
    // settings: {
    //   type: Object,
    //   default: () => {}
    // },
    // access: {
    //   type: Object,
    //   default: () => {}
    // }
  },
  mutations: {
    SET(state, opts) {
      Object.keys(opts).map(key => {
        state[key] = opts[key]
      })
    }
  }
})
