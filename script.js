"use strict";

/* ============================================================
   80 NĂM BÁO QUÂN KHU 1
   SCRIPT.JS — V2
   1946–2026

   Nhiệm vụ:
   - Render dữ liệu từ window.SiteData
   - Mobile menu
   - Page progress
   - Header state
   - Back to top
   - Timeline active state
   - Timeline progress
   - Timeline media horizontal navigation
   - Gallery render
   - Gallery Viewer <dialog>
   - Gallery previous / next / counter
   - Preload ảnh Gallery liền kề khi Viewer mở
   - Xử lý lỗi ảnh cục bộ

   Không làm:
   - Không khóa cuộn Timeline
   - Không wheel interception
   - Không preventDefault cho cuộn trang
   - Không scroll-snap bằng JavaScript
   - Không tự ép scrollIntoView()
============================================================ */


/* ============================================================
   1. JS STATE
============================================================ */

document.documentElement.classList.add("js");

window.SiteData = window.SiteData || {};


/* ============================================================
   2. DOM HELPERS
============================================================ */

const DOM = {
    progressBar: null,
    header: null,

    menuToggle: null,
    mobileMenu: null,

    backToTop: null,

    productsContainer: null,
    socialContainer: null,

    timelineSection: null,
    timelineContainer: null,
    timelineProgress: null,

    galleryContainer: null,

    productTemplate: null,
    socialTemplate: null,
    timelineTemplate: null,
    timelineImageTemplate: null,
    galleryTemplate: null,

    galleryViewer: null,
    galleryViewerImage: null,
    galleryViewerCaption: null,
    galleryViewerCredit: null,
    galleryViewerCounter: null,
    galleryViewerClose: null,
    galleryViewerPrev: null,
    galleryViewerNext: null
};


/* ============================================================
   3. GLOBAL STATE
============================================================ */

const State = {
    scrollFramePending: false,

    timelineItems: [],
    timelineMediaControllers: [],

    gallery: {
        items: [],
        broken: new Set(),

        currentIndex: -1,
        triggerElement: null,

        preloaded: new Set()
    }
};


/* ============================================================
   4. GENERIC UTILITIES
============================================================ */

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}


function asText(value) {
    if (value === null || value === undefined) {
        return "";
    }

    return String(value).trim();
}


function slugify(value) {
    return asText(value)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}


function getArray(value) {
    return Array.isArray(value) ? value : [];
}


function prefersReducedMotion() {
    return window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;
}


function getScrollBehavior() {
    return prefersReducedMotion()
        ? "auto"
        : "smooth";
}


function setText(element, value) {
    if (!element) {
        return;
    }

    element.textContent = asText(value);
}


function setImageErrorHandler(image, callback) {
    if (!image) {
        return;
    }

    image.addEventListener(
        "error",
        () => {
            if (typeof callback === "function") {
                callback(image);
            } else {
                image.classList.add("is-broken");
            }
        },
        { once: true }
    );
}


function getTemplate(template) {
    if (!(template instanceof HTMLTemplateElement)) {
        return null;
    }

    return template.content.cloneNode(true);
}


/* ============================================================
   5. CACHE DOM
============================================================ */

function cacheDOM() {
    DOM.progressBar =
        document.getElementById("page-progress-bar");

    DOM.header =
        document.getElementById("site-header");

    DOM.menuToggle =
        document.getElementById("menu-toggle");

    DOM.mobileMenu =
        document.getElementById("mobile-menu");

    DOM.backToTop =
        document.getElementById("back-to-top");


    DOM.productsContainer =
        document.getElementById("products-container");

    DOM.socialContainer =
        document.getElementById("social-container");


    DOM.timelineSection =
        document.getElementById("timeline");

    DOM.timelineContainer =
        document.getElementById("timeline-container");

    DOM.timelineProgress =
        document.getElementById("timeline-progress");


    DOM.galleryContainer =
        document.getElementById("gallery-container");


    DOM.productTemplate =
        document.getElementById("product-template");

    DOM.socialTemplate =
        document.getElementById("social-template");

    DOM.timelineTemplate =
        document.getElementById("timeline-template");

    DOM.timelineImageTemplate =
        document.getElementById("timeline-image-template");

    DOM.galleryTemplate =
        document.getElementById("gallery-template");


    DOM.galleryViewer =
        document.getElementById("gallery-viewer");

    DOM.galleryViewerImage =
        document.getElementById("gallery-viewer-image");

    DOM.galleryViewerCaption =
        document.getElementById("gallery-viewer-caption");

    DOM.galleryViewerCredit =
        document.getElementById("gallery-viewer-credit");

    DOM.galleryViewerCounter =
        document.getElementById("gallery-viewer-counter");

    DOM.galleryViewerClose =
        document.getElementById("gallery-viewer-close");

    DOM.galleryViewerPrev =
        document.getElementById("gallery-viewer-prev");

    DOM.galleryViewerNext =
        document.getElementById("gallery-viewer-next");
}


