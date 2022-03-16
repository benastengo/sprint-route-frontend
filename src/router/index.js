import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Logout from "../views/Logout.vue";
import usersShow from "../views/usersShow.vue";
import Signup from "../views/Signup.vue";
import UsersIndex from "../views/UsersIndex.vue";
import CustomerShow from "../views/CustomerShow.vue";
import OrdersNew from "../views/OrdersNew.vue";

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
  { path: "/signup", name: "signup", component: Signup },
  { path: "/users", name: "Drivers", component: UsersIndex },
  { path: "/customers/:id", name: "customers-show", component: CustomerShow },
  { path: "/orders/new", name: "orders-new", component: OrdersNew },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
