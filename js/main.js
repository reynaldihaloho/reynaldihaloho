// Navigation bar effects on scroll
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});

// Gallery section
const galleryItems = document.querySelector(".gallery-items").children;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const page = document.querySelector(".page-num");
const maxItem = 8;
let index = 1;

const pagination = Math.ceil(galleryItems.length / maxItem);

prev.addEventListener("click", function () {
    index--;
    check();
    showItems();
});
next.addEventListener("click", function () {
    index++;
    check();
    showItems();
});

function check() {
    if (index == pagination) {
        next.classList.add("disabled");
    } else {
        next.classList.remove("disabled");
    }

    if (index == 1) {
        prev.classList.add("disabled");
    } else {
        prev.classList.remove("disabled");
    }
}

function showItems() {
    for (let i = 0; i < galleryItems.length; i++) {
        galleryItems[i].classList.remove("show");
        galleryItems[i].classList.add("hide");

        if (i >= index * maxItem - maxItem && i < index * maxItem) {
            galleryItems[i].classList.remove("hide");
            galleryItems[i].classList.add("show");
        }
        page.innerHTML = index;
    }
}

window.onload = function () {
    showItems();
    check();
};

// Skills section - Modal
const skillModals = document.querySelectorAll(".skills-modal");
const learnmoreBtns = document.querySelectorAll(".learns-more-btn");
const modalCloseBtns = document.querySelectorAll(".modals-close-btn");

var modal = function (modalClick) {
    skillModals[modalClick].classList.add("active");
};

learnmoreBtns.forEach((learnmoreBtn, i) => {
    learnmoreBtn.addEventListener("click", () => {
        modal(i);
    });
});

modalCloseBtns.forEach((modalCloseBtn) => {
    modalCloseBtn.addEventListener("click", () => {
        skillModals.forEach((modalView) => {
            modalView.classList.remove("active");
        });
    });
});

// Project section - Modal
const projectModals = document.querySelectorAll(".project-model");
const imgCards = document.querySelectorAll(".img-card");
const projectCloseBtns = document.querySelectorAll(".project-close-btn");

var modals = function (modalClick) {
    projectModals[modalClick].classList.add("active");
};

imgCards.forEach((imgCard, i) => {
    imgCard.addEventListener("click", () => {
        modals(i);
    });
});

projectCloseBtns.forEach((projectCloseBtn, i) => {
    projectCloseBtn.addEventListener("click", () => {
        projectModals.forEach((projectModalView) => {
            projectModalView.classList.remove("active");
        });
    });
});

// Responsive navigation menu toggle
const menuBtn = document.querySelector(".nav-menu-btn");
const closeBtn = document.querySelector(".nav-close-btn");
const navigation = document.querySelector(".navigation");
const navItem = document.querySelectorAll(".nav-items a");

menuBtn.addEventListener("click", () => {
    navigation.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    navigation.classList.remove("active");
});

navItem.forEach((navItem) => {
    navItem.addEventListener("click", () => {
        navigation.classList.remove("active");
    });
});

// Scroll reveal animations
// Common reveal options to create reveal animations
ScrollReveal({
    // reset: true, // Uncomment if you want animations to reset when scrolling back up
    distance: "60px",
    duration: 2500,
    delay: 100,
});

// Target elements, and specify options to create reveal animations
ScrollReveal().reveal(".home .info h2, .section-title-01, .section-title-02", { delay: 500, origin: "left" });
ScrollReveal().reveal(".home .info h3, .home .info p, .about-info .btn", { delay: 600, origin: "right" });
ScrollReveal().reveal(".home .info .btn", { delay: 700, origin: "bottom" });
ScrollReveal().reveal(".media-icons i, .contact-left li", { delay: 500, origin: "left", interval: 200 });
ScrollReveal().reveal(".home-img, .about-img", { delay: 500, origin: "bottom" });
ScrollReveal().reveal(".about .description, .contact-right, .gallery-items", { delay: 600, origin: "right" });
ScrollReveal().reveal(".about .profesional-list li", { delay: 500, origin: "right", interval: 200 });
ScrollReveal().reveal(".skills-description, .skills-description, .contact-left h2", { delay: 700, origin: "left" });
ScrollReveal().reveal(".experience-card, .skills-card, .education, .project .img-card", { delay: 800, origin: "bottom", interval: 200 });
ScrollReveal().reveal("footer .group, .about-img, .pagination", { delay: 500, origin: "top", interval: 200 });

// Contact Form
// URL to Google Apps Script
const scriptURL = "https://script.google.com/macros/s/AKfycbwp42u9C3oqfwE8teOG9ocSqYbELHAQdtedU6nJ9NVHh6OtacOz4YtlmsYhk4-Ivepd8g/exec";

// Get the form element
const form = document.forms["Contact-Form"];

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validate form fields
        const name = form.elements["name"].value.trim();
        const email = form.elements["email"].value.trim();
        const subject = form.elements["subject"].value.trim();
        const message = form.elements["message"].value.trim();

        if (!name || !email || !subject || !message) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill out all fields!",
                footer: '<a href="#">Why do I have this issue?</a>',
            });
            return; // Stop form submission if any field is empty
        }

        // Show loader with a loading icon and no OK button
        Swal.fire({
            title: "Mengirim...",
            text: "Pesan sedang dikirim",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        // Send form data to Google Apps Script
        fetch(scriptURL, { method: "POST", body: new FormData(form) })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success!", data);
                Swal.fire({
                    title: "Berhasil!",
                    text: "Pesan berhasil terkirim",
                    icon: "success",
                });
                form.reset();
            })
            .catch((error) => {
                console.error("Error!", error.message);
                Swal.fire({
                    title: "Gagal!",
                    text: "Pesan gagal terkirim. Silakan coba lagi.",
                    icon: "error",
                });
            });
    });
} else {
    console.error('Form with name "Contact-Form" not found.');
}