/* ============================================================
   6. MOBILE MENU
============================================================ */

function openMobileMenu() {
    if (!DOM.menuToggle || !DOM.mobileMenu) {
        return;
    }

    DOM.mobileMenu.hidden = false;

    DOM.menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    DOM.menuToggle.setAttribute(
        "aria-label",
        "Đóng menu"
    );
}


function closeMobileMenu() {
    if (!DOM.menuToggle || !DOM.mobileMenu) {
        return;
    }

    DOM.mobileMenu.hidden = true;

    DOM.menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    DOM.menuToggle.setAttribute(
        "aria-label",
        "Mở menu"
    );
}


function toggleMobileMenu() {
    if (!DOM.menuToggle) {
        return;
    }

    const isOpen =
        DOM.menuToggle.getAttribute("aria-expanded")
        === "true";

    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}


function initMobileMenu() {
    if (!DOM.menuToggle || !DOM.mobileMenu) {
        return;
    }

    DOM.menuToggle.addEventListener(
        "click",
        toggleMobileMenu
    );

    DOM.mobileMenu
        .querySelectorAll("a[href^='#']")
        .forEach((link) => {
            link.addEventListener(
                "click",
                closeMobileMenu
            );
        });

    window.addEventListener(
        "keydown",
        (event) => {
            if (event.key !== "Escape") {
                return;
            }

            const isOpen =
                DOM.menuToggle.getAttribute(
                    "aria-expanded"
                ) === "true";

            if (!isOpen) {
                return;
            }

            closeMobileMenu();
            DOM.menuToggle.focus();
        }
    );
}


/* ============================================================
   7. PRODUCTS
============================================================ */

function getProductDimensions(id) {
    switch (id) {
        case "newspaper":
            return {
                width: 1200,
                height: 1600
            };

        case "documentary":
        case "film":
        case "website":
            return {
                width: 1280,
                height: 720
            };

        default:
            return null;
    }
}


function renderProducts() {
    if (
        !DOM.productsContainer ||
        !DOM.productTemplate
    ) {
        return;
    }

    const products =
        getArray(window.SiteData.products);

    DOM.productsContainer.replaceChildren();

    if (!products.length) {
        return;
    }

    const fragment =
        document.createDocumentFragment();


    products.forEach((item) => {
        const id =
            slugify(item.id || item.type);

        const imageSource =
            asText(item.image || item.thumbnail);

        const title =
            asText(item.title);

        const subtitle =
            asText(item.subtitle);

        const url =
            asText(item.url);


        if (!id || !imageSource || !url) {
            return;
        }


        const clone =
            getTemplate(DOM.productTemplate);

        if (!clone) {
            return;
        }


        const card =
            clone.querySelector(".product-card");

        const image =
            clone.querySelector(".product-card__image");

        const titleElement =
            clone.querySelector(".product-card__title");

        const subtitleElement =
            clone.querySelector(
                ".product-card__subtitle"
            );


        if (!card || !image) {
            return;
        }


        card.dataset.product = id;

        card.classList.add(
            `product-card--${id}`
        );

        card.href = url;

        card.target = "_blank";

        card.rel =
            "noopener noreferrer";


        if (title) {
            card.setAttribute(
                "aria-label",
                `${title} – mở trong thẻ mới`
            );
        }


        image.src = imageSource;
        image.alt = asText(item.alt) || title;


        const dimensions =
            getProductDimensions(id);

        if (dimensions) {
            image.width = dimensions.width;
            image.height = dimensions.height;
        }


        setImageErrorHandler(
            image,
            () => {
                const media =
                    image.closest(
                        ".product-card__media"
                    );

                if (media) {
                    media.hidden = true;
                }
            }
        );


        setText(titleElement, title);
        setText(subtitleElement, subtitle);


        fragment.appendChild(clone);
    });


    DOM.productsContainer.appendChild(fragment);
}


/* ============================================================
   8. SOCIAL
============================================================ */

