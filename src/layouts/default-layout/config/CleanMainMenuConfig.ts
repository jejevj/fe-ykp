import type { MenuItem } from "@/layouts/default-layout/config/types";

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "Dashboard",
        route: "/dashboard",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        sectionTitle: "Barang",
        route: "/barang",
        keenthemesIcon: "basket-ok",
        sub: [
          {
            heading: "List Barang",
            route: "/barang/list-barang",
          },
          {
            heading: "Manajemen Stok",
            route: "/barang/manajemen-stok",
          },
        ],
      },

      {
        heading: "Setting Satuan",
        route: "/satuan",
        keenthemesIcon: "setting-4",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        sectionTitle: "Pengguna",
        route: "/pengguna",
        keenthemesIcon: "security-user",
        sub: [
          {
            heading: "List Pengguna",
            route: "/pengguna/list-pengguna",
          },
          {
            heading: "Tambah Pengguna",
            route: "/pengguna/tambah-pengguna",
          },
          {
            heading: "Manajemen Pelanggan",
            route: "/pengguna/manajemen-pelanggan",
          },
        ],
      },

      {
        sectionTitle: "Loading",
        route: "/loading",
        keenthemesIcon: "truck",
        sub: [
          {
            heading: "accountOverview",
            route: "/crafted/account/overview",
          },
          {
            heading: "settings",
            route: "/crafted/account/settings",
          },
        ],
      },
      {
        sectionTitle: "Laporan",
        route: "/Laporan",
        keenthemesIcon: "document",
        sub: [
          {
            heading: "accountOverview",
            route: "/crafted/account/overview",
          },
          {
            heading: "settings",
            route: "/crafted/account/settings",
          },
        ],
      },
      {
        heading: "Transaksi",
        route: "/transaksi",
        keenthemesIcon: "finance-calculator",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Cetak Faktur",
        route: "/cetak-faktur",
        keenthemesIcon: "printer",
        bootstrapIcon: "bi-app-indicator",
      },
    ],
  },
];

export default MainMenuConfig;
