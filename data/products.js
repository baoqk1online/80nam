"use strict";

/* ============================================================
   80 NĂM BÁO QUÂN KHU 1
   DATA / PRODUCTS.JS

   Cố định 3 sản phẩm:
   1. Báo in
   2. Phim truyền thống
   3. Chuyên trang điện tử
============================================================ */

window.SiteData = window.SiteData || {};

window.SiteData.products = [
    {
        id: "newspaper",

        title: "Số báo đặc biệt kỷ niệm 80 năm",

        subtitle: "Ấn phẩm đặc biệt chào mừng 80 năm Báo Quân khu 1",

        thumbnail: "assets/products/baoin.webp",

        url: "http://docbao.baoquankhu1.vn/"
    },

    {
        id: "documentary",

        title: "Phim truyền thống",

        subtitle: "Hành trình 80 năm Báo Quân khu 1",

        thumbnail: "assets/products/phim.webp",

        url: "https://baoquankhu1.vn/video/phong-su/chu-dong-chiem-linh-giu-vung-%E2%80%9Ctran-dia-so%E2%80%9D-6242-18.html"
    },

    {
        id: "website",

        title: "Chuyên trang điện tử",

        subtitle: "Báo Quân khu 1 trên môi trường số",

        thumbnail: "assets/products/website.webp",

        url: "https://baoquankhu1.vn/"
    }
];
