/* =========================================

KHỞI TẠO

========================================= */

const productsContainer = document.getElementById(
    "products-container"
);

const socialContainer = document.getElementById(
    "social-container"
);

const timelineContainer = document.getElementById(
    "timeline-container"
);

const galleryContainer = document.getElementById(
    "gallery-container"
);

const progressBar = document.getElementById(
    "progress-bar"
);
/* =========================================

SẢN PHẨM

========================================= */

function renderProducts() {

    productsContainer.innerHTML = "";

    products.forEach(item => {

        const card = document.createElement("a");

        card.classList.add("product-card");

        card.classList.add(item.id);

        card.href = item.url;

        card.target = "_blank";

        card.innerHTML = `

            <img
                src="${item.thumbnail}"
                alt="${item.title}"
            >

            <div class="overlay">

                <h3>${item.title}</h3>

            </div>

        `;

        productsContainer.appendChild(card);

    });

}
/* =========================================

MẠNG XÃ HỘI

========================================= */

function renderSocial() {

    socialContainer.innerHTML = "";

    social.forEach(item => {

        const card = document.createElement("a");

        card.href = item.url;

        card.target = "_blank";

        card.className = "social-card";

        card.innerHTML = `

            <img src="${item.thumbnail}">

            <div class="social-title">

                ${item.title}

            </div>

        `;

        socialContainer.appendChild(card);

    });

}
/* =========================================

TIMELINE

========================================= */

function renderTimeline() {

    timelineContainer.innerHTML = "";

    timeline.forEach(item => {

        const section = document.createElement(

            "section"

        );

        section.className =

            `timeline-screen ${item.theme}`;

        section.innerHTML = `

            <div class="background"

                 style="background-image:url('${item.background}')">

            </div>

            <div class="timeline-dot"></div>

            <div class="timeline-card ${item.side}">

                <div class="year">

                    ${item.year}

                </div>

                <h2>

                    ${item.title}

                </h2>

                <h3>

                    ${item.subtitle}

                </h3>

                <p>

                    ${item.description}

                </p>

                <div class="timeline-gallery">

                    ${item.images.map(

                        img =>

                        `<img src="${img}">`

                    ).join("")}

                </div>

            </div>

        `;

        timelineContainer.appendChild(

            section

        );

    });

}
/* =========================================

TRIỂN LÃM

========================================= */

function renderGallery() {

    galleryContainer.innerHTML = "";

    gallery.forEach(item => {

        const card = document.createElement(

            "a"

        );

        card.className =

            `gallery-card ${item.type}`;

        card.href = item.link;

        card.target = "_blank";

        card.innerHTML = `

            <img src="${item.image}">

            <div class="gallery-info">

                <h3>

                    ${item.title}

                </h3>

                <p>

                    ${item.caption}

                </p>

            </div>

        `;

        galleryContainer.appendChild(card);

    });

}
/* =========================================

THANH TIẾN TRÌNH

========================================= */

window.addEventListener(

    "scroll",

    () => {

        const scrollTop =

            window.scrollY;

        const height =

            document.documentElement

            .scrollHeight -

            window.innerHeight;

        const percent =

            scrollTop / height * 100;

        progressBar.style.width =

            percent + "%";

    }

);
/* ======================== */
/* TIMELINE EFFECT */
/* ======================== */

const screens = document.querySelectorAll(

    ".timeline-screen"

);

const timelineObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                screens.forEach(screen => {

                    screen.classList.remove(

                        "active"

                    );

                });

                entry.target.classList.add(

                    "active"

                );

            }

        });

    },

    {

        threshold: 0.65

    }

);

screens.forEach(screen => {

    timelineObserver.observe(screen);

});
/* =========================================

START

========================================= */

renderProducts();

renderSocial();

renderTimeline();

renderGallery();

const screens = document.querySelectorAll(
    ".timeline-screen"
);

screens.forEach(screen => {

    timelineObserver.observe(screen);

});
