import Vue from 'vue';
import VueMarkdown from 'vue-markdown';

// babel dependencies for async/await
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

Vue.use(VueMarkdown);

new Vue({
  render: createEl => createEl(App),
  router,
}).$mount('#app');
