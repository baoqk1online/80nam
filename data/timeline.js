"use strict";

/* ============================================================
   80 NĂM BÁO QUÂN KHU 1
   DATA / TIMELINE.JS

   10 mốc chính:
   1946
   1947
   1950
   1954
   1957
   1976
   1992
   2005
   2019
   2026

   QUY ƯỚC ẢNH:

   Background:
   assets/timeline/1946-bg.webp

   Ảnh tư liệu:
   assets/timeline/1946-01.webp
   assets/timeline/1946-02.webp
   assets/timeline/1946-03.webp
   ...

   Khi chưa có ảnh:
   - background.image để rỗng
   background: {
    image: "assets/timeline/1946-bg.webp",
    position: "50% 50%"
    }
   - images để []
    images: [
        {
            image: "assets/timeline/1946-01.webp",
            caption: "Chú thích ảnh.",
            credit: "Nguồn: Tư liệu Báo Quân khu 1"
        },
    
        {
            image: "assets/timeline/1946-02.webp",
            caption: "Chú thích ảnh thứ hai.",
            credit: "Ảnh: Nguyễn Văn A"
        }
    ]
   Khi bổ sung ảnh:
   - Không sửa HTML
   - Không sửa CSS
   - Không sửa script.js
   - Chỉ thêm file WebP và cập nhật dữ liệu tại đây
============================================================ */

window.SiteData = window.SiteData || {};

