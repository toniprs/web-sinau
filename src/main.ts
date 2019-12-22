// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'


// Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')



import Vue from 'vue';
import Notification from "vue-notification";

import App from './App.vue';
import router from './router';
import doCookieOperation from './helper/CookieHelper';

Vue.config.productionTip = false;

// prototyping any method to all vue instance
Vue.prototype.$doCookieOperation = doCookieOperation;

Vue.use(Notification);  // register custom plugin to vue

const app = new Vue({
  router,
  render: h => h(App),
  methods: {
    toggleBodyClass(type: string, className: string) {
      const element: HTMLElement = document.body;

      if (type === "addClass") {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    }
  }
});

app.$mount('#app');