function renderSocial() {
    if (
        !DOM.socialContainer ||
        !DOM.socialTemplate
    ) {
        return;
    }

    const socialItems =
        getArray(window.SiteData.social);

    DOM.socialContainer.replaceChildren();

    if (!socialItems.length) {
        return;
    }


    const fragment =
        document.createDocumentFragment();


    socialItems.forEach((item) => {
        const id =
            slugify(
                item.id ||
                item.platform ||
                item.title
            );

        const imageSource =
            asText(item.image || item.thumbnail);

        const title =
            asText(item.title);

        const url =
            asText(item.url);


        if (!id || !imageSource || !url) {
            return;
        }


        const clone =
            getTemplate(DOM.socialTemplate);

        if (!clone) {
            return;
        }


        const card =
            clone.querySelector(".social-card");

        const image =
            clone.querySelector(".social-card__image");

        const titleElement =
            clone.querySelector(".social-card__title");


        if (!card || !image) {
            return;
        }


        card.dataset.platform = id;

        card.classList.add(
            `social-card--${id}`
        );

        card.href = url;

        card.target = "_blank";

        card.rel =
            "noopener noreferrer";


        if (title) {
            card.setAttribute(
                "aria-label",
                `${title} – mở trong thẻ mới`
            );
        }


        image.src = imageSource;

        image.alt =
            asText(item.alt) ||
            title;


        setImageErrorHandler(
            image,
            () => {
                const media =
                    image.closest(
                        ".social-card__media"
                    );

                if (media) {
                    media.hidden = true;
                }
            }
        );


        setText(
            titleElement,
            title
        );


        fragment.appendChild(clone);
    });


    DOM.socialContainer.appendChild(fragment);
}


/* ============================================================
   9. TIMELINE DATA NORMALIZATION
============================================================ */

function normalizeTimelineBackground(background) {
    if (typeof background === "string") {
        return {
            image: asText(background),
            position: "50% 50%"
        };
    }


    if (
        background &&
        typeof background === "object"
    ) {
        return {
            image:
                asText(
                    background.image ||
                    background.src
                ),

            position:
                asText(
                    background.position
                ) || "50% 50%"
        };
    }


    return {
        image: "",
        position: "50% 50%"
    };
}


function normalizeTimelinePhoto(item) {
    if (typeof item === "string") {
        return {
            image: asText(item),
            caption: "",
            credit: ""
        };
    }


    if (
        !item ||
        typeof item !== "object"
    ) {
        return null;
    }


    const image =
        asText(
            item.image ||
            item.src
        );


    if (!image) {
        return null;
    }


    return {
        image,
        caption: asText(item.caption),
        credit: asText(item.credit)
    };
}


/* ============================================================
   10. TIMELINE IMAGE RENDER
============================================================ */

function renderTimelinePhoto(photo) {
    const clone =
        getTemplate(DOM.timelineImageTemplate);

    if (!clone) {
        return null;
    }


    const figure =
        clone.querySelector(".timeline-photo");

    const image =
        clone.querySelector(".timeline-photo__image");

    const caption =
        clone.querySelector(
            ".timeline-photo__caption"
        );

    const credit =
        clone.querySelector(
            ".timeline-photo__credit"
        );


    if (!figure || !image) {
        return null;
    }


    image.src = photo.image;

    image.alt =
        photo.caption ||
        photo.credit ||
        "Ảnh tư liệu";


    setText(
        caption,
        photo.caption
    );

    setText(
        credit,
        photo.credit
    );


    setImageErrorHandler(
        image,
        () => {
            figure.remove();
        }
    );


    return clone;
}


/* ============================================================
   11. TIMELINE RENDER
============================================================ */

