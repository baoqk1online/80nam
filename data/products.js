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

        title: "Số báo đặc biệt",

        subtitle: "Kỷ niệm 80 năm xuất bản số báo đầu tiên (19/8/1946-19/8/2026)",

        thumbnail: "assets/products/baoin.webp",

        url: "http://docbao.baoquankhu1.vn/"
    },

    {
         id: "documentary",
         title: "Phim truyền thống",
         subtitle: "Hành trình 80 năm Báo Quân khu 1",
         thumbnail: "assets/products/phim.webp",
         
             get url() {
                 const desktopUrl =
                     "https://baoquankhu1.vn/video/phim-tai-lieu/phim-truyen-thong-bao-quan-khu-1-80-nam-dong-hanh-cung-quan-dan-viet-bac-6243-17.html";
         
                 const mobileUrl =
                     "https://m.baoquankhu1.vn/video/phim-truyen-thong-bao-quan-khu-1-80-nam-dong-hanh-cung-quan-dan-viet-bac-6243.html";
         
                 return window.matchMedia(
                     "(max-width: 1023px)"
                 ).matches
                     ? mobileUrl
                     : desktopUrl;
             }
    },

    {
        id: "website",

        title: "Website Báo Quân khu 1 điện tử",

        subtitle: "Báo Quân khu 1 trên môi trường số",

        thumbnail: "assets/products/website.webp",
        get url() {
            return window.matchMedia(
                "(max-width: 767px)"
            ).matches
                ? "https://m.baoquankhu1.vn/"
                : "https://baoquankhu1.vn/";
       }
   }
];
