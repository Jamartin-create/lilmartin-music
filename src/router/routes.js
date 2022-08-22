export default [
  {
    path: "/",
    name: "home",
    component: () => import("@/view/Mine.vue"),
    meta: {
      requireLogin: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/view/Login.vue"),
    meta: {
      requireLogin: false,
    },
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import("@/view/Setting.vue"),
    meta: {
      requireLogin: false,
    },
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/view/Search.vue"),
    meta: {
      requireLogin: false,
    },
  },
  {
    path: "/library",
    name: "library",
    component: () => import("@/view/Library.vue"),
    meta: {
      requireLogin: true,
    },
  },
];