function renderTimeline() {
    if (
        !DOM.timelineContainer ||
        !DOM.timelineTemplate ||
        !DOM.timelineImageTemplate
    ) {
        return;
    }


    const timeline =
        getArray(window.SiteData.timeline);


    DOM.timelineContainer.replaceChildren();

    State.timelineItems = [];
    State.timelineMediaControllers = [];


    if (!timeline.length) {
        return;
    }


    const fragment =
        document.createDocumentFragment();


    timeline.forEach((item, index) => {
        const year =
            asText(item.year);

        const title =
            asText(item.title);

        const subtitle =
            asText(item.subtitle);

        const description =
            asText(item.description);

        const theme =
            slugify(item.theme) ||
            "classic";

        const side =
            slugify(item.side) ||
            (
                index % 2 === 0
                    ? "left"
                    : "right"
            );


        if (!year || !title) {
            return;
        }


        const clone =
            getTemplate(DOM.timelineTemplate);

        if (!clone) {
            return;
        }


        const article =
            clone.querySelector(".timeline-item");

        if (!article) {
            return;
        }


        article.id =
            `timeline-${slugify(year)}`;

        article.dataset.theme = theme;
        article.dataset.side = side;

        article.classList.add(
            `theme-${theme}`
        );

        article.classList.add(
            `timeline-item--${side}`
        );


        const yearElement =
            clone.querySelector(
                ".timeline-item__year"
            );

        const titleElement =
            clone.querySelector(
                ".timeline-item__title"
            );

        const subtitleElement =
            clone.querySelector(
                ".timeline-item__subtitle"
            );

        const descriptionElement =
            clone.querySelector(
                ".timeline-item__description"
            );


        setText(
            yearElement,
            year
        );

        setText(
            titleElement,
            title
        );

        setText(
            subtitleElement,
            subtitle
        );

        setText(
            descriptionElement,
            description
        );


        /* ----------------------------------------
           Background
        ---------------------------------------- */

        const background =
            normalizeTimelineBackground(
                item.background
            );


        const backgroundImage =
            clone.querySelector(
                ".timeline-item__background-image"
            );


        if (background.image && backgroundImage) {
            backgroundImage.src =
                background.image;

            article.style.setProperty(
                "--timeline-bg-position",
                background.position
            );


            setImageErrorHandler(
                backgroundImage,
                () => {
                    backgroundImage.classList.add(
                        "is-broken"
                    );
                }
            );
        } else if (backgroundImage) {
            backgroundImage.remove();
        }


        /* ----------------------------------------
           Media
        ---------------------------------------- */

        const media =
            clone.querySelector(
                ".timeline-media"
            );

        const mediaTrack =
            clone.querySelector(
                ".timeline-media__track"
            );

        const mediaViewport =
            clone.querySelector(
                ".timeline-media__viewport"
            );

        const mediaLabel =
            clone.querySelector(
                ".timeline-media__label"
            );

        const prevButton =
            clone.querySelector(
                ".timeline-media__control--prev"
            );

        const nextButton =
            clone.querySelector(
                ".timeline-media__control--next"
            );


        const photos =
            getArray(item.images)
                .map(normalizeTimelinePhoto)
                .filter(Boolean);


        if (
            photos.length &&
            media &&
            mediaTrack
        ) {
            media.hidden = false;

            media.dataset.count =
                String(photos.length);


            if (mediaLabel) {
                mediaLabel.textContent =
                    photos.length === 1
                        ? "Tư liệu"
                        : `Tư liệu · ${photos.length} ảnh`;
            }


            if (mediaViewport) {
                mediaViewport.setAttribute(
                    "aria-label",
                    `Dải ảnh tư liệu năm ${year}`
                );
            }


            photos.forEach((photo) => {
                const photoNode =
                    renderTimelinePhoto(photo);

                if (photoNode) {
                    mediaTrack.appendChild(
                        photoNode
                    );
                }
            });


            if (
                mediaViewport &&
                prevButton &&
                nextButton
            ) {
                State.timelineMediaControllers.push({
                    media,
                    viewport: mediaViewport,
                    prevButton,
                    nextButton
                });
            }
        } else if (media) {
            media.hidden = true;
        }


        fragment.appendChild(clone);
    });


    DOM.timelineContainer.appendChild(fragment);


    State.timelineItems =
        Array.from(
            DOM.timelineContainer.querySelectorAll(
                ".timeline-item"
            )
        );


    initTimelineMediaControls();
    initTimelineObserver();
}


/* ============================================================
   12. TIMELINE MEDIA CONTROLS
============================================================ */

function updateTimelineMediaController(controller) {
    const {
        media,
        viewport,
        prevButton,
        nextButton
    } = controller;


    if (
        !media ||
        !viewport ||
        !prevButton ||
        !nextButton
    ) {
        return;
    }


    const maxScroll =
        Math.max(
            0,
            viewport.scrollWidth -
            viewport.clientWidth
        );


    const isScrollable =
        maxScroll > 3;


    media.classList.toggle(
        "is-scrollable",
        isScrollable
    );


    if (!isScrollable) {
        prevButton.disabled = true;
        nextButton.disabled = true;
        return;
    }


    prevButton.disabled =
        viewport.scrollLeft <= 3;


    nextButton.disabled =
        viewport.scrollLeft >=
        maxScroll - 3;
}


function scrollTimelineMedia(
    controller,
    direction
) {
    const viewport =
        controller.viewport;


    if (!viewport) {
        return;
    }


    const distance =
        Math.max(
            240,
            viewport.clientWidth * 0.8
        );


    viewport.scrollBy({
        left:
            direction *
            distance,

        behavior:
            getScrollBehavior()
    });
}


function initTimelineMediaControls() {
    State.timelineMediaControllers.forEach(
        (controller) => {
            const {
                viewport,
                prevButton,
                nextButton
            } = controller;


            prevButton.addEventListener(
                "click",
                () => {
                    scrollTimelineMedia(
                        controller,
                        -1
                    );
                }
            );


            nextButton.addEventListener(
                "click",
                () => {
                    scrollTimelineMedia(
                        controller,
                        1
                    );
                }
            );


            let scrollFrame = false;


            viewport.addEventListener(
                "scroll",
                () => {
                    if (scrollFrame) {
                        return;
                    }

                    scrollFrame = true;

                    requestAnimationFrame(
                        () => {
                            updateTimelineMediaController(
                                controller
                            );

                            scrollFrame = false;
                        }
                    );
                },
                {
                    passive: true
                }
            );


            updateTimelineMediaController(
                controller
            );
        }
    );


    if ("ResizeObserver" in window) {
        const resizeObserver =
            new ResizeObserver(
                () => {
                    State
                        .timelineMediaControllers
                        .forEach(
                            updateTimelineMediaController
                        );
                }
            );


        State
            .timelineMediaControllers
            .forEach(
                (controller) => {
                    resizeObserver.observe(
                        controller.viewport
                    );
                }
            );
    }
}

