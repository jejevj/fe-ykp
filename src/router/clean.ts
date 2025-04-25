import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboards"],
        },
      },
      {
        path: "/satuan",
        name: "setting-satuan",
        component: () => import("@/views/satuan/Satuan.vue"),
        meta: {
          pageTitle: "Satuan",
          breadcrumbs: ["Satuan"],
        },
      },

      {
        path: "/barang",
        name: "barang",
        // component: () => import("@/views/crafted/account/Account.vue"),
        meta: {
          breadcrumbs: ["Inventory", "Barang"],
        },
        children: [
          {
            path: "list-barang",
            name: "list-barang",
            component: () => import("@/views/barang/ListBarang.vue"),
            meta: {
              pageTitle: "List Barang",
            },
          },
          {
            path: "manajemen-stok",
            name: "manajemen-stok",
            component: () => import("@/views/barang/ManajemenStok.vue"),
            meta: {
              pageTitle: "Manajemen Stok",
            },
          },
        ],
      },
      {
        path: "/pengguna",
        name: "pengguna",
        // component: () => import("@/views/crafted/account/Account.vue"),
        meta: {
          breadcrumbs: ["Manajemen", "Pengguna"],
        },
        children: [
          {
            path: "list-pengguna",
            name: "list-pengguna",
            component: () => import("@/views/pengguna/ListPengguna.vue"),
            meta: {
              pageTitle: "List Pengguna",
            },
          },
          {
            path: "tambah-pengguna",
            name: "tambah-pengguna",
            component: () => import("@/views/pengguna/TambahPengguna.vue"),
            meta: {
              pageTitle: "Tambah Pengguna",
            },
          },
          {
            path: "manajemen-pelanggan",
            name: "manajemen-pelanggan",
            component: () => import("@/views/pengguna/ManajemenPelanggan.vue"),
            meta: {
              pageTitle: "Manajemen Pelaggan",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
        meta: {
          pageTitle: "Sign Up",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    // If the route has a hash, scroll to the section with the specified ID; otherwise, scroll to the top of the page.
    if (to.hash) {
      return {
        el: to.hash,
        top: 80,
        behavior: "smooth",
      };
    } else {
      return {
        top: 0,
        left: 0,
        behavior: "smooth",
      };
    }
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }
});

export default router;
