import 'babel-polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import { createProvider } from './vue-apollo'
import EthContext from './util/eth'


Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  apolloProvider: createProvider(),
  mounted : EthContext.init()
})
