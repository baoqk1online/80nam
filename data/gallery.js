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
        caption: "Nguyên Chủ tịch Quốc hội Nguyễn Thị Kim Ngân và cán bộ, phóng viên Báo Quân khu 1.",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-02.webp",
        caption: "Báo Quân khu 1 cùng các tập thể và cá nhân nhận khen thưởng của Bộ Quốc phòng vì có nhiều đóng góp trong công tác báo chí, tuyên truyền về nhiệm vụ quân sự, quốc phòng giai đoạn 2020-2025.",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-03.webp",
        caption: "Tại Lễ kỷ niệm 70 năm Ngày truyền thống Báo Quân khu 1 (19-8-2016), Báo Quân khu 1 nhận Cờ thưởng của Đảng ủy, Bộ Tư lệnh Quân khu.",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-04.webp",
        caption: "Phóng viên Báo Quân khu bám sát hoạt động của lãnh đạo Bộ Tư lệnh Quân khu và đơn vị.",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-05.webp",
        caption: "Phóng viên Báo Quân khu 1 tác nghiệp trong Giao lưu hữu nghị quốc phòng biên giới Việt Nam Trung Quốc lần thứ IX, năm 2025.",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-06.webp",
        caption: "Cán bộ, phóng viên Báo Quân khu phản ánh công tác phòng, chống dịch Covid-19 tại Bệnh viên Quân y 110, năm 2021.",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-07.webp",
        caption: "Phóng viên Báo Quân khu 1 tác nghiệp nơi tâm dịch tại xã Mão Điền, huyện Thuận Thành (nay là phường Mão Điền, tỉnh Bắc Ninh), năm 2021.",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-08.webp",
        caption: "Phóng viên Báo Quân khu 1 cùng phóng viên các cơ quan báo chí trong và ngoài Quân đội tác nghiệp trong Giao lưu hữu nghị quốc phòng biên giới Việt Nam Trung Quốc lần thứ IX, năm 2025.",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-09.webp",
        caption: "Phóng viên Báo Quân khu 1 tác nghiệp trong Lễ ra quân huấn luyện.",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-10.webp",
        caption: "Phóng viên Báo Quân khu 1 tác nghiệp tại Lữ đoàn Pháo binh 382.",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-11.webp",
        caption: "Phút giải lao cùng bộ đội Lữ đoàn Pháo binh 382.",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-12.webp",
        caption: "Phóng viên Báo Quân khu 1 theo sát đội hình diễn tập tại Trường bắn Quốc gia khu vực 1.",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-13.webp",
        caption: "Phóng viên Báo Quân khu 1 tác nghiệp phản ánh tại vùng đồng bào dân tộc thiểu số.",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-14.webp",
        caption: "Phóng viên Báo Quân khu 1 tác nghiệp trong diễn tập khu vực phòng thủ tỉnh Thái Nguyên, năm 2019.",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-15.webp",
        caption: "Chân thực từng khoảnh khắc với chiến sĩ Tiểu đoàn Phòng hóa 23, Bộ Tham mưu.",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-16.webp",
        caption: "Cán bộ, phóng viên Báo Quân khu 1 trao đổi nghiệp vụ tác nghiệp.",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-17.webp",
        caption: "Cán bộ, phóng viên Báo Quân khu 1 trao đổi nâng cao chất lượng tuyên truyền báo chí trong thời đại số.",
        credit: ""
    },

    {
        image: "assets/gallery/gallery-18.webp",
        caption: "Cán bộ, chiến sĩ các đơn vị đón đọc Báo Quân khu 1.",
        credit: ""
    }
];
