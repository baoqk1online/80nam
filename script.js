/* =========================================
KHỞI TẠO
========================================= */

const productsContainer =
    document.getElementById(
        "products-container"
    );

const socialContainer =
    document.getElementById(
        "social-container"
    );

const timelineContainer =
    document.getElementById(
        "timeline-container"
    );

const galleryContainer =
    document.getElementById(
        "gallery-container"
    );

const progressBar =
    document.getElementById(
        "progress-bar"
    );


/* =========================================
SẢN PHẨM
========================================= */

function renderProducts() {

    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    (window.products || []).forEach(

        item => {

            const card =
                document.createElement("a");

            card.className =
                `product-card ${item.id}`;

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

            productsContainer.appendChild(
                card
            );

        }

    );

}


/* =========================================
MẠNG XÃ HỘI
========================================= */

function renderSocial() {

    if (!socialContainer) return;

    socialContainer.innerHTML = "";

    (window.social || []).forEach(

        item => {

            const card =
                document.createElement("a");

            card.className =
                "social-card";

            card.href = item.url;

            card.target = "_blank";

            card.innerHTML = `

                <img
                    src="${item.thumbnail}"
                    alt="${item.title}"
                >

                <div class="social-title">

                    ${item.title}

                </div>

            `;

            socialContainer.appendChild(
                card
            );

        }

    );

}


/* =========================================
TIMELINE
========================================= */

function renderTimeline() {

    if (!timelineContainer) return;

    timelineContainer.innerHTML = "";

    (window.timeline || []).forEach(

        item => {

            const section =
                document.createElement(
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

                    <div class="year"
                         style="color:${item.color}">

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

                        ${(item.images || [])

                            .map(

                                img =>

                                `<img src="${img}">`

                            )

                            .join("")}

                    </div>

                </div>

            `;

            timelineContainer.appendChild(
                section
            );

        }

    );

}


/* =========================================
TRIỂN LÃM
========================================= */

function renderGallery() {

    if (!galleryContainer) return;

    galleryContainer.innerHTML = "";

    (window.gallery || []).forEach(

        item => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                `gallery-card ${item.type}`;

            card.innerHTML = `

                <img
                    src="${item.image}"
                >

                <div class="gallery-info">

                    <h3>

                        ${item.title}

                    </h3>

                    <p>

                        ${item.caption}

                    </p>

                </div>

            `;

            galleryContainer.appendChild(
                card
            );

        }

    );

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

        if (progressBar) {

            progressBar.style.width =

                percent + "%";

        }

    }

);


/* =========================================
HIỆU ỨNG TIMELINE
========================================= */

function initTimeline() {

    const screens =

        document.querySelectorAll(

            ".timeline-screen"

        );

    if (screens.length === 0) return;

    const observer =

        new IntersectionObserver(

            entries => {

                entries.forEach(

                    entry => {

                        if (

                            entry.isIntersecting

                        ) {

                            screens.forEach(

                                screen => {

                                    screen.classList.remove(

                                        "active"

                                    );

                                }

                            );

                            entry.target.classList.add(

                                "active"

                            );

                        }

                    }

                );

            },

            {

                threshold: 0.35

            }

        );

    screens.forEach(

        screen => {

            observer.observe(screen);

        }

    );

}


/* =========================================
START
========================================= */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        renderProducts();

        renderSocial();

        renderTimeline();

        renderGallery();

        initTimeline();

    }

);