/* ============================================================
   13. TIMELINE SCROLL FOCUS
   Hiệu ứng Timeline thay đổi liên tục theo vị trí cuộn.
============================================================ */

function setActiveTimelineItem(activeItem) {
    State.timelineItems.forEach((item) => {
        item.classList.toggle(
            "is-active",
            item === activeItem
        );
    });
}


function updateTimelineFocus() {
    if (!State.timelineItems.length) {
        return;
    }

    const viewportCenter =
        window.innerHeight * 0.5;

    const focusRange =
        window.innerHeight * 0.82;

    let strongestItem = null;
    let strongestFocus = -1;

    State.timelineItems.forEach((item) => {
        const rect =
            item.getBoundingClientRect();

        const itemCenter =
            rect.top + rect.height * 0.5;

        const distance =
            Math.abs(
                itemCenter - viewportCenter
            );

        let focus =
            clamp(
                1 - distance / focusRange,
                0,
                1
            );

        /*
           Smoothstep:
           Làm chuyển sáng/tối mềm hơn,
           không có cảm giác bật/tắt.
        */
        focus =
            focus *
            focus *
            (3 - 2 * focus);

        const contentOpacity =
            0.48 + focus * 0.52;

        const contentShift =
            (1 - focus) * 18;

        const backgroundOpacity =
            0.38 + focus * 0.24;

        const markerScale =
            1 + focus * 0.22;


        item.style.setProperty(
            "--timeline-content-opacity",
            contentOpacity.toFixed(3)
        );

        item.style.setProperty(
            "--timeline-content-shift",
            `${contentShift.toFixed(1)}px`
        );

        item.style.setProperty(
            "--timeline-bg-opacity",
            backgroundOpacity.toFixed(3)
        );

        item.style.setProperty(
            "--timeline-marker-scale",
            markerScale.toFixed(3)
        );


        if (focus > strongestFocus) {
            strongestFocus = focus;
            strongestItem = item;
        }
    });


    if (strongestItem) {
        setActiveTimelineItem(
            strongestItem
        );
    }
}


function initTimelineObserver() {
    /*
       Giữ tên hàm để không phải sửa renderTimeline().
       Không dùng IntersectionObserver nữa.
    */

    updateTimelineFocus();
}

/* ============================================================
   14. GALLERY NORMALIZATION
============================================================ */

function normalizeGalleryItem(item) {
    if (typeof item === "string") {
        return {
            image: asText(item),
            caption: "",
            credit: ""
        };
    }


    if (
        !item ||
        typeof item !== "object"
    ) {
        return null;
    }


    const image =
        asText(
            item.image ||
            item.src
        );


    if (!image) {
        return null;
    }


    return {
        image,
        caption: asText(item.caption),
        credit: asText(item.credit)
    };
}


/* ============================================================
   15. GALLERY RENDER
============================================================ */

function renderGallery() {
    if (
        !DOM.galleryContainer ||
        !DOM.galleryTemplate
    ) {
        return;
    }


    const gallery =
        getArray(window.SiteData.gallery)
            .map(normalizeGalleryItem)
            .filter(Boolean);


    DOM.galleryContainer.replaceChildren();


    State.gallery.items = gallery;
    State.gallery.broken.clear();
    State.gallery.currentIndex = -1;


    if (!gallery.length) {
        return;
    }


    const fragment =
        document.createDocumentFragment();


    gallery.forEach((item, index) => {
        const clone =
            getTemplate(DOM.galleryTemplate);

        if (!clone) {
            return;
        }


        const figure =
            clone.querySelector(".gallery-item");

        const button =
            clone.querySelector(
                ".gallery-item__button"
            );

        const image =
            clone.querySelector(
                ".gallery-item__image"
            );

        const caption =
            clone.querySelector(
                ".gallery-item__caption"
            );

        const credit =
            clone.querySelector(
                ".gallery-item__credit"
            );


        if (
            !figure ||
            !button ||
            !image
        ) {
            return;
        }


        figure.dataset.galleryIndex =
            String(index);


        button.dataset.galleryIndex =
            String(index);


        const label =
            item.caption
                ? `Xem ảnh lớn: ${item.caption}`
                : `Xem ảnh triển lãm số ${index + 1}`;


        button.setAttribute(
            "aria-label",
            label
        );


        image.src = item.image;

        image.alt =
            item.caption ||
            item.credit ||
            `Ảnh triển lãm số ${index + 1}`;


        setText(
            caption,
            item.caption
        );

        setText(
            credit,
            item.credit
        );


        setImageErrorHandler(
            image,
            () => {
                State.gallery.broken.add(
                    index
                );

                figure.remove();
            }
        );


        button.addEventListener(
            "click",
            () => {
                openGalleryViewer(
                    index,
                    button
                );
            }
        );


        fragment.appendChild(clone);
    });


    DOM.galleryContainer.appendChild(fragment);
}


