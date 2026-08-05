/* =====================================
   THANH TIẾN TRÌNH
===================================== */

const progressBar = document.getElementById("progress-bar");

function updateProgress() {

    const scrollTop = window.scrollY;

    const maxScroll =

        document.documentElement.scrollHeight -

        window.innerHeight;

    const progress =

        (scrollTop / maxScroll) * 100;

    progressBar.style.width =

        progress + "%";

}

window.addEventListener(

    "scroll",

    updateProgress

);


/* =====================================
   CHỌN TẤT CẢ CÁC MÀN HÌNH
===================================== */

const screens = document.querySelectorAll(

    ".hero, .products, .timeline-screen, .gallery"

);


/* =====================================
   HIỆU ỨNG XUẤT HIỆN
===================================== */

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add(

                    "active"

                );

            }

            else {

                entry.target.classList.remove(

                    "active"

                );

            }

        });

    },

    {

        threshold: 0.55

    }

);

screens.forEach(screen => {

    observer.observe(screen);

});


/* =====================================
   HIỆU ỨNG PARALLAX
===================================== */

function parallax() {

    const timelines =

        document.querySelectorAll(

            ".timeline-screen"

        );

    timelines.forEach(item => {

        const rect =

            item.getBoundingClientRect();

        const speed =

            rect.top * 0.15;

        item.style.backgroundPosition =

            `center ${speed}px`;

    });

}

window.addEventListener(

    "scroll",

    parallax

);


/* =====================================
   MỐC TIMELINE ĐANG XEM
===================================== */

const timelineScreens =

    document.querySelectorAll(

        ".timeline-screen"

    );

function updateTimeline() {

    timelineScreens.forEach(screen => {

        const rect =

            screen.getBoundingClientRect();

        const center =

            window.innerHeight / 2;

        if (

            rect.top < center &&

            rect.bottom > center

        ) {

            screen.classList.add(

                "current"

            );

        }

        else {

            screen.classList.remove(

                "current"

            );

        }

    });

}

window.addEventListener(

    "scroll",

    updateTimeline

);


/* =====================================
   MENU ACTIVE
===================================== */

const menuLinks =

    document.querySelectorAll(

        ".header a"

    );

function updateMenu() {

    let current = "";

    document

        .querySelectorAll("section[id]")

        .forEach(section => {

            const top =

                section.offsetTop - 120;

            const bottom =

                top + section.offsetHeight;

            if (

                window.scrollY >= top &&

                window.scrollY < bottom

            ) {

                current =

                    section.id;

            }

        });

    menuLinks.forEach(link => {

        link.classList.remove(

            "selected"

        );

        if (

            link.getAttribute("href")

            === "#" + current

        ) {

            link.classList.add(

                "selected"

            );

        }

    });

}

window.addEventListener(

    "scroll",

    updateMenu

);


/* =====================================
   THU PHÓNG MÀN HÌNH
===================================== */

function updateScale() {

    timelineScreens.forEach(screen => {

        const rect =

            screen.getBoundingClientRect();

        const center =

            rect.top +

            rect.height / 2;

        const distance =

            Math.abs(

                center -

                window.innerHeight / 2

            );

        const scale =

            Math.max(

                0.96,

                1 - distance / 2500

            );

        screen.style.transform =

            `scale(${scale})`;

    });

}

window.addEventListener(

    "scroll",

    updateScale

);


/* =====================================
   SNAP MỀM
===================================== */

let scrollTimeout;

window.addEventListener(

    "scroll",

    () => {

        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(

            () => {

                let nearest = null;

                let nearestDistance =

                    Infinity;

                timelineScreens.forEach(

                    screen => {

                        const rect =

                            screen.getBoundingClientRect();

                        const distance =

                            Math.abs(

                                rect.top

                            );

                        if (

                            distance <

                            nearestDistance

                        ) {

                            nearestDistance =

                                distance;

                            nearest =

                                screen;

                        }

                    }

                );

                if (

                    nearest &&

                    window.innerWidth >

                        900

                ) {

                    nearest.scrollIntoView({

                        behavior:

                            "smooth",

                        block:

                            "start"

                    });

                }

            },

            150

        );

    }

);


/* =====================================
   KHỞI TẠO
===================================== */

updateProgress();

updateTimeline();

updateScale();

updateMenu();

parallax();


console.log(

    "80 năm Báo Quân khu 1"

);

/* ==========================

   TẠO KHỐI MẠNG XÃ HỘI

========================== */

const socialRow = document.getElementById(

    "social-row"

);

function renderSocial() {

    socialRow.innerHTML = "";

    socialData.forEach(item => {

        const card = document.createElement(

            "a"

        );

        card.href = item.url;

        card.target = "_blank";

        card.className =

            "social-card";

        card.innerHTML = `

            <img src="${item.thumbnail}">

            <div class="social-overlay">

                <span>

                    ${item.title}

                </span>

            </div>

        `;

        socialRow.appendChild(card);

    });

}

renderSocial();
