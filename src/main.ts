import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {CryptoService, CryptoServiceToken} from "./core/api/crypto.api";

Vue.config.productionTip = false

const apis = {
  [CryptoServiceToken]: new CryptoService(),
}

new Vue({
  vuetify,
  provide: {
    ...apis,
  },
  render: h => h(App)
}).$mount('#app')
