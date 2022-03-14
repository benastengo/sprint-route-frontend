import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Logout from "../views/Logout.vue";
import usersShow from "../views/usersShow.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/users/:id",
    name: "Users-Show",
    component: usersShow,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
