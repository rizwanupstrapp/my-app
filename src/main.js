import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/main.css'
import "../node_modules/vue-select/dist/vue-select.css"
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

Vue.use(require('vue-moment'));

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

// Vue 3rd party plugins
import i18n from '@/assets/libs/i18n'

import "./assets/customCss/custom.css";

import VsPagination from '@vuesimple/vs-pagination';
Vue.use(VsPagination);

import draggable from 'vuedraggable';
Vue.use(draggable);

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
const options = {
  // You can set your default options here
  timeout: 2000,
};
Vue.use(Toast, options);

// import 'devextreme/dist/css/dx.light.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