/* ============================================================
   16. GALLERY INDEX HELPERS
============================================================ */

function findGalleryIndex(
    startIndex,
    direction
) {
    const items =
        State.gallery.items;


    let index =
        startIndex + direction;


    while (
        index >= 0 &&
        index < items.length
    ) {
        if (
            !State.gallery.broken.has(index)
        ) {
            return index;
        }

        index += direction;
    }


    return -1;
}


function getPreviousGalleryIndex() {
    return findGalleryIndex(
        State.gallery.currentIndex,
        -1
    );
}


function getNextGalleryIndex() {
    return findGalleryIndex(
        State.gallery.currentIndex,
        1
    );
}


/* ============================================================
   17. GALLERY PRELOAD
============================================================ */

function preloadGalleryImage(index) {
    if (
        index < 0 ||
        index >= State.gallery.items.length
    ) {
        return;
    }


    if (
        State.gallery.broken.has(index) ||
        State.gallery.preloaded.has(index)
    ) {
        return;
    }


    const item =
        State.gallery.items[index];


    if (!item || !item.image) {
        return;
    }


    State.gallery.preloaded.add(index);


    const image =
        new Image();


    image.src =
        item.image;


    image.addEventListener(
        "error",
        () => {
            State.gallery.broken.add(index);
            State.gallery.preloaded.delete(index);
        },
        {
            once: true
        }
    );
}


function preloadAdjacentGalleryImages() {
    const previousIndex =
        getPreviousGalleryIndex();

    const nextIndex =
        getNextGalleryIndex();


    if (previousIndex !== -1) {
        preloadGalleryImage(
            previousIndex
        );
    }


    if (nextIndex !== -1) {
        preloadGalleryImage(
            nextIndex
        );
    }
}


/* ============================================================
   18. GALLERY VIEWER CONTENT
============================================================ */

function updateGalleryViewerControls() {
    if (
        !DOM.galleryViewerPrev ||
        !DOM.galleryViewerNext
    ) {
        return;
    }


    DOM.galleryViewerPrev.disabled =
        getPreviousGalleryIndex() === -1;


    DOM.galleryViewerNext.disabled =
        getNextGalleryIndex() === -1;
}


function showGalleryItem(index) {
    const item =
        State.gallery.items[index];


    if (
        !item ||
        State.gallery.broken.has(index)
    ) {
        return false;
    }


    State.gallery.currentIndex =
        index;


    if (DOM.galleryViewerImage) {
        DOM.galleryViewerImage.classList.remove(
            "is-broken"
        );

        DOM.galleryViewerImage.src =
            item.image;

        DOM.galleryViewerImage.alt =
            item.caption ||
            item.credit ||
            `Ảnh triển lãm số ${index + 1}`;
    }


    setText(
        DOM.galleryViewerCaption,
        item.caption
    );


    setText(
        DOM.galleryViewerCredit,
        item.credit
    );


    if (DOM.galleryViewerCounter) {
        DOM.galleryViewerCounter.textContent =
            `${index + 1} / ${State.gallery.items.length}`;
    }


    updateGalleryViewerControls();
    preloadAdjacentGalleryImages();


    return true;
}


/* ============================================================
   19. OPEN / CLOSE GALLERY VIEWER
============================================================ */

function isGalleryViewerOpen() {
    return Boolean(
        DOM.galleryViewer &&
        DOM.galleryViewer.hasAttribute(
            "open"
        )
    );
}


function openGalleryViewer(
    index,
    triggerElement
) {
    if (
        !DOM.galleryViewer ||
        !State.gallery.items.length
    ) {
        return;
    }


    if (
        State.gallery.broken.has(index)
    ) {
        return;
    }


    State.gallery.triggerElement =
        triggerElement || null;


    const success =
        showGalleryItem(index);


    if (!success) {
        return;
    }


    document.body.classList.add(
        "is-dialog-open"
    );


    if (
        typeof DOM.galleryViewer.showModal
        === "function"
    ) {
        if (!DOM.galleryViewer.open) {
            DOM.galleryViewer.showModal();
        }
    } else {
        DOM.galleryViewer.setAttribute(
            "open",
            ""
        );
    }


    requestAnimationFrame(
        () => {
            if (DOM.galleryViewerClose) {
                DOM.galleryViewerClose.focus();
            }
        }
    );
}


