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

    /*
    {
        image: "assets/gallery/gallery-01.webp",
        caption: "Chú thích ảnh thứ nhất.",
        credit: "Nguồn: Tư liệu Báo Quân khu 1"
    },

    {
        image: "assets/gallery/gallery-02.webp",
        caption: "Chú thích ảnh thứ hai.",
        credit: "Ảnh: Nguyễn Văn A"
    },

    {
        image: "assets/gallery/gallery-03.webp",
        caption: "Chú thích ảnh thứ ba.",
        credit: "Nguồn: Tư liệu Báo Quân khu 1"
    }
    */

];