window.SiteData.timeline = [

    /* ========================================================
       1946
    ======================================================== */

    {
        year: "1946",

        title: "CHIẾN KHU",

        subtitle: "Khởi nguồn từ chiến khu cách mạng",

        description:
            "Ngày 19/8/1946, số đầu tiên của Báo Chiến khu ra đời, đặt nền móng cho Báo Quân khu 1 ngày nay. Đồng chí Tạ Xuân Thu, Chính trị ủy viên Chiến khu, làm Chủ nhiệm; đồng chí Lý Anh Đồng, tức Kỳ Ân, làm Chủ bút. Trong điều kiện còn nhiều khó khăn, cán bộ tòa soạn trực tiếp đi cơ sở khai thác tư liệu, tổ chức tin, bài và đưa bản thảo về Nhà in Hàn Thuyên, Hà Nội để in số báo đầu tiên.",

        theme: "sepia",

        side: "left",

        background: {
            image: "assets/timeline/1946-bg.webp",
            position: "50% 50%"
        },

        images: []
    },


    /* ========================================================
       1947
    ======================================================== */

    {
        year: "1947",

        title: "VIỆT BẮC QUYẾT CHIẾN",

        subtitle: "Tiếng gọi quyết chiến giữa Việt Bắc",

        description:
            "Trong cuộc tiến công Việt Bắc Thu - Đông năm 1947 của thực dân Pháp, Báo Chiến khu được đổi tên thành Việt Bắc Quyết chiến. Tên gọi mới thể hiện ý chí và quyết tâm của quân, dân các dân tộc Việt Bắc, góp phần cổ vũ tinh thần chiến đấu, bảo vệ An toàn khu và cơ quan đầu não của cuộc kháng chiến.",

        theme: "sepia",

        side: "right",

        background: {
            image: "assets/timeline/1947-bg.webp",
            position: "50% 50%"
        },

        images: []
    },


    /* ========================================================
       1950
    ======================================================== */

    {
        year: "1950",

        title: "BẮC SƠN",

        subtitle: "Tiếp nối truyền thống quật cường",

        description:
            "Trong Chiến dịch Biên giới năm 1950, diễn ra từ ngày 16/9 đến 14/10, Việt Bắc Quyết chiến được đổi tên thành Bắc Sơn. Tên gọi mới khơi dậy truyền thống yêu nước, tinh thần quật cường của Khởi nghĩa Bắc Sơn và tiếp tục đồng hành với quân, dân Việt Bắc trong cuộc kháng chiến chống thực dân Pháp.",

        theme: "sepia",

        side: "left",

        background: {
            image: "assets/timeline/1950-bg.webp",
            position: "50% 50%"
        },

        images: []
    },


    /* ========================================================
       1954
    ======================================================== */

    {
        year: "1954",

        title: "GIỮ NƯỚC",

        subtitle: "Tất cả hướng về Điện Biên Phủ",

        description:
            "Trong Chiến cuộc Đông Xuân 1953 - 1954, khi cả nước hướng về chiến trường Điện Biên Phủ, Báo Bắc Sơn được đổi tên thành Giữ Nước. Tờ báo tập trung tuyên truyền, cổ vũ quân và dân Việt Bắc thực hiện nhiệm vụ chi viện tiền tuyến, góp sức cùng cả nước làm nên thắng lợi của cuộc kháng chiến chống thực dân Pháp.",

        theme: "classic",

        side: "right",

        background: {
            image: "assets/timeline/1954-bg.webp",
            position: "50% 50%"
        },

        images: []
    },


    /* ========================================================
       1957
    ======================================================== */

    {
        year: "1957",

        title: "QUÂN VIỆT BẮC",

        subtitle: "Tiếng nói của lực lượng vũ trang Việt Bắc",

        description:
            "Ngày 3/6/1957, Quân khu Việt Bắc được thành lập. Để thực hiện chức năng là cơ quan của Đảng ủy và Bộ Tư lệnh Quân khu Việt Bắc, Báo Giữ Nước được đổi tên thành Quân Việt Bắc. Trong những năm chiến tranh, các thế hệ phóng viên, biên tập viên bám sát chiến trường và hậu phương, phản ánh sinh động cuộc chiến đấu, lao động và sản xuất của quân, dân Việt Bắc.",

        theme: "classic",

        side: "left",

        background: {
            image: "assets/timeline/1957-bg.webp",
            position: "50% 50%"
        },

        images: []
    },


    /* ========================================================
       1976
    ======================================================== */

    {
        year: "1976",

        title: "CHIẾN SĨ QUÂN KHU 1",

        subtitle: "Đồng hành cùng Quân khu trong nhiệm vụ mới",

        description:
            "Ngày 29/5/1976, Quân khu 1 được thành lập trên cơ sở sáp nhập Quân khu Việt Bắc và Quân khu Tây Bắc; Báo Quân Việt Bắc được đổi tên thành Chiến sĩ Quân khu 1. Sau khi tổ chức, địa bàn Quân khu tiếp tục được điều chỉnh năm 1978, tờ báo mang tên Báo Quân khu 1. Trong những năm chiến đấu bảo vệ biên giới phía Bắc, đội ngũ phóng viên của Báo bám sát trận địa, trở thành lực lượng xung kích trên mặt trận tuyên truyền.",

        theme: "classic",

        side: "right",

        background: {
            image: "assets/timeline/1976-bg.webp",
            position: "50% 50%"
        },

        images: []
    },


    /* ========================================================
       1992
    ======================================================== */

    {
        year: "1992",

        title: "TỜ TIN QUÂN KHU 1",

        subtitle: "Khôi phục hoạt động tuyên truyền",

        description:
            "Năm 1990, Báo Quân khu 1 tạm thời giải thể và ngừng hoạt động. Trước yêu cầu cấp thiết của công tác tuyên truyền đối với lực lượng vũ trang Quân khu, ngày 14/7/1992, Tờ tin Quân khu 1 được khôi phục theo giấy phép xuất bản số 402 của Tổng cục Chính trị. Tháng 5/1998, Tờ tin được tách khỏi Phòng Tuyên huấn, hoạt động độc lập và trực thuộc Cục Chính trị Quân khu.",

        theme: "classic",

        side: "left",

        background: {
            image: "assets/timeline/1992-bg.webp",
            position: "50% 50%"
        },

        images: []
    },


    /* ========================================================
       2005
    ======================================================== */

    {
        year: "2005",

        title: "BÁO QUÂN KHU 1",

        subtitle: "Một giai đoạn phát triển mới",

        description:
            "Ngày 18/8/2005, Ban Thường vụ Đảng ủy Quân sự Trung ương quyết định nâng Tờ tin của các Quân khu, Quân chủng lên thành Tờ báo. Báo Quân khu 1 tiếp tục thực hiện chức năng là cơ quan của Đảng ủy, Bộ Tư lệnh Quân khu, tiếng nói của lực lượng vũ trang Quân khu; đồng thời không ngừng đổi mới nội dung, hình thức và từng bước mở rộng các loại hình báo chí.",

        theme: "modern",

        side: "right",

        background: {
            image: "assets/timeline/2005-bg.webp",
            position: "50% 50%"
        },

        images: []
    },


    /* ========================================================
       2019
    ======================================================== */

    {
        year: "2019",

        title: "BÁO QUÂN KHU 1 ĐIỆN TỬ",

        subtitle: "Chuyển mình trên môi trường số",

        description:
            "Từ năm 2019, Báo Quân khu 1 điện tử chính thức đi vào hoạt động, mở ra giai đoạn phát triển mới trên môi trường Internet. Việc xuất bản báo điện tử giúp mở rộng đối tượng bạn đọc, nâng cao tốc độ và hiệu quả thông tin, tuyên truyền. Cùng với quá trình chuyển đổi số báo chí, Báo từng bước số hóa sản phẩm, ứng dụng công nghệ và phát triển tuyên truyền trên các nền tảng số, mạng xã hội.",

        theme: "modern",

        side: "left",

        background: {
            image: "assets/timeline/2019-bg.webp",
            position: "50% 50%"
        },

        images: []
    },


    /* ========================================================
       2026
    ======================================================== */

    {
        year: "2026",

        title: "80 NĂM – VỮNG BƯỚC TRONG KỶ NGUYÊN SỐ",

        subtitle: "Đoàn kết – sáng tạo – đổi mới – phát triển",

        description:
            "Tròn 80 năm kể từ số Báo Chiến khu đầu tiên ngày 19/8/1946, các thế hệ người làm Báo Quân khu 1 tiếp tục kế thừa và phát huy truyền thống được vun đắp qua nhiều giai đoạn lịch sử. Từ báo in đến báo điện tử và các sản phẩm truyền thông đa phương tiện, Báo Quân khu 1 tiếp tục đổi mới, ứng dụng công nghệ số, nâng cao chất lượng và hiệu quả tuyên truyền, xứng đáng là tiếng nói, diễn đàn của lực lượng vũ trang và quân, dân các dân tộc Việt Bắc.",

        theme: "modern",

        side: "right",

        background: {
            image: "assets/timeline/2026-bg.webp",
            position: "50% 50%"
        },

        images: []
    }

];