function finishGalleryViewerClose() {
    document.body.classList.remove(
        "is-dialog-open"
    );


    if (DOM.galleryViewerImage) {
        DOM.galleryViewerImage.removeAttribute(
            "src"
        );

        DOM.galleryViewerImage.alt = "";
    }


    State.gallery.currentIndex = -1;


    const trigger =
        State.gallery.triggerElement;


    State.gallery.triggerElement =
        null;


    if (
        trigger &&
        document.contains(trigger)
    ) {
        requestAnimationFrame(
            () => {
                trigger.focus();
            }
        );
    }
}


function closeGalleryViewer() {
    if (!DOM.galleryViewer) {
        return;
    }


    if (
        typeof DOM.galleryViewer.close
        === "function" &&
        DOM.galleryViewer.open
    ) {
        DOM.galleryViewer.close();
        return;
    }


    DOM.galleryViewer.removeAttribute(
        "open"
    );

    finishGalleryViewerClose();
}


/* ============================================================
   20. GALLERY VIEWER NAVIGATION
============================================================ */

function showPreviousGalleryImage() {
    const index =
        getPreviousGalleryIndex();


    if (index === -1) {
        return;
    }


    showGalleryItem(index);
}


function showNextGalleryImage() {
    const index =
        getNextGalleryIndex();


    if (index === -1) {
        return;
    }


    showGalleryItem(index);
}


/* ============================================================
   21. GALLERY VIEWER EVENTS
============================================================ */

function initGalleryViewer() {
    if (!DOM.galleryViewer) {
        return;
    }


    if (DOM.galleryViewerClose) {
        DOM.galleryViewerClose.addEventListener(
            "click",
            closeGalleryViewer
        );
    }


    if (DOM.galleryViewerPrev) {
        DOM.galleryViewerPrev.addEventListener(
            "click",
            showPreviousGalleryImage
        );
    }


    if (DOM.galleryViewerNext) {
        DOM.galleryViewerNext.addEventListener(
            "click",
            showNextGalleryImage
        );
    }


    /*
       Esc đóng Viewer.
       Chúng ta tự đóng để đảm bảo cleanup
       và trả focus đúng ảnh vừa mở.
    */

    DOM.galleryViewer.addEventListener(
        "cancel",
        (event) => {
            event.preventDefault();
            closeGalleryViewer();
        }
    );


    DOM.galleryViewer.addEventListener(
        "close",
        finishGalleryViewerClose
    );


    /*
       Không đăng ký sự kiện click backdrop.
       Vì vậy click nền không đóng Viewer.
    */


    window.addEventListener(
        "keydown",
        (event) => {
            if (!isGalleryViewerOpen()) {
                return;
            }


            if (event.key === "ArrowLeft") {
                event.preventDefault();
                showPreviousGalleryImage();
                return;
            }


            if (event.key === "ArrowRight") {
                event.preventDefault();
                showNextGalleryImage();
            }
        }
    );


    /*
       Nếu ảnh đang xem lỗi:
       - đánh dấu ảnh lỗi
       - tự chuyển sang ảnh kế tiếp nếu có
       - nếu không, thử ảnh trước
       - nếu không còn ảnh nào thì đóng Viewer
    */

    if (DOM.galleryViewerImage) {
        DOM.galleryViewerImage.addEventListener(
            "error",
            () => {
                const currentIndex =
                    State.gallery.currentIndex;


                if (currentIndex < 0) {
                    return;
                }


                State.gallery.broken.add(
                    currentIndex
                );


                const nextIndex =
                    getNextGalleryIndex();


                if (nextIndex !== -1) {
                    showGalleryItem(nextIndex);
                    return;
                }


                const previousIndex =
                    getPreviousGalleryIndex();


                if (previousIndex !== -1) {
                    showGalleryItem(
                        previousIndex
                    );

                    return;
                }


                closeGalleryViewer();
            }
        );
    }
}


/* ============================================================
   22. PAGE PROGRESS
============================================================ */

function updatePageProgress() {
    if (!DOM.progressBar) {
        return;
    }


    const root =
        document.documentElement;


    const maxScroll =
        Math.max(
            1,
            root.scrollHeight -
            window.innerHeight
        );


    const progress =
        clamp(
            window.scrollY /
            maxScroll,
            0,
            1
        );


    DOM.progressBar.style.width =
        `${progress * 100}%`;
}


/* ============================================================
   23. HEADER STATE
============================================================ */

function updateHeaderState() {
    if (!DOM.header) {
        return;
    }


    DOM.header.classList.toggle(
        "is-scrolled",
        window.scrollY > 20
    );
}


/* ============================================================
   24. BACK TO TOP
============================================================ */

function updateBackToTop() {
    if (!DOM.backToTop) {
        return;
    }


    const shouldShow =
        window.scrollY >
        window.innerHeight * 1.15;


    DOM.backToTop.hidden =
        !shouldShow;
}


