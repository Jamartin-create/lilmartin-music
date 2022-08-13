export default [
  {
    path: "/",
    name: "home",
    component: () => import("@/view/Mine.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/view/Login.vue"),
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import("@/view/Setting.vue"),
  },
];
