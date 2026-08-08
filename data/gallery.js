"use strict";

/* ============================================================
   80 NĂM BÁO QUÂN KHU 1
   DATA / GALLERY.JS

   QUY ƯỚC FILE ẢNH:

   assets/gallery/gallery-01.webp
   assets/gallery/gallery-02.webp
   assets/gallery/gallery-03.webp
   assets/gallery/gallery-04.webp
   ...

   Mỗi ảnh chỉ cần 3 trường:

   {
       image: "assets/gallery/gallery-01.webp",
       caption: "Chú thích ảnh.",
       credit: "Ảnh: Nguyễn Văn A"
   }

   Hoặc ảnh tư liệu:

   {
       image: "assets/gallery/gallery-02.webp",
       caption: "Chú thích ảnh.",
       credit: "Nguồn: Tư liệu Báo Quân khu 1"
   }

   NGUYÊN TẮC:

   - Chỉ dùng một file WebP cho mỗi ảnh.
   - Không cần thumbnail riêng.
   - Không cần ảnh full riêng.
   - Không cần ảnh mobile riêng.
   - Không cần khai báo tỷ lệ ảnh.
   - Không cần khai báo ngang / dọc / vuông.
   - Gallery tự sử dụng tỷ lệ tự nhiên của ảnh.
   - Chỉ ảnh Gallery sử dụng lazy loading.
   - Thứ tự trong mảng này cũng là thứ tự
     Previous / Next trong Gallery Viewer.

   KHI THÊM ẢNH:

   1. Tải WebP vào assets/gallery/
   2. Đặt tên gallery-XX.webp
   3. Thêm một object vào mảng bên dưới

   Không cần sửa:
   - index.html
   - style.css
   - script.js
============================================================ */

window.SiteData = window.SiteData || {};

window.SiteData.gallery = [
    {
        image: "assets/gallery/gallery-01.webp",
        caption: "",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-02.webp",
        caption: "",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-03.webp",
        caption: "",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-04.webp",
        caption: "",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-05.webp",
        caption: "",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-06.webp",
        caption: "",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-07.webp",
        caption: "",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-08.webp",
        caption: "",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-09.webp",
        caption: "",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-10.webp",
        caption: "",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-11.webp",
        caption: "",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-12.webp",
        caption: "",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-13.webp",
        caption: "",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-14.webp",
        caption: "",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-15.webp",
        caption: "",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-16.webp",
        caption: "",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-17.webp",
        caption: "",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-18.webp",
        caption: "",
        credit: ""
    }
];