function initBackToTop() {
    if (!DOM.backToTop) {
        return;
    }


    DOM.backToTop.addEventListener(
        "click",
        () => {
            window.scrollTo({
                top: 0,
                behavior:
                    getScrollBehavior()
            });
        }
    );
}


/* ============================================================
   25. TIMELINE PROGRESS
============================================================ */

function updateTimelineProgress() {
    if (
        !DOM.timelineSection ||
        !DOM.timelineProgress
    ) {
        return;
    }


    const rect =
        DOM.timelineSection.getBoundingClientRect();


    const viewportReference =
        window.innerHeight * 0.5;


    const passed =
        viewportReference -
        rect.top;


    const total =
        Math.max(
            1,
            rect.height
        );


    const progress =
        clamp(
            passed / total,
            0,
            1
        );


    DOM.timelineProgress.style.height =
        `${progress * 100}%`;
}


/* ============================================================
   26. GLOBAL SCROLL UPDATE
============================================================ */

function updateScrollUI() {
    updatePageProgress();
    updateHeaderState();
    updateBackToTop();
    updateTimelineProgress();
    updateTimelineFocus();

    State.scrollFramePending = false;
}


function handleScroll() {
    if (State.scrollFramePending) {
        return;
    }


    State.scrollFramePending = true;


    requestAnimationFrame(
        updateScrollUI
    );
}


/* ============================================================
   27. RESIZE
============================================================ */

function handleResize() {
    if (
        window.innerWidth >= 768
    ) {
        closeMobileMenu();
    }


    State
        .timelineMediaControllers
        .forEach(
            updateTimelineMediaController
        );


    handleScroll();
}


/* ============================================================
   28. INTERNAL ANCHORS
============================================================ */

function initInternalLinks() {
    document
        .querySelectorAll(
            "a[href^='#']"
        )
        .forEach((link) => {
            link.addEventListener(
                "click",
                () => {
                    if (
                        DOM.menuToggle &&
                        DOM.menuToggle.getAttribute(
                            "aria-expanded"
                        ) === "true"
                    ) {
                        closeMobileMenu();
                    }
                }
            );
        });
}


/* ============================================================
   29. INITIAL UI STATE
============================================================ */

function setInitialUIState() {
    /*
       Viewer image nằm trực tiếp trong HTML.
       Không giữ src="" khi chưa sử dụng.
    */

    if (DOM.galleryViewerImage) {
        DOM.galleryViewerImage.removeAttribute(
            "src"
        );

        DOM.galleryViewerImage.alt = "";
    }


    closeMobileMenu();

    updateScrollUI();


    requestAnimationFrame(
        () => {
            State
                .timelineMediaControllers
                .forEach(
                    updateTimelineMediaController
                );
        }
    );
}


/* ============================================================
   30. RENDER ALL DATA
============================================================ */

function renderAll() {
    /*
       Mỗi renderer độc lập.
       Lỗi một phần không nên làm hỏng phần khác.
    */

    try {
        renderProducts();
    } catch (error) {
        console.error(
            "Không thể render Products:",
            error
        );
    }


    try {
        renderSocial();
    } catch (error) {
        console.error(
            "Không thể render Social:",
            error
        );
    }


    try {
        renderTimeline();
    } catch (error) {
        console.error(
            "Không thể render Timeline:",
            error
        );
    }


    try {
        renderGallery();
    } catch (error) {
        console.error(
            "Không thể render Gallery:",
            error
        );
    }
}


/* ============================================================
   31. EVENTS
============================================================ */

function initEvents() {
    initMobileMenu();
    initBackToTop();
    initGalleryViewer();
    initInternalLinks();


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        handleResize,
        {
            passive: true
        }
    );


    window.addEventListener(
        "load",
        () => {
            handleResize();
            handleScroll();
        },
        {
            once: true
        }
    );
}

function initImageProtection() {
    document.addEventListener(
        "contextmenu",
        (event) => {
            if (
                !(event.target instanceof Element)
            ) {
                return;
            }

            const image =
                event.target.closest("img");

            if (!image) {
                return;
            }

            event.preventDefault();
        }
    );


    document.addEventListener(
        "dragstart",
        (event) => {
            if (
                !(event.target instanceof Element)
            ) {
                return;
            }

            const image =
                event.target.closest("img");

            if (!image) {
                return;
            }

            event.preventDefault();
        }
    );
}


/* ============================================================
   32. INIT
============================================================ */

function init() {
    cacheDOM();

    renderAll();

    initEvents();

    setInitialUIState();
}


/* ============================================================
   33. START
============================================================ */

if (
    document.readyState === "loading"
) {
    document.addEventListener(
        "DOMContentLoaded",
        init,
        {
            once: true
        }
    );
} else {
    init();
}
