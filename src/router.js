import Vue from 'vue';
import Router from 'vue-router';

import NotFound from './pages/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "Home" */ './pages/Home.vue'),
    },
    {
      path: '/:user',
      name: 'user-repos',
      component: () =>
        import(/* webpackChunkName: "Repositories" */ './pages/Repos.vue'),
      children: [
        {
          path: ':repo',
          name: 'repo-readme',
          component: () =>
            import(/* webpackChunkName: "Reader" */ './pages/Reader.vue'),
        },
      ],
    },
    { path: '*', name: 'not-found', component: NotFound },
  ],
});
