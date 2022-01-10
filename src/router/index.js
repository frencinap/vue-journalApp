import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
// daybook router
import daybookRouter from "../modules/daybook/router";
// auth router
import authRouter from "../modules/auth/router";
import isAuthenticatedGuard from "../modules/auth/router/auth-guard";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/daybook",
    //guard
    beforeEnter: [ isAuthenticatedGuard ],
    //usamos spread Operator para importar el router
    ...daybookRouter,
  },
  {
    path: "/auth",
    //usamos spread Operator para importar el router
    ...authRouter,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
