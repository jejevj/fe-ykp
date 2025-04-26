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
            heading: "Form Pengajuan Loading",
            route: "/loading/pengajuan",
          },
          {
            heading: "List Loading",
            route: "/loading/list-loading",
          },
          {
            heading: "Approval Loading",
            route: "/loading/approval",
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
        sectionTitle: "Laporan",
        route: "/laporan",
        keenthemesIcon: "document",
        sub: [
          {
            heading: "Generate Laporan",
            route: "/laporan/generate-laporan",
          },
          {
            heading: "Semua Laporan",
            route: "/laporan/laporan-all",
          },
        ],
      },
      {
        heading: "Cetak Faktur",
        route: "/cetak-faktur",
        keenthemesIcon: "printer",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Setting Satuan",
        route: "/satuan",
        keenthemesIcon: "setting-4",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Setting",
        route: "/main-setting",
        keenthemesIcon: "gear",
        bootstrapIcon: "bi-app-indicator",
      },
    ],
  },
];

export default MainMenuConfig;
