import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home.vue"
import mnist from "../views/mnist.vue";
import cars from "@/views/cars";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/mnist",
    name: "mnist",
    component: mnist,
  },
  {
    path: "/cars",
    name: "cars",
    component: cars,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